import { Router } from "express";
import Bomberos from "../models/Bomberos";
import Unidades from "../models/Unidades";
import Novedades from "../models/Novedades";
import Movimientos from "../models/Movimientos";
import Grados from "../models/Grados";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});



// rutas novedades.

router.get("/novedades", async (req, res) => {
  const novedad = await Novedades.find().lean().sort({ _id: -1 });
  novedad.sort();

  res.render("novedades", { novedad: novedad });
});

router.get("/novedadesAdd", async (req, res) => {
  const bombero = await Bomberos.find().lean();
  res.render("novedadesAdd", { bombero: bombero });
});

router.post("/novedades/agregar", async (req, res) => {
  const novedades = Novedades(req.body);
  await novedades.save();
  res.redirect("/novedades");
});

//movimientos Unidades

router.get("/movimientos", async (req, res) => {
  const movimiento = await Movimientos.find().lean();
  res.render("movimientoUnidades", { movimiento: movimiento });
});

router.get("/movimientoAdd", async (req, res) => {
  const bombero = await Bomberos.find().lean();
  const unidad = await Unidades.find().lean();

  res.render("movimientosAdd", { unidad: unidad, bombero: bombero });
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
