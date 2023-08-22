import  {errors , reiniciarErrors } from "../models/Errors";

import Bomberos from "../models/Bomberos";
import Grados from "../models/Grados";
import Estados from "../models/Estados"
import {User, Admin} from "../models/auth";

export const mostrarBomberos =  async (req, res) => {
 

  const TodosBomberos = await Bomberos.find().sort({nOrden:1}).lean();
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
  res.render("bomberos/bomberoAdd", { Grados: Grados,Estados,User});
};

export const vistaEditarBombero = async (req, res) => {
  reiniciarErrors();
  const bombero = await Bomberos.findById(req.params.id).lean();

  let {_id,nombre,apellido,dni,nOrden,rango,estado,despachador,admin} = bombero;

  res.render("bomberos/bomberoEditar", {
    Grados: Grados,
    Estados,
    estado,
    User,
    errors,
    _id,
    nombre,
    apellido, 
    dni,
    nOrden,
    rango,
    despachador,
    admin
  });
};

export const editarBombero = async (req,res)=>{
  reiniciarErrors();

  const {_id,nombre,apellido,dni,nOrden,rango,estado,despachador,admin} = req.body;

  if(nombre == ""){
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
  };
  if(errors.length > 0){
    res.render("bomberos/bomberoEditar", {
      Grados: Grados,
      Estados,
      estado,
      User,
      errors,
      _id,
      nombre,
      apellido, 
      dni,
      nOrden,
      rango,
      despachador,
      admin
    });
  }
  else
  {
    try
    {
      await Bomberos.findByIdAndUpdate(req.params.id,{
        nombre,
        apellido,
        dni,
        nOrden,
        rango,
        estado,
        despachador,
        admin
      });

      res.redirect("/Bomberos");
    }
    catch(error)
    {
      console.log(error);
    }

  }
};