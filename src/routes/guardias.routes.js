// routes/guardias.routes.js

import { Router } from "express";
const router = Router();

import { vistaNuevaGuardia, crearGuardia } from "../controllers/guardias/crearGuardia.js";
import {listarPeriodos} from "../controllers/guardias/listarPeriodos.js";
import{crearPeriodo, vistaCrearPeriodo} from "../controllers/guardias/crearPeriodo.js";


//rutas periodos:
router.get("/guardias/periodos", listarPeriodos);
router.get("/guardias/crearPeriodo", vistaCrearPeriodo);
router.post("/guardias/crearPeriodo",crearPeriodo);

//rutas guardias:
router.get("/guardias/nueva", vistaNuevaGuardia);
router.post("/guardias/crearGuardia", crearGuardia);

export default router;
