import { Router } from "express";
import { userRouter } from "../../controller/user.controller";

const apiRouter = Router();

// Mounting userProfileRouter to /api/user
apiRouter.use("/user", userRouter);

export { apiRouter };
