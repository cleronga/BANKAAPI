import express from "express";
import postController from "../controller/usercontroller";
import usercontroller from "../controller/usercontroller";

const router = express.Router();

router.get("/api/v1/users", usercontroller.getUser);
router.post("/api/v1/auth/signup", usercontroller.createUser);
router.get("/api/v1/users/:id", usercontroller.getOneUser);
//router.put("/api/v1/posts/:id", postController.updatePost);
router.delete("/api/v1/users/:id", usercontroller.deleteUser);

export default router;