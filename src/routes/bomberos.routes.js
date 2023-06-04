//Rutas de Modulo Bomberos

import { Router } from "express";
const router = Router();
import { 
  cargarNuevoBombero,
  editarBombero,
  mostrarBomberos, 
  vistaEditarBombero, 
  vistaNuevoBombero
} from "../controllers/bomberos.constroller";

router.get("/Bomberos", mostrarBomberos);

router.post("/bomberos/agregar", cargarNuevoBombero);

router.get("/bomberoAdd", vistaNuevoBombero);

router.get("/editarBomberos/:id", vistaEditarBombero);

router.post("/bomberos/editBombero/:id", editarBombero);


export default router;