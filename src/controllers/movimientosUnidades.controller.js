import Movimientos from "../models/Movimientos";
import Bomberos from "../models/Bomberos";
import Unidades from "../models/Unidades";
import {User,Admin} from "../models/auth";

export const mostrarMovimeintosUnidad =  async (req, res) => {
    try{
        const movimiento = await Movimientos.find({finalizo: false}).lean();
        movimiento.forEach((movimiento) => {
            movimiento.fechaInicioFormatted = movimiento.fechaInicio.toLocaleDateString();
        });

        const movimientoTerminado = await Movimientos.find({finalizo: true}).lean();
        movimientoTerminado.forEach((movimientoTerminado) => {
            movimientoTerminado.fechaInicioFormatted = movimientoTerminado.fechaInicio.toLocaleDateString();
            movimientoTerminado.fechaFinalFormatted = movimientoTerminado.fechaFinal.toLocaleDateString();
        });

        res.render("movimientosUnidades/movimientoUnidades", {
            movimiento: movimiento,
            User,
            Admin,
            movimientoTerminado});
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
    
    const bombero = await Bomberos.find().lean();
    const unidad = await Unidades.find().lean();
  
    res.render("movimientosUnidades/movimientosAdd", { unidad: unidad, bombero: bombero, User,Admin });
};

export const guardarMovimientoUnidad = async (req, res) => {
    const movimiento = await Movimientos(req.body);
    const unidad = await Unidades.find().lean();
    console.log(User);
    movimiento.cuartelero = User[0];
    console.log(movimiento)
    for (let Num of unidad) {
      if (Num.numero == movimiento.unidad) {
        movimiento.km = Num.km;
      }
    }
    movimiento.finalizo = false;

  
  
    await movimiento.save();
    res.redirect("/movimientos");
};

export const terminarMovimientoUnidad = async (req, res) => {
  
    let errors =[];
    
    const movimientoID = await Movimientos.findById(req.params.id);
    const {fechaFinal, km} = await req.body;
  
   
    let movimientoTerminado = movimientoID ;
    movimientoTerminado.km = km;
    movimientoTerminado.fechaFinal = fechaFinal;
    movimientoTerminado.finalizo = 'true' ;
    console.log(km);
    
    
  
    GuardarKm(movimientoTerminado.unidad, km)
  
    await Movimientos.findByIdAndUpdate(req.params.id, movimientoTerminado)
   
    res.redirect("/movimientos")
};

async function GuardarKm (numeroUnidad, KM){
    let unidad   = await Unidades.findOne({numero: numeroUnidad}).lean();
    unidad.km = KM;
    await Unidades.findByIdAndUpdate(unidad._id, unidad);
  
}
  

