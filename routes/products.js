import express from "express";
import { DbQuery, RunDb } from "../database.js";

const router = express.Router();

// GET - /products
router.get("/products", async (req, res) => {
  try {
    const user = await DbQuery("SELECT * FROM Products", []); //Kikéri az összes terméket
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - /products/:id
router.get("/products/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [user] = await DbQuery("SELECT * FROM Products WHERE id = ?", [userId]); // Kikéri azt a terméket aminek ez az id-je
    if (!user) {
      res.status(404).json({ message: "Nincs ilyen termék!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - /products
router.post("/products", async (req, res) => {
  const { name, description, type } = req.body;
  if (!name || !description || !type) {
    res.status(400).json({ message: "Töltsd ki az összes mezőt!" });
  }
  try {
    const result = await RunDb(
      "INSERT INTO Products (name, description, type) VALUES (?,?,?)",
      [name, description, type]
    );
    res.status(201).json({ message: "Sikeres kreálás!" });
  } catch (err) {
    res.status(500).json({ message: message.err });
  }
});

// PUT - /products/:id
router.put("/products/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, description, type } = req.body;
  if (!name || !description || !type) {
    return res.status(400).json({ message: "Töltsd ki az összes mezőt!" });
  }
  try {
    const result = await RunDb(
      "UPDATE Products SET name = ?, description = ?, type = ? WHERE id = ?",
      [name, description, type, userId]
    );
    res.json(result);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE - /products/:id
router.delete("/products/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await RunDb("DELETE FROM Products WHERE id = ?", [userId]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
