//Rutas Unidades
import { Router } from "express";
import Unidades from "../models/Unidades";
const router = Router();

router.get("/unidades", async (req, res) => {
  const unidad = await Unidades.find().lean();
  console.log(unidad);

  res.render("unidades/unidades", { unidad: unidad });
});

router.get("/unidadesAdd", (req, res) => {
  res.render("unidades/unidadesAdd");
});

router.post("/unidades/agregar", async (req, res) => {
  const unidades = Unidades(req.body);
  await unidades.save();
  res.redirect("unidades/unidades");
});

export default router;
