import express from "express";
import cors from "cors";

import { port, client } from "./config";
import userRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import formsRouter from "./controllers/forms";
import path from "path";

const app = express();
app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ limit: "12mb", extended: true }));
app.use(express.static("build"));
app.use(cors());
app.use("/add-user", userRouter);
app.use("/login", loginRouter);
app.use("/forms", formsRouter);
app.get("*", (_, res) => res.sendFile(path.resolve("build", "index.html")));

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
