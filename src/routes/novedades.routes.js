// rutas novedades.
import { Router } from "express";
import Bomberos from "../models/Bomberos";
import Novedades from "../models/Novedades";
const router = Router();
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

export default router;
