import NovedadesPersonal from "../models/NovedadesPersonal";
import Bomberos from "../models/Bomberos";
import Situacion from "../models/Situacion";
import User from "../models/auth"
import  {errors , reiniciarErrors } from "../models/errors";

 
export const mostrarNovedades = async (req,res)=>{

    const novedadPersonal = await NovedadesPersonal.find({finalizo:true}).sort({ fechaInicio: -1 }).lean();
    const novedadPersonalPendiente = await NovedadesPersonal.find({finalizo:false}).sort({ fechaInicio: -1 }).lean();
    
    res.render("novedadesPersonal/novedadesPersonal",{novedadPersonal,novedadPersonalPendiente,User})
};

export const CargaNovedadPersonal = async(req,res)=>{
    
    const bomberos = await Bomberos.find().lean();
    res.render("novedadesPersonal/novedadPersonalAdd",{bomberos, Situacion,User,errors});
};

export const guardadNovedad = async (req,res)=>{
    //reinicio los errores.
    reiniciarErrors();
    //cargo lo que esta en el formulario de nueva novedad y lo cargo a la variable .
    let novedadePersonal = await NovedadesPersonal(req.body);
    // le agrego los datos que necesito para la base de datos.
    novedadePersonal.cuartelero = User[0];
    novedadePersonal.finalizo = false;
    console.log(novedadePersonal);
    //reviso que esten todos los datos
    const {descripcion, fechaInicial} = novedadePersonal;
    if(!descripcion){
       errors.push({text: 'Debe ingresar una descripcion'})
    }
    if(fechaInicial == null){
        novedadePersonal.fechaInicio = new Date();
    }
   
    if (errors.length > 0)
    {
        console.log (fechaInicial);
        res.redirect("/novedadesPersonal/cargar");
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
    res.render("novedadesPersonal/novedadMostrar",{novedadPorFinalizar, User});

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