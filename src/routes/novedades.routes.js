// rutas novedades.
import { Router } from "express";
import Bomberos from "../models/Bomberos";
import Novedades from "../models/Novedades";
const router = Router();
router.get("/novedades", async (req, res) => {
  const novedad = await Novedades.find().lean().sort({ _id: -1 });
  novedad.sort();

  res.render("novedades/novedades", { novedad: novedad });
});

router.get("/novedadesAdd", async (req, res) => {
  const bombero = await Bomberos.find().lean();
  res.render("novedades/novedadesAdd", { bombero: bombero });
});

router.post("/novedadesAgregar", async (req, res) => {
  const novedades = Novedades(req.body);
  console.log(novedades);
  await novedades.save();
  res.redirect("/novedades");
});

export default router;
