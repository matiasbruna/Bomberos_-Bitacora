import NovedadesPersonal from "../models/NovedadesPersonal";
import Bomberos from "../models/Bomberos";
import Situacion from "../models/Situacion";
import User from "../models/auth"
export const mostrarNovedades = async (req,res)=>{

    const novedadPersonal = await NovedadesPersonal.find().lean();
    
  res.render("novedadesPersonal/novedadesPersonal",{novedadPersonal,User})
};

export const CargaNovedadPersonal = async(req,res)=>{
    
    const bomberos = await Bomberos.find().lean();
   

    res.render("novedadesPersonal/novedadPersonalAdd",{bomberos, Situacion,User});
};

export const guardadNovedad = async (req,res)=>{
    console.log(req.body);

    res.redirect("/novedadePersonal");
};