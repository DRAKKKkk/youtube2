import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  // Handle login logic
  res.send("Login successful");
});

export default router;
