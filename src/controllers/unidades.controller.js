import Unidades from "../models/Unidades";
import {User,Admin} from "../models/auth";
import {errors, reiniciarErrors} from "../models/Errors";

export const mostrarUnidades = async (req, res) => {
    try{
        //traigo las unidades y las ordeno por numero.
        const unidades = await Unidades.find().sort({numero:1}).lean();

        res.render("unidades/unidades", { unidades , User, Admin});
    }
    catch(error){
        console.error(error);
    }
};

export const vistaCargarUnidad = (req, res) => {
    reiniciarErrors();
    res.render("unidades/unidadesAdd",{User,Admin});
};

export const guardarUnidad = async (req, res) => {
    reiniciarErrors();
    try{
        const unidad = Unidades(req.body);

        const {numero, marca , propocito,km } = unidad
        
        if(!numero){
            errors.push({text:'Debe ingresar un numero valido'});
        }
        if(!marca){
            errors.push({text:'Debe ingresar una marca'});
        }
        if(!propocito){
            errors.push({text:'Debe ingresar un propocito'});
        }
        if(!km){
            errors.push({text:'Debe ingresar km de la unidad.'});
        }

        if (errors.length > 0 ){

            res.render("unidades/unidadesAdd",{
                User,
                Admin,
                errors,
                numero,
                marca,
                propocito,
                km
            });

        }
        else 
        {
            await unidad.save();
                    
            res.redirect("/unidades");
        }
    }
    catch(error){
        console.error(error);
    }
};

export const editarUnidad = async(req,res )=> {
    reiniciarErrors();
    try{
        const unidad = Unidades(req.body);

        const {_id, numero, marca , propocito,km, } = unidad
        
        if(!numero){
            errors.push({text:'Debe ingresar un numero valido'});
        }
        if(!marca){
            errors.push({text:'Debe ingresar una marca'});
        }
        if(!propocito){
            errors.push({text:'Debe ingresar un propocito'});
        }
        if(!km){
            errors.push({text:'Debe ingresar km de la unidad.'});
        }

        if (errors.length > 0 ){

            const unidad = await Unidades.findById(req.params.id).lean();

            res.render("unidades/unidadesEdit.hbs",{
                unidad,
                User,
                Admin,
                errors,
            });

        }
        else 
        {
            await Unidades.findByIdAndUpdate(req.params.id,{
             numero,
             marca,
             propocito, 
             km
              });
                    
            res.redirect("/unidades");
        }
    }
    catch(error){
        console.error(error);
    }

}

export const mostrarUnidadEditar = async (req,res)=>{

    const unidad = await Unidades.findById(req.params.id).lean();
    
    
    res.render("unidades/unidadesEdit.hbs", {unidad, User , Admin});
}