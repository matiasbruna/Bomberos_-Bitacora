import Siniestros from "../../models/Siniestros/Siniestros.js";
import { User, Admin } from "../../models/auth";

export async function listarSiniestros(req, res) {
  try {
    const siniestros = await Siniestros.find()
      .populate("dotaciones.unidad", "numero")          // solo campo numero de unidad
      .populate("dotaciones.jefeDotacion", "nombre apellido")
      .lean();

    res.render("siniestros/listado", { siniestros, User, Admin });
  } catch (error) {
    console.error("Error cargando siniestros:", error);
    res.status(500).send("Error cargando listado de siniestros");
  }
}
