import express, { Router } from 'express';
import Person from './../models/person.js';
const router = express.Router();


//POST method to save data of person
router.post("/", async (req, res) => {
    try {
        //assuming the request body contans the person data
        const data = req.body;

        //create a new person document using the mongoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const savedPerson = await newPerson.save();
        console.log("Persons data saved",);
        res.status(200).json(savedPerson);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});


//GET method to show data of person
router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Persons data Fetched Successfully",);
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const persondata = await Person.find({ work: workType });
            console.log(`person with work type : ${workType} found`);
            res.status(200).json(persondata);
        } else {
            res.status(404).json({ error: "Person of this work type Not Found" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const data = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        })

        if (!data) {
            return res.status(404).json({ error: 'Person not found' })
        } else {
            console.log(`Person data with id : ${personId} Updated Successfully`);
            res.status(200).json(data);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const personId = req.params.id;

        const data = await Person.findByIdAndDelete(personId)

        if (!data) {
            return res.status(404).json({ error: 'Person not found' })
        } else {
            console.log(`Person data with id : ${personId} Deleted Successfully`);
            res.status(200).json({ message: 'Person data Deleted Successfully' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});


export default router;