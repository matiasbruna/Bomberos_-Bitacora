import { Router } from "express";
import {
    CargaNovedadPersonal,
    mostrarNovedades
} from "../controllers/novedadesPersonal.controller"

const router = Router();


router.get("/novedadePersonal", mostrarNovedades);

router.get("/novedadesPersonal/cargar",CargaNovedadPersonal);




export default router;