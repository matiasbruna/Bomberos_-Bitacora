import { Router } from "express";
import { mostrarAcercade, mostrarIndex } from "../controllers/index.constroller";
const router = Router();

router.get("/", mostrarIndex);

router.get('/acercaDe', mostrarAcercade);

export default router;
