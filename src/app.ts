import express from "express";
import { connectDatabase } from "./db";

import{ practiceRouter} from "./routes/practice.route";
import { error } from "node:console";

const app= express();
app.use(express.json());
app.use(
    "/practice",
    practiceRouter,
);

async function start(): Promise<void>{
    await connectDatabase();

    app.listen(3000,()=>{
            console.log("server is running at http://localhost:3000");
        }
    )
}

start().catch((error)=>{
    console.error(error);
    process.exit(1);
});