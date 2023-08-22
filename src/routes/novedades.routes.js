// rutas novedades.
import { Router } from "express";
import { cargaNovedad, guardaNovedad, mostrarNovedad, verNovedad } from "../controllers/novedades.controller";
const router = Router();

router.get("/novedades", mostrarNovedad);

router.get("/novedadesAdd", cargaNovedad);

router.post("/novedadesAgregar", guardaNovedad);

router.get ("/novedades/ver/:id", verNovedad);

export default router;
