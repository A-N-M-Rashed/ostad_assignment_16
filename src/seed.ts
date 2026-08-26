import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://admin:admin12345@localhost:27017/?authSource=admin";
const client = new MongoClient(MONGO_URL);

async function seed(): Promise<void> {
    const db = client.db("assignment16");
    const student = db.collection("student");

    await student.deleteMany({});
    await student.insertOne({
        "name": "Sumon",
        "age": 21,
        "department": "EEE",
        "cgpa": 3.80
    });
    await student.insertMany([
        { "name": "Rahim", "age": 22, "department": "CSE", "cgpa": 3.75 },
        { "name": "Karim", "age": 25, "department": "BBA", "cgpa": 3.65 },
        { "name": "Salma", "age": 23, "department": "BBA", "cgpa": 3.40 },
        { "name": "Habib", "age": 26, "department": "CSE", "cgpa": 3.51 },
        { "name": "Rafiq", "age": 25, "department": "BBA", "cgpa": 3.50 }
    ]);

    console.log("Student data inserted.");
    await client.close();
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});