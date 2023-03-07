import { Router } from "express";
import Bomberos from "../models/Bomberos";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

//Rutas de Modulo Bomberos

router.get("/Bomberos", (req, res) => {
  res.render("bomberos");
});

router.post("/bomberos/agregar", async(req, res) => {
  const bomberos = Bomberos(req.body);
  const bomberoguardado =  await bomberos.save();

  console.log(bomberoguardado);
  res.send("bombero agregado al abase de datos ");
});
export default router;
