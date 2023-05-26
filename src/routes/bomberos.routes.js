//Rutas de Modulo Bomberos

import { Router } from "express";
import Bomberos from "../models/Bomberos";
import Grados from "../models/Grados";
const router = Router();

router.get("/Bomberos", async (req, res) => {
  const TodosBomberos = await Bomberos.find().lean();
  res.render("bomberos/bomberos", { TodosBomberos: TodosBomberos });
});

router.post("/bomberos/agregar", async (req, res) => {
  const bombero = Bomberos(req.body);
  await bombero.save();
  res.redirect("bomberos/bomberos");
});

router.get("/bomberoAdd", (req, res) => {
  res.render("bomberos/bomberoAdd", { Grados: Grados });
});


export default router;