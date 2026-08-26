import {Db, MongoClient} from "mongodb";
import { error } from "node:console";

import process from "node:process";
const MONGO_URL= "mongodb://admin:admin12345@localhost:27017/?authSource=admin";
const DATABASE_NAME= "assignment16";
const client = new MongoClient(MONGO_URL);

let db: Db;;

export async function connectDatabase(): Promise<Db>{
    await client.connect();
    db= client.db(DATABASE_NAME);

    console.log(`MongoDB Connected: ${DATABASE_NAME}`);

    return db;
}

export function getDatabase(): Db{
    if(!db){
        throw new Error("Database is not connected.")
    }
    return db
}