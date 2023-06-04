import  {errors , reiniciarErrors } from "../models/errors";

import Bomberos from "../models/Bomberos";
import Grados from "../models/Grados";
import Estados from "../models/Estados"
import User from "../models/auth";

export const mostrarBomberos =  async (req, res) => {
  const TodosBomberos = await Bomberos.find().lean();
  res.render("bomberos/bomberos", { TodosBomberos: TodosBomberos, User });
};


export const cargarNuevoBombero = async (req, res) => {
    const bombero = Bomberos(req.body);
    await bombero.save();
    res.redirect("/bomberos");
};

export const vistaNuevoBombero = (req, res) => {
  res.render("bomberos/bomberoAdd", { Grados: Grados,Estados });
};

export const vistaEditarBombero = async (req, res) => {
  const bombero = await Bomberos.findById(req.params.id).lean();
 console.log(bombero);
  res.render("bomberos/bomberoEditar", {bombero, Estados});
};

export const editarBombero = async (req,res)=>{
  const {nombre,apellido,dni,nOrden,rango,estado,despachador} = req.body;
  await Bomberos.findByIdAndUpdate(req.params.id, {nombre,apellido,dni,nOrden,rango,estado,despachador});
  console.log(req.body);
  res.redirect("/Bomberos");
};