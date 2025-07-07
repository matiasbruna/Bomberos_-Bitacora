import PeriodoDeGuardia from "../../models/Guardias/PeriodoDeGuardia.js";
import { errors, reiniciarErrors } from "../../models/Errors.js";

// Mostrar formulario
export function vistaCrearPeriodo(req, res) {
  reiniciarErrors();
  res.render("guardias/crearPeriodo", { errors });
}

// Procesar formulario POST
export async function crearPeriodo(req, res) {
  reiniciarErrors();

  try {
    const { fechaInicio, fechaFin } = req.body;

    if (!fechaInicio || !fechaFin) {
      errors.push({ text: "Fecha inicio y fecha fin son obligatorias" });
      return res.render("guardias/crearPeriodo", { errors });
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      errors.push({ text: "Fecha fin debe ser posterior a fecha inicio" });
      return res.render("guardias/crearPeriodo", { errors });
    }

    // Validar si ya existe un período que se superpone
    const periodoExistente = await PeriodoDeGuardia.findOne({
      $or: [
        { fechaInicio: { $lte: fin }, fechaFin: { $gte: inicio } },
        { fechaInicio: { $gte: inicio, $lte: fin } },
        { fechaFin: { $gte: inicio, $lte: fin } },
      ]
    });

    if (periodoExistente) {
      errors.push({ text: "Ya existe un período dentro de ese rango de fechas o que se superpone." });
      return res.render("guardias/crearPeriodo", { errors });
    }

    const nuevoPeriodo = new PeriodoDeGuardia({ fechaInicio: inicio, fechaFin: fin });
    await nuevoPeriodo.save();

    return res.redirect("/guardias/periodos");
  } catch (error) {
    console.error(error);
    errors.push({ text: "Error al crear el período" });
    return res.render("guardias/crearPeriodo", { errors });
  }
}

