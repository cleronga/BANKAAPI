import express from "express";
import usercontroller from "../controller/usercontroller";
import accountcontroller from '../controller/accountcontroller';
import transactioncontroller from '../controller/transactioncontroller';

const router = express.Router();

router.get("/api/v1/users", usercontroller.getUser);
router.get("/api/v1/login", usercontroller.getLog);
router.post("/api/v1/auth/signup", usercontroller.createUser);
router.post("/api/v1/auth/login", usercontroller.login);
router.delete("/api/v1/auth/logout/:id", usercontroller.signout);
router.get("/api/v1/users/:id", usercontroller.getOneUser);
router.put("/api/v1/users/:id", usercontroller.updateUser);
router.delete("/api/v1/users/:id", usercontroller.deleteUser);
//routes accounts
router.get("/api/v1/accounts", accountcontroller.getAccounts);
router.post('/api/v1/accounts/:id', accountcontroller.createAccount);
router.patch('/api/v1/accounts/:id', accountcontroller.ChangeStatus);
router.delete('/api/v1/accounts/:id', accountcontroller.deleteaccount);
// routes transaction
router.get("/api/v1/transactions", transactioncontroller.getTransaction);
router.post("/api/v1/transactions/:id/debit", transactioncontroller.DebitAccount);
router.post("/api/v1/transactions/:id/credit", transactioncontroller.creditAccount);
export default router;