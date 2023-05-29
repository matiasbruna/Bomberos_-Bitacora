//Rutas de Modulo Bomberos

import { Router } from "express";
import Bomberos from "../models/Bomberos";
import Grados from "../models/Grados";
import Estados from "../models/Estados"
import User from "../models/auth";
const router = Router();

router.get("/Bomberos", async (req, res) => {
  const TodosBomberos = await Bomberos.find().lean();
  res.render("bomberos/bomberos", { TodosBomberos: TodosBomberos, User });
});

router.post("/bomberos/agregar", async (req, res) => {
  const bombero = Bomberos(req.body);
  await bombero.save();
  res.redirect("/bomberos");
});

router.get("/bomberoAdd", (req, res) => {
  res.render("bomberos/bomberoAdd", { Grados: Grados });
});

router.get("/editarBomberos/:id", async (req, res) => {
  const bombero = await Bomberos.findById(req.params.id).lean();
 console.log(bombero);
  res.render("bomberos/bomberoEditar", {bombero, Estados});
});

router.post("/bomberos/editBombero/:id", async (req,res)=>{
  const {nombre,apellido,dni,nOrden,rango,estado,despachador} = req.body;
  await Bomberos.findByIdAndUpdate(req.params.id, {nombre,apellido,dni,nOrden,rango,estado,despachador});
  console.log(req.body);
  res.redirect("/Bomberos");
})


export default router;