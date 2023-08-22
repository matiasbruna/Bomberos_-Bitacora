//rutas movimientos Unidades
import { Router } from "express";
import {
   cargarMovimientoUnidad,
   guardarMovimientoUnidad,
   mostrarMovimeintosUnidad,
   mostrarMovimientoId,
   terminarMovimientoUnidad
  } from "../controllers/movimientosUnidades.controller";

const router = Router();


router.get("/movimientos",mostrarMovimeintosUnidad);

router.get("/movimientosUnidades/verMovimiento/:id", mostrarMovimientoId);

router.get("/movimientoAdd", cargarMovimientoUnidad);

router.post("/movimiento/agregar",guardarMovimientoUnidad);

router.post("/movimiento/finalizar/:id", terminarMovimientoUnidad);

export default router;
