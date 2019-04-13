const transactions=[{
    id:Date.now(),
    createOn:`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    type:"credit",
    accountnumber:"",
    cashier:"",
    amount:0,
    oldBalance:0,
    newBalance:0
}];
export default transactions;