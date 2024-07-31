import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import router from "./routes";
import connection from "./config/dbConnection";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3005;

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  try {
    connection.authenticate();
    console.log(`Connection database successfully!`);
  } catch (error: any) {
    console.log(`Connection dabase error.....`);
  }

  console.log(`Server running on http://localhost:${PORT}`);
});
