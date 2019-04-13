import accounts from '../model/account.model';
import login from '../model/login';
import users from '../model/user.model';


class accountcontroller {
    static getAccounts(req, res) {
      return res.json
      ({
        status:200,
        data:accounts
      });
    }
    static createAccount(req,res){
        //find if he has log in
        const logi = login.find(a => a.id === parseInt(req.params.id));
        const user = users.find(u => u.id === parseInt(req.params.id));

        const acc = accounts.find(u => u.owner === req.body.id);
        if(user){
            if(!acc){
            
            const account={
                id:Date.now(),
                accountnumber:Math.floor(Math.random() * 70000) + 80000,
                createon:`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
                owner:user.id,
                type:req.body.type,
                status:"draft",
                balance:0
        
            }
            accounts.push(account);
            const data={
                accountNumber:account.accountnumber,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                type: account.type,
                Balance:account.balance,

            }
            return res.status(201).json({
                status:201,
                data:data
              });
            }else{
                res.status(401).send({
                    status:400,
                    error:"User arleady has account "
                });
            }

        }else{
            res.status(401).send({
                status:400,
                error:" register first before you create account"
            });
        }
    }
    static ChangeStatus(req, res) {
        const { id } = req.params;
        const user = users.find(u =>u.isAdmin ===true);
        const accn = accounts.find(acc => acc.accountnumber == req.body.accountnumber);
        if (accn) {
            if(user){
          (accn.status = req.body.status);
          return res.status(200).json({
            status: 200,
            data: {
                AccountNumber:accn.accountnumber,
                Status: accn.status
            }
          });
        }else{
            res.status(400).json({
            status:400,
            error: "You don't have privilege"
              });
            
        }
        } else{
          res.status(400).json({
            status:400,
            error: "status not updated"
          });
        }

      }

 static deleteaccount(req, res) {
       // const user = users.find(a => a.id ===req.body.id && a.type==="staff");
        const accn = accounts.find(acc => acc.accountnumber == req.params.accountnumber && acc.balance===0);
        if (!accn) {
          res.status(404).send({
            status: 404,
            error: 'account not found',
          });
        }
        const index = accounts.indexOf(accn);
        accounts.splice(index, 1);
        res.status(200).send({
          status: 200,
          message: 'account successfully deleted',
        });
        }
}
export default accountcontroller;