// rutas novedades.
import { Router } from "express";
import { cargaNovedad, guardaNovedad, mostrarNovedad } from "../controllers/novedades.controller";
const router = Router();

router.get("/novedades", mostrarNovedad);

router.get("/novedadesAdd", cargaNovedad);

router.post("/novedadesAgregar", guardaNovedad)

export default router;
