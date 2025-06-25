import NovedadesPersonal from "../models/NovedadesPersonal";
import Bomberos from "../models/Bomberos";
import Situacion from "../models/Situacion";
import {User, Admin} from "../models/auth"
import  {errors , reiniciarErrors } from "../models/Errors";

 
export const mostrarNovedades = async (req,res)=>{
    reiniciarErrors(); //reinicio los errores cargados en el objeto para no mostrar errores de otra funcionalodad.
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Establecer las horas, minutos, segundos y milisegundos a cero
    const novedadPersonal = await NovedadesPersonal.find({finalizo: true, fechaFinal: {$gte: hoy}}).sort({ fechaInicio: -1 }).lean();
    const novedadPersonalPendiente = await NovedadesPersonal.find({finalizo:false}).sort({ fechaInicio: -1 }).lean();
    res.render("novedadesPersonal/novedadesPersonal",{novedadPersonal,novedadPersonalPendiente,User, Admin})
};

export const CargaNovedadPersonal = async(req,res)=>{
    
    const bomberos = await Bomberos.find().lean();
    res.render("novedadesPersonal/novedadPersonalAdd",{bomberos, Situacion,User,errors, Admin});
};

export const guardadNovedad = async (req,res)=>{
    //reinicio los errores.
    reiniciarErrors();
    //cargo lo que esta en el formulario de nueva novedad y lo cargo a la variable .
    let novedadePersonal = await NovedadesPersonal(req.body);
    // le agrego los datos que necesito para la base de datos.
    novedadePersonal.cuartelero = User[0];
    novedadePersonal.finalizo = false;
    //reviso que esten todos los datos
    const {descripcion, fechaInicio} = novedadePersonal;
    
    if(!descripcion){
       errors.push({text: 'Debe ingresar una descripcion'})
    }
    if(fechaInicio == null){
        novedadePersonal.fechaInicio = new Date();
    }

    // verifico que no tenga un novedad repetida.

    const novedadPersonalPendiente = await NovedadesPersonal.find({finalizo:false}).sort({ fechaInicio: -1 }).lean(); //novedades pendientes.

    //recorro todos los pendientes para buscar una coincidencia.
    for (const pendiente of novedadPersonalPendiente){
        
        if (pendiente.bombero == novedadePersonal.bombero){
            errors.push({text: 'El bombero seleccionado tiene una novedad pendiente.'});
            break;
        }
    }
    
    if (errors.length > 0)
    {
        res.redirect("/novedadesPersonal/cargar"); //vuelvo a recargar la vista para mostrar los errores;
    }
    else
    {
        //guardo la novedad del Peronal en la base de datos .
        await novedadePersonal.save();
        res.redirect("/novedadePersonal");

    }  
};

export const mostrarNovedad = async (req,res)=>{
    //traigo la novedad seleccionada por id finalizadas.
    const novedadPorFinalizar = await NovedadesPersonal.findById(req.params.id).lean();


    // se la envio al la vista para mostrarla.
    res.render("novedadesPersonal/novedadMostrar",{novedadPorFinalizar, User, Admin});

};

export const finalizarNovedad = async (req,res)=>{
    //cargo la novedad para actualizar sus propiedades
    let novedadFinalizada = await NovedadesPersonal.findById(req.params.id);

    //modifico las propiedades

    novedadFinalizada.finalizo = true;
    novedadFinalizada.fechaFinal = new Date();

    //actulizo la base de datos.
    await NovedadesPersonal.findByIdAndUpdate(req.params.id, novedadFinalizada);

    res.redirect("/novedadePersonal")

};