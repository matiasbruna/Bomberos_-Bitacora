import PeriodoDeGuardia from "../../models/Guardias/PeriodoDeGuardia.js";
import { errors, reiniciarErrors } from "../../models/Errors.js";

export async function verGuardiasDePeriodo(req, res) {
  reiniciarErrors();

  try {
    const { id } = req.params;

    const periodo = await PeriodoDeGuardia.findById(id)
      .populate({
        path: "guardias",
        select: "numero fechaInicio fechaFin oficialDeSemana superiorDeTurno",
        populate: [
          { path: "oficialDeSemana", select: "nombre apellido" },
          { path: "superiorDeTurno", select: "nombre apellido" }
        ]
      })
      .lean();

    if (!periodo) {
      errors.push({ text: "Período no encontrado" });
      return res.redirect("/guardias/periodos");
    }

    res.render("guardias/guardiasDePeriodo", { periodo, errors });
  } catch (error) {
    console.error(error);
    errors.push({ text: "Error al cargar las guardias del período" });
    res.redirect("/guardias/periodos");
  }
}
