import express from "express";

import {
  createLead,
  getLeads,
  updateLeadStatus,
  addNote,
  getSingleLead
} from "../controllers/leadController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", createLead);
router.get("/", authMiddleware, getLeads);
router.get("/:id", authMiddleware, getSingleLead);
router.put("/:id/status", authMiddleware, updateLeadStatus);
router.post("/:id/note", authMiddleware, addNote);

export default router;