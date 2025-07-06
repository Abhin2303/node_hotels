import express, { Router } from 'express';
import menuItem from './../models/menuItem.js';
const router = express.Router();


//POST method to save data of Menu
router.post("/", async (req, res) => {
    try {
        //assuming the request body contans the menu data
        const data = req.body;

        //create a new menu document using the mongoose model
        const newMenu = new menuItem(data);

        //save the new menu to the database
        const savedMenu = await newMenu.save();
        console.log("Menu data saved",);
        res.status(200).json(savedMenu);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});


//GET method to show data of menu
router.get("/", async (req, res) => {
    try {
        const data = await menuItem.find();
        console.log("Menu data Fetched Successfully",);
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.get("/:tasteType", async (req, res) => {
    try {
        const taste = req.params.tasteType;
        if (taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const menudata = await menuItem.find({ taste: taste });
            console.log(`Menu item with Taste type : ${taste} found`);
            res.status(200).json(menudata);
        } else {
            res.status(404).json({ error: "Menu item of this taste type Not Found" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const data = await menuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true,
        })

        if (!data) {
            return res.status(404).json({ error: 'Person not found' })
        } else {
            console.log(`Menu data with id : ${menuId} Updated Successfully`);
            res.status(200).json(data);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const menuId = req.params.id;

        const data = await menuItem.findByIdAndDelete(menuId)

        if (!data) {
            return res.status(404).json({ error: 'Person not found' })
        } else {
            console.log(`Menu data with id : ${menuId} Deleted Successfully`);
            res.status(200).json({ message: 'Menu data Deleted Successfully' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Internal server error" });
    }
});

export default router;