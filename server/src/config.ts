import { MongoClient } from "mongodb";
require("dotenv").config();

export const port = process.env.PORT || 3001;
export const client = new MongoClient(process.env.URI as string);
export const secret = process.env.SECRET;
