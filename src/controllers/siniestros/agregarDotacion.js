import Siniestros from "../../models/Siniestros/Siniestros.js";
import Bomberos from "../../models/Bomberos.js";
import Unidades from "../../models/Unidades.js";
import { User, Admin } from "../../models/auth.js";
import { errors, reiniciarErrors } from "../../models/Errors.js";

export async function vistaAgregarDotacion(req, res) {
  const siniestroId = req.params.id;
  reiniciarErrors();

  try {
    const siniestro = await Siniestros.findById(siniestroId).lean();
    if (!siniestro) {
      return res.status(404).send("Siniestro no encontrado");
    }

    // Unidades disponibles
    const unidades = await Unidades.find().sort({ numero: 1 }).lean();

    // Choferes activos
    const choferes = await Bomberos.find({ estado: "Activo", chofer: true }).sort({ apellido: 1 }).lean();

    // Bomberos activos para jefe de dotación y bomberos asignados
    const bomberosActivos = await Bomberos.find({ estado: "Activo" }).sort({ apellido: 1 }).lean();

    res.render("siniestros/dotacionAdd", {
      siniestro,
      unidades,
      choferes,
      bomberosActivos,
      User,
      Admin,
      errors,
    });
  } catch (error) {
    console.error("Error al cargar vista de dotación:", error);
    res.status(500).send("Error interno del servidor");
  }
}
