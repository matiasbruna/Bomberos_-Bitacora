//movimientos Unidades
import { Router } from "express";
import Movimientos from "../models/Movimientos";
import Bomberos from "../models/Bomberos";
import Unidades from "../models/Unidades";

const router = Router();

router.get("/movimientos", async (req, res) => {
  const movimiento = await Movimientos.find().lean();
  res.render("movimientosUnidades/movimientoUnidades", { movimiento: movimiento });
});

router.get("/movimientoAdd", async (req, res) => {
  const bombero = await Bomberos.find().lean();
  const unidad = await Unidades.find().lean();

  res.render("movimientosUnidades/movimientosAdd", { unidad: unidad, bombero: bombero });
});

router.post("/movimiento/agregar", async (req, res) => {
  const movimiento = await Movimientos(req.body);
  const unidad = await Unidades.find().lean();

  for (let Num of unidad) {
    if (Num.numero == movimiento.unidad) {
      movimiento.km = Num.km;
    }
  }
  movimiento.finalizo = false;
  console.log(movimiento);

  await movimiento.save();
  res.redirect("/movimientos");
});

export default router;
