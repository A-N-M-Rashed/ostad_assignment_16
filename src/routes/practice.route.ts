import { Router } from "express";
import { getDatabase } from "../db";



export const practiceRouter = Router();

practiceRouter.get("/", (req, res) => {
    res.json({ message: "Practice route working!" });
});

//Task 2: Show All
practiceRouter.get(
    "/all",
    async (req, res) => {
        const db = getDatabase();

        const result = await db.collection("student").find({}).toArray();

        res.json(result);
    },
);

//Task 2: Show One
practiceRouter.get(
    "/one-student",
    async (req, res) => {
        const db = getDatabase();

        const result = await db.collection("student").findOne({ name: "Rafiq" });

        res.json(result);
    },
);

//Task 2: Show Projection
practiceRouter.get(
    "/projection",
    async (req, res) => {
        const db = getDatabase();

        const result = await db.collection("student").find({}, {
            projection: {
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
    async (req, res) => {
        const db = getDatabase();

        const result = await db.collection("student").aggregate([
            {
                $match: {
                    age: { $gt: 20 },
                },
            },
        ]).toArray();

        res.json(result);
    },
);

//Task 3: CSE Department
practiceRouter.get(
    "/cse",
    async (req, res) => {
        const db = getDatabase();

        const result = await db.collection("student").aggregate([
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
    async (req, res) => {
        const db = getDatabase();

        const result = await db.collection("student").aggregate([
            {
                $match: {
                    cgpa: {
                        $gte: 3.50
                    },
                },
            }, {
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

//Task 4: Sort by CGPA (Highest to Lowest)
practiceRouter.get("/sort", async (req, res) => {
    const db = getDatabase();

    const result = await db
        .collection("student")
        .aggregate([
            {
                $sort: {
                    cgpa: -1,
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    cgpa: 1,
                    department: 1,
                },
            },
        ])
        .toArray();

    res.json(result);
});

//Task 4: limit first three students
practiceRouter.get("/limit", async (req, res) => {
    const db = getDatabase();

    const result = await db
        .collection("student")
        .aggregate([
            {
                $sort: {
                    cgpa: -1,
                },
            },
            {
                $limit: 3
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    cgpa: 1,
                    department: 1,
                },
            },
        ])
        .toArray();

    res.json(result);
});


//Task 5: update department
practiceRouter.patch("/update-dept", async (req, res) => {
    const db = getDatabase();

    const result = await db
        .collection("student")
        .updateOne(
            { name: "Sumon" },
            { $set: { "department": "CSE" } }
        );

    res.json(result);
});

//get updated student info
practiceRouter.get("/get-updated-dept", async (req, res) => {
    const db = getDatabase();
    const result = await db
        .collection("student")
        .aggregate([
            {
                $match: {
                    name: "Sumon"
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    department: 1
                }
            }
        ]).toArray();

    res.json(result);
})


//Task 5: increase cgpa
practiceRouter.patch("/increase-cgpa", async (req, res) => {
    const db = getDatabase();

    const result = await db
        .collection("student")
        .updateOne(
            { name: "Karim" },
            { $inc: { "cgpa": 0.2 } }
        );

    res.json(result);
});

//get
practiceRouter.get("/get-updated-cgpa", async (req, res) => {
    const db = getDatabase();
    const result = await db
        .collection("student")
        .aggregate([
            {
                $match: {
                    name: "Sumon"
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    cgpa: 1
                }
            }
        ]).toArray();

    res.json(result);
})

//Task 6: Delete Queries
practiceRouter.delete("/delete-student", async (req, res) => {
    const db = getDatabase();

    const result = await db
        .collection("student")
        .deleteOne({ name: "Habib" });
    res.json(
        {
            message: "Student deleted successfully",
            result
        });
});