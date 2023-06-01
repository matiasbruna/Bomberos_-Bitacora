import { Router } from "express";
import {
    guardadNovedad,
    CargaNovedadPersonal,
    mostrarNovedades
} from "../controllers/novedadesPersonal.controller"

const router = Router();


router.get("/novedadePersonal", mostrarNovedades);

router.get("/novedadesPersonal/cargar",CargaNovedadPersonal);

router.post("/novedadesPersonales/guardar",guardadNovedad);




export default router;