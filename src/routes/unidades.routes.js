//Rutas Unidades
import { Router } from "express";

import { guardarUnidad, mostrarUnidades, vistaCargarUnidad, editarUnidad, mostrarUnidadEditar} from "../controllers/unidades.controller";
const router = Router();

router.get("/unidades", mostrarUnidades);

router.get("/unidadesAdd", vistaCargarUnidad);

router.post("/unidades/agregar", guardarUnidad);

router.post("/unidades/editUnidad/:id" , editarUnidad);

router.get("/unidades/vistaEditarUnidad/:id", mostrarUnidadEditar);

export default router;
