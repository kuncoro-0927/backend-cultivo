import express from "express";
import {
  getDaerah,
  getDaerahById,
  saveDaerah,
  updateDaerah,
  deleteDaerah,
} from "../controllers/DaerahController.js";
const router = express.Router();
router.get("/daerah", getDaerah);
router.get("/daerah/:id", getDaerahById);
router.post("/daerah", saveDaerah);
router.patch("/daerah/:id", updateDaerah);
router.delete("/daerah/:id", deleteDaerah);
export default router;
