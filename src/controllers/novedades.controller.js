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
    res.render("novedades/novedadesAdd", {User});
};

export const guardaNovedad = async (req, res) => {
    const novedades = Novedades(req.body);
    console.log(novedades);
    await novedades.save();
    res.redirect("/novedades");
  };