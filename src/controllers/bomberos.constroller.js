import  {errors , reiniciarErrors } from "../models/errors";

import Bomberos from "../models/Bomberos";
import Grados from "../models/Grados";
import Estados from "../models/Estados"
import User from "../models/auth";

export const mostrarBomberos =  async (req, res) => {
 

  const TodosBomberos = await Bomberos.find().lean();
  res.render("bomberos/bomberos", { TodosBomberos: TodosBomberos, User});
};


export const cargarNuevoBombero = async (req, res) => {
  reiniciarErrors();

  const bombero = Bomberos(req.body);

  let {nombre , apellido,dni ,nOrden,} = bombero;

  if(!nombre){
    errors.push({text:'Debes ingresar un Nombre.'});
   
  };
  if (!apellido){
    errors.push({text:'Debes ingresar un apellido.'});
  
  };
  if(!nOrden){
    errors.push({text:'Debes ingresar un numero de orden'});
 
  };
  if(!dni){
    errors.push({text:'Debes ingresar un numero de DNI'});
 
  }
  else 
  {
    const dniBuscado = await Bomberos.find({dni:dni}).lean()
    if(dniBuscado=== dni){
      errors.push({text:'El Dni ya fue Ingresado.'})
    }
  };
  
  if(errors.length > 0){
    res.render("bomberos/bomberoAdd", {Grados: Grados,
      User,
      Estados,
      errors,
      dni,
      nombre,
      apellido,
      nOrden
    });
  }
  else
  {
    try
    {
      await bombero.save();
      res.redirect("/bomberos"); 
    }
    catch(error){
      console.log(error)
    }
  }
};

export const vistaNuevoBombero = (req, res) => {
  reiniciarErrors();
  res.render("bomberos/bomberoAdd", { Grados: Grados,Estados});
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