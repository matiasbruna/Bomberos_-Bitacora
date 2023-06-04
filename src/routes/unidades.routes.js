//Rutas Unidades
import { Router } from "express";

import { guardarUnidad, mostrarUnidades, vistaCargarUnidad } from "../controllers/unidades.controller";
const router = Router();

router.get("/unidades", mostrarUnidades);

router.get("/unidadesAdd", vistaCargarUnidad);

router.post("/unidades/agregar", guardarUnidad);

export default router;
