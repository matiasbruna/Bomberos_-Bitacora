//Rutas de Modulo Bomberos

// routes/bomberos.routes.js

import { Router } from "express";
const router = Router();

import { mostrarBomberos } from "../controllers/bomberos/mostrar.js";
import { cargarNuevoBombero, vistaNuevoBombero } from "../controllers/bomberos/crear.js";
import { editarBombero, vistaEditarBombero } from "../controllers/bomberos/editar.js";
import { mostrarSuperioresDeTurno } from "../controllers/bomberos/listaSuperioresDeTurno.js";
import { mostrarChoferes } from "../controllers/bomberos/listaChoferes.js";
import { fixGuardiaEspecial } from "../controllers/bomberos/fixGuardiaEspecial.js";


router.get("/bomberos", mostrarBomberos);
router.get("/bomberoAdd", vistaNuevoBombero);
router.post("/bomberos/agregar", cargarNuevoBombero);
router.get("/editarBomberos/:id", vistaEditarBombero);
router.post("/bomberos/editBombero/:id", editarBombero);
router.get("/bomberos/superiores", mostrarSuperioresDeTurno);
router.get("/bomberos/choferes", mostrarChoferes);
router.get("/bomberos/fixGuardia", fixGuardiaEspecial);
export default router;