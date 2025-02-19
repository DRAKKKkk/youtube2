import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  // Handle registration logic
  res.send("Registration successful");
});

export default router;
