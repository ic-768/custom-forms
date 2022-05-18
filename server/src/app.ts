import express from "express";
import cors from "cors";

import { port, client } from "./config";
import userRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import formsRouter from "./controllers/forms";

const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/add-user", userRouter);
app.use("/login", loginRouter);
app.use("/forms", formsRouter);

async function main(): Promise<void> {
  try {
    await client.connect();
  } catch (e) {
    console.log("Error connecting:" + e);
  }

  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
}

main();
