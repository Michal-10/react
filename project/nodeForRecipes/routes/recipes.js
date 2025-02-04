import express from 'express';
import fs from 'fs';
import path from 'path';
import authMiddleware from '../middleware/authMiddleware.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db/db.json');

// שליפת כל המתכונים
router.get('/', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db.recipes);
});

// הוספת מתכון (רק למשתמש מחובר)
router.post('/', authMiddleware, (req, res) => {
    const {
        title,
        description,
        ingredients,
        instructions
    } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));

    const newRecipe = {
        id: Date.now(),
        title,
        description,
        authorId: req.header('user-id'),
        ingredients,
        instructions,
    };

    db.recipes.push(newRecipe);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
});

router.delete('/', authMiddleware, (req, res) => {
    const id = parseInt(req.body.id);
    const db = JSON.parse(fs.readFileSync(dbPath));
    const recipe = db.recipes.find(recipe => recipe.id === id);
    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.authorId.toString()!== req.header('user-id').toString()) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    db.recipes = db.recipes.filter(recipe => recipe.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json({ message: "Recipe deleted" });
});

export default router;
