import Bomberos from "../models/Bomberos";
import Novedades from "../models/Novedades";
import {User, Admin} from "../models/auth";
import {errors, reiniciarErrors} from "../models/Errors";

export const mostrarNovedad = async (req, res) => {
    reiniciarErrors();

    const novedad = await Novedades.find().lean().sort({ _id: -1 });
    novedad.sort();
  
    res.render("novedades/novedades", { novedad: novedad ,User, Admin});
};

export const cargaNovedad = async (req, res) => {
    const bombero = await Bomberos.find().lean();
    res.render("novedades/novedadesAdd", {User, Admin});
};

export const guardaNovedad = async (req, res) => {
    reiniciarErrors();
    try{
        const novedades = Novedades(req.body);

        const {descripcion} = novedades;

        if(!descripcion)
        {
            errors.push({text:'Debe ingresar al menos una descripcion.'});

        }

        if(errors.length>0){
            res.render("novedades/novedadesAdd", {User, Admin, errors});
        }
        else{

            novedades.bombero = User[0];
            await novedades.save();
            res.redirect("/novedades");

        }     
    }catch(error){
        console.error(error);
    }
    
};

export const verNovedad = async(req,res)=>{
    
    try{
        const novedad = await Novedades.findById(req.params.id).lean();
        res.render("novedades/novedad",{novedad, User,Admin})
    }catch(error){
        console.error(error);
    }
};