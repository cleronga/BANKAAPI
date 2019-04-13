import transactions from '../model/transaction.model';
import accounts from '../model/account.model';
import login from '../model/login';



class transactioncontroller {
    static getTransaction(req, res) {
      return res.json
      ({
        status:200,
        data:transactions
      });
    }
    static creditAccount(req,res){
        const acc=accounts.find(acc=>acc.accountnumber===req.params.id);
        const signi = login.find(u => u.id === req.body.staffid);
        if(acc){
            const oldBalance=acc.balance;
            const newBalance=oldBalance+req.body.amout;
            const tra={
                id:Date.now(),
                accountnumber:acc.accountnumber,
                amout:req.body.amount,
                cashier:signi.id,
                transactiontype:"credit",
                oldBalance:oldBalance,
                newBalance:newBalance
            }
            transactions.push(tra);
            res.status.send({
                status:200,
                data:tra
            })
        }
    }
    static DebitAccount(req,res){
        const acc=accounts.find(acc=>acc.accountnumber===req.params.id);
        const signi = login.find(u => u.id === req.body.staffid);
        if(acc){
            const oldBalance=acc.balance;
            const newBalance=oldBalance-req.body.amout;
            if(newBalance>0){
            const tra={
                id:Date.now(),
                accountnumber:acc.accountnumber,
                amout:req.body.amount,
                cashier:u.id,
                transactiontype:"credit",
                oldBalance:oldBalance,
                newBalance:newBalance
            }
            transactions.push(tra);
            res.status.send({
                status:200,
                data:tra
            });
        }else{
            res.status(400).send({
                status:400,
                error:`enter ammount grater than ${oldBalance}`
            });
        }
        }else{
            res.status(400).send({
                status:400,
                error:"Account not found"
            });
        }
    }

}
export default transactioncontroller; 