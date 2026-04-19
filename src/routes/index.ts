import { Router } from "express";

import publicRouter from "./publicRoutes";
import protectedRouter from "./protectedRoutes";

const apiRouter = Router();

apiRouter.use(publicRouter);

apiRouter.use(protectedRouter);

export default apiRouter;
