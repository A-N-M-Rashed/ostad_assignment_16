import { Router } from "express";
import { getDatabase } from "../db";



export const practiceRouter = Router();

practiceRouter.get("/", (req, res) => {
  res.json({ message: "Practice route working!" });
});

//Task 2: Show All
practiceRouter.get(
    "/all",
    async(req, res)=>{
        const db= getDatabase();

        const result =await db.collection("student").find({}).toArray();

        res.json(result);
    },
);

//Task 2: Show One
practiceRouter.get(
    "/one-student",
    async(req, res)=>{
        const db= getDatabase();

        const result =await db.collection("student").findOne({ name: "Rafiq" });

        res.json(result);
    },
);

//Task 2: Show Projection
practiceRouter.get(
    "/projection",
    async(req, res)=>{
        const db= getDatabase();

        const result =await db.collection("student").aggregate([{
            $project:{
                _id: 0,
                name: 1,
                department: 1
            }
        }]).toArray();

        res.json(result);
    },
);