// ____   _   __   __ __  __   _
// |_  /  / \  \ \ / /|  \/  | / \
//  / /  / _ \  \ V / | |\/| |/ _ \
// /___\/_/ \_\  |_|  |_|  |_/_/ \_\

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import {
  limiter,
  preventParamPollution,
  securityHeaders,
  xssProtection,
} from "./security/middleware/securityMiddleware.js";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Security
app.use(securityHeaders);
app.use(xssProtection);
app.use(preventParamPollution);

//rate-Limite
app.use(limiter);

const PORT = process.env.PORT;
app.use("/api/users", userRoute);

app.use((req, res, next) => {
  res.status(200).json({ message: "Bienvenue sur Zayma Ecommerce !" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
