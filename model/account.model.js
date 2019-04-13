const accounts=[
    {
        id:"",
        accountnumber:Math.floor(Math.random() * 90000) + 10000,
        createon:`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
        owner:"",
        type:"current",
        status:"draft",
        balance:5000

    }
];
export default accounts;