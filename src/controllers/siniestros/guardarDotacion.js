import Siniestros from "../../models/Siniestros/Siniestros.js"; 
import Bomberos from "../../models/Bomberos.js";
import { errors, reiniciarErrors } from "../../models/Errors.js";
import { User, Admin } from "../../models/auth";

export async function guardarDotacion(req, res) {
  reiniciarErrors();

  const { unidad, chofer, jefeDotacion, bomberos } = req.body;
  const siniestroId = req.params.id;

  // Validaciones simples
  if (!unidad || !chofer || !jefeDotacion) {
    errors.push({ text: "Unidad, chofer y jefe de dotación son obligatorios." });
    
    // Obtener siniestro para renderizar la vista con errores
    const siniestro = await Siniestros.findById(siniestroId);
    
    // Aquí también deberías traer las unidades y bomberos activos para la vista
    // Asumo que tienes funciones o consultas para eso, o puedes adaptar:
    const unidades = await obtenerUnidades(); // Implementar según tu modelo
    const bomberosActivos = await obtenerBomberosActivos(); // Implementar según tu modelo

    return res.render("siniestros/agregarDotacion", {
      errors,
      siniestro,
      unidades,
      bomberosActivos,
      User,
      Admin,
      ...req.body,
    });
  }

  try {
    // Parsear bomberos agregados, puede venir como string separado por comas o array
    let bomberosIds = [];
    if (bomberos) {
      if (typeof bomberos === "string") {
        bomberosIds = bomberos.split(",").filter(id => id.trim() !== "");
      } else if (Array.isArray(bomberos)) {
        bomberosIds = bomberos;
      }
    }

    // Crear el objeto dotación para guardar en el array del siniestro
    const nuevaDotacion = {
      unidad: unidad,
      chofer: chofer,
      jefeDotacion: jefeDotacion,
      bomberos: bomberosIds,
    };

    // Agregar dotación al siniestro
    await Siniestros.findByIdAndUpdate(
      siniestroId,
      { $push: { dotaciones: nuevaDotacion } },
      { new: true }
    );

    // Redireccionar a la vista principal de siniestros o donde quieras continuar
    res.redirect("/siniestros");

  } catch (error) {
    console.error(error);
    errors.push({ text: "Error al guardar la dotación. Intente nuevamente." });
    
    // Re-render con errores y datos
    const siniestro = await Siniestros.findById(siniestroId);
    const unidades = await obtenerUnidades();
    const bomberosActivos = await obtenerBomberosActivos();

    res.render("siniestros/agregarDotacion", {
      errors,
      siniestro,
      unidades,
      bomberosActivos,
      User,
      Admin,
      ...req.body,
    });
  }
}
