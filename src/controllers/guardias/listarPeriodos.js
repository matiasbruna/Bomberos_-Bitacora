import PeriodoDeGuardia from "../../models/Guardias/PeriodoDeGuardia.js";
import {guardias} from "../../models/Guardias/Guardias.js"; // <-- necesario para el populate
import { errors, reiniciarErrors } from "../../models/Errors.js";
import { User, Admin } from "../../models/auth";
import dayjs from "dayjs";

export async function listarPeriodos(req, res) {
  reiniciarErrors();

  try {
    const periodos = await PeriodoDeGuardia.find()
      .sort({ fechaInicio: 1 })
      .populate({
        path: "guardias",
        select: "numero fechaInicio fechaFin oficialDeSemana superiorDeTurno",
        populate: [
          { path: "oficialDeSemana", select: "nombre apellido" },
          { path: "superiorDeTurno", select: "nombre apellido" }
        ]
      })
      .lean();

    const periodosFormateados = periodos.map((p) => ({
      ...p,
      fechaInicio: dayjs(p.fechaInicio).format("DD/MM/YYYY HH:mm"),
      fechaFin: dayjs(p.fechaFin).format("DD/MM/YYYY HH:mm"),
      guardias: Array.isArray(p.guardias) ? p.guardias : [],
    }));

    res.render("guardias/listarPeriodos", {
      periodos: periodosFormateados,
      errors,
      Admin,
      User,
    });
  } catch (error) {
    console.error(error);
    errors.push({ text: "Error al cargar períodos de guardia" });
    res.render("guardias/listarPeriodos", {
      periodos: [],
      errors,
    });
  }
}

