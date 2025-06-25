// routes/guardias.routes.js

import { Router } from "express";
const router = Router();

import { vistaNuevaGuardia } from "../controllers/guardias/crearGuardia.js";

router.get("/guardias/nueva", vistaNuevaGuardia);

export default router;
