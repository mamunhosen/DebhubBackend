import { Router } from "express";

import publicRouter from "./publicRoutes";
import protectedRouter from "./protectedRoutes";
import { AppError } from "@/utils/AppError";

const apiRouter = Router();

apiRouter.use(publicRouter);

apiRouter.use(protectedRouter);

// Catch-all route for non-existing endpoints
apiRouter.use((req, res, next) => {
  next(new AppError(`Endpoint ${req.originalUrl} not found`, 404));
});

export default apiRouter;
