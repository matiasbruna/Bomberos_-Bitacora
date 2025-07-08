import Siniestros from "../../models/Siniestros/Siniestros.js";
import { errors, reiniciarErrors } from "../../models/Errors.js";
import { User, Admin } from "../../models/auth";

export async function vistaNuevoSiniestro(req, res) {
  reiniciarErrors();
  res.render("siniestros/siniestroAdd", {
    errors,
    User,
    Admin
  });
}

export async function crearSiniestro(req, res) {
  reiniciarErrors();
  const datos = req.body;

  // Validación simple
  if (!datos.numeroParte || !datos.tipoDeSiniestro) {
    errors.push({ text: "Todos los campos son obligatorios" });
    return res.render("siniestros/siniestroAdd", {
      errors,
      User,
      Admin,
      ...datos,
    });
  }

  try {
    const nuevoSiniestro = new Siniestros({
      numeroParte: datos.numeroParte,
      tipoDeSiniestro: datos.tipoDeSiniestro,
      // El resto de los campos quedan vacíos o por defecto
    });

    await nuevoSiniestro.save();
    res.redirect(`/siniestros/${nuevoSiniestro._id}/dotacion`);
  } catch (error) {
    console.error(error);
    errors.push({ text: "Error al guardar el siniestro. Verifique que el número no esté repetido." });
    res.render("siniestros/siniestroAdd", {
      errors,
      User,
      Admin,
      ...datos,
    });
  }
}
