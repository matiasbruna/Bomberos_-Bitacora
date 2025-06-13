import Movimientos from "../models/Movimientos";
import Bomberos from "../models/Bomberos";
import Unidades from "../models/Unidades";
import {User,Admin} from "../models/auth";
import { errors, reiniciarErrors} from "../models/Errors";
import { now } from "mongoose";

export const mostrarMovimeintosUnidad =  async (req, res) => {
    try{
       
        const unidad = await Unidades.find().lean();
        const movimiento = await Movimientos.find({finalizo: false}).sort({_id: -1}).lean();
        
        
        movimiento.forEach((movimiento) => {
            movimiento.fechaInicioFormatted = movimiento.fechaInicio.toLocaleDateString();
            unidad.forEach((unidad)=>{
                if (movimiento.unidad == unidad.numero){
                    movimiento.kmAnterior = unidad.km
                }
            });
        });
        

        const  movimientosTerminado = await movimientoTerminado();

        
        res.render("movimientosUnidades/movimientoUnidades", {
            User,
            Admin,
            movimiento: movimiento,
            movimientosTerminado
        });
    }
    catch(error){
        console.error(error);
    }   
};
export const mostrarMovimientoId = async (req, res) => {
    try{
        const movimiento = await Movimientos.findById(req.params.id).lean();
        
        res.render("movimientosUnidades/mostrarMovimiento", {
            User,
            Admin,
            movimiento});
    }
    catch(error){
        console.error(error);
    }   
};

export const cargarMovimientoUnidad = async (req, res) => {
    reiniciarErrors();
    const bombero = await Bomberos.find({ estado: "Activo" }).sort({ apellido: 1 }).lean(); // Solo activos y ordenados por Apellido
    const unidad = await Unidades.find().lean();
  
    res.render("movimientosUnidades/movimientosAdd", { unidad: unidad, bombero: bombero, User,Admin });
};

export const guardarMovimientoUnidad = async (req, res) => {
    reiniciarErrors();
    try
    {
        const movimiento = await Movimientos(req.body);
        const unidad = await Unidades.find().lean();
        if(!movimiento.propocito){
            errors.push({text:'Debe ingresar un propocito'});

        };

        const movimientosTodos = await Movimientos.find().lean();

        for(let mov of movimientosTodos){
            if(!mov.finalizo){
                if(mov.unidad === movimiento.unidad){
                    errors.push({text: 'Unidad pendiente de cerrar'});

                }
            }
        };

        if (errors.length > 0){

            const bombero = await Bomberos.find({ estado: "Activo" }).sort({ apellido: 1 }).lean(); // Solo activos y ordenados por Apellido
            const unidad = await Unidades.find().lean();
  
            res.render("movimientosUnidades/movimientosAdd", { unidad: unidad, bombero: bombero, User,Admin,errors });
        }
        else
        {
            movimiento.cuartelero = User[0];
            for (let Num of unidad) {
                if (Num.numero == movimiento.unidad) {
                    movimiento.km = Num.km;
                }
            }
            if(movimiento.fechaInicio == null){
                movimiento.fechaInicio = new Date();
            }
            movimiento.finalizo = false;
            await movimiento.save();
             res.redirect("/movimientos");
        }       
    }catch(error){
        console.error(error);
    }
       
};

export const terminarMovimientoUnidad = async (req, res) => {
    reiniciarErrors();
    
    try{

        const movimientoID = await Movimientos.findById(req.params.id);
        const {fechaFinal, km} = await req.body;
        
        let unidad   = await Unidades.findOne({numero: movimientoID.unidad}).lean();
    
        if (unidad.km > km){
            errors.push({text:'Los KM ingresados es menor al los km actuales'})
        }
        if(errors.length > 0){
            try{
                const unidad = await Unidades.find().lean();
                const movimiento = await Movimientos.find({finalizo: false}).sort({_id: -1}).lean();
                movimiento.forEach((movimiento) => {
                    movimiento.fechaInicioFormatted = movimiento.fechaInicio.toLocaleDateString();
                    unidad.forEach((unidad)=>{
                        if (movimiento.unidad == unidad.numero){
                            movimiento.kmAnterior = unidad.km
                        }
                    });
                });
        
                const  movimientosTerminado = await movimientoTerminado();
        
                res.render("movimientosUnidades/movimientoUnidades", {
                    movimiento: movimiento,
                    User,
                    Admin,
                    movimientosTerminado,
                    errors
                });
            }
            catch(error){
                console.error(error);
            }   

        }
        else{
            let movimientoTerminado = movimientoID ;
            movimientoTerminado.fechaFinal = new Date();
            movimientoTerminado.finalizo = 'true' ;
            movimientoTerminado.km = km;
            await Movimientos.findByIdAndUpdate(req.params.id, movimientoTerminado)
            unidad.km = km;
            await Unidades.findByIdAndUpdate(unidad._id, unidad);
            res.redirect("/movimientos")
           
        }
           


    }catch(error){
        console.error(error)
    }
};

async function GuardarKm (numeroUnidad, KM){
    
    
}

async function movimientoTerminado  () {
    const now = new Date();  // Obtén la fecha y hora actuales
    now.setHours(0, 0, 0, 0);  // Ajusta la hora para comparar solo las fechas

    const movimientoTerminado = await Movimientos.find({
        finalizo: true, 
        fechaFinal: {      ////con esta linea de codigo solo traigo los movimientos que tengan la misma fecha que hoy
            $gte: now,
            $lt: new Date(now.getTime() + 24 * 60 * 60 * 1000)
        }
    }).sort({_id: -1}).lean();
    movimientoTerminado.forEach((movimientoTerminado) => {
        movimientoTerminado.fechaInicioFormatted = movimientoTerminado.fechaInicio.toLocaleDateString();
        movimientoTerminado.fechaFinalFormatted = movimientoTerminado.fechaFinal.toLocaleDateString();
    });

    return movimientoTerminado;
}


  

