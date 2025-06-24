import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { appConfig } from "./config/app.config";
import connectToDatabase from "./config/database.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import workspaceRoutes from "./routes/workspace.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";

const app = express();
const BASE_PATH = appConfig.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session",
    secret: appConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: appConfig.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // throw new Error("This is a test error");
    res.status(200).json({
      message: "Hello from the server",
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`,isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`,isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`,isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`,isAuthenticated, projectRoutes);
app.use(errorHandler);

app.listen(appConfig.PORT, async () => {
  await connectToDatabase();
  console.log(
    `Server is running on PORT ${appConfig.PORT} in ${appConfig.NODE_ENV} mode`
  );
});
