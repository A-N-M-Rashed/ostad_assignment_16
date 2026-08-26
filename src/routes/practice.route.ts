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

        const result =await db.collection("student").find({}, {
            projection:{
                _id: 0,
                name: 1,
                department: 1
            }
        }).toArray();

        res.json(result);
    },
);

//Task 3: Age greater than 20
practiceRouter.get(
    "/age-above-20",
    async(req, res)=>{
        const db= getDatabase();

        const result =await db.collection("student").aggregate([
            {
                $match: {
                    age: {$gt: 20},
                },
            },
        ]).toArray();

        res.json(result);
    },
);

//Task 3: CSE Department
practiceRouter.get(
    "/cse",
    async(req, res)=>{
        const db= getDatabase();

        const result =await db.collection("student").aggregate([
            {
                $match: {
                    department: {
                        $regex: "cse",
                        $options: "i",
                    },
                },
            },
        ]).toArray();

        res.json(result);
    },
);

//Task 3: greater than or equal to 3.50
practiceRouter.get(
    "/above-3.5",
    async(req, res)=>{
        const db= getDatabase();

        const result =await db.collection("student").aggregate([
            {
                $match: {
                    cgpa: {
                        $gte: 3.50
                    },
                },
            },{
                $project: {
                    _id: 0,
                    name: 1,
                    department: 1,
                    cgpa: 1
                }
            }
        ]).toArray();

        res.json(result);
    },
);
