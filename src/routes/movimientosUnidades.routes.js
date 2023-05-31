//movimientos Unidades
import { Router } from "express";
import Movimientos from "../models/Movimientos";
import Bomberos from "../models/Bomberos";
import Unidades from "../models/Unidades";
import User from "../models/auth";
import moment from "moment";

const router = Router();

router.get("/movimientos", async (req, res) => {
  const movimiento = await Movimientos.find().lean();
  const movimientoTerminado = await Movimientos.find({finalizo: true}).lean();
  res.render("movimientosUnidades/movimientoUnidades", { movimiento: movimiento, User, movimientoTerminado});
});

router.get("/movimientoAdd", async (req, res) => {
  const bombero = await Bomberos.find().lean();
  const unidad = await Unidades.find().lean();

  res.render("movimientosUnidades/movimientosAdd", { unidad: unidad, bombero: bombero, User });
});

router.post("/movimiento/agregar", async (req, res) => {
  const movimiento = await Movimientos(req.body);
  const unidad = await Unidades.find().lean();
  console.log(User);
  movimiento.cuartelero = User[0];
  console.log(movimiento)
  for (let Num of unidad) {
    if (Num.numero == movimiento.unidad) {
      movimiento.km = Num.km;
    }
  }
  movimiento.finalizo = false;
  // movimiento.fechaInicio = moment(movimiento.fechaInicio, "DD/MM/YY HH:mm:ss").toDate();
  console.log(movimiento);

  await movimiento.save();
  res.redirect("/movimientos");
});

export default router;
