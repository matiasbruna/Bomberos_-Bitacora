import { Router } from "express";
import {
    guardadNovedad,
    CargaNovedadPersonal,
    mostrarNovedades,
    mostrarNovedad,
    finalizarNovedad
} from "../controllers/novedadesPersonal.controller"

const router = Router();


router.get("/novedadePersonal", mostrarNovedades);

router.get("/novedadesPersonal/cargar",CargaNovedadPersonal);

router.post("/novedadesPersonales/guardar",guardadNovedad);

router.get("/novedadesPersonal/mostrarNovedad/:id", mostrarNovedad);

router.get("/novedadesPersonal/finalizarNovedad/:id",finalizarNovedad);




export default router;