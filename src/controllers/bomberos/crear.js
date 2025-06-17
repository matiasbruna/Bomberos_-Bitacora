import { errors, reiniciarErrors } from "../../models/Errors";
import { User } from "../../models/auth";
import Grados from "../../models/Grados";
import Estados from "../../models/Estados";
import Bomberos from "../../models/Bomberos";
import { obtenerUnidadesDisponibles } from "./_helpers";

export async function vistaNuevoBombero(req, res) {
  reiniciarErrors();
  const unidades = await obtenerUnidadesDisponibles();
  res.render("bomberos/bomberoAdd", { Grados, Estados, unidades, User, errors: [] });
}

export async function cargarNuevoBombero(req, res) {
  reiniciarErrors();
  const datos = req.body;

  // Validaciones simples ejemplo
  if (!datos.nombre || !datos.apellido) {
    errors.push({ text: "Nombre y apellido son obligatorios" });
  }

  if (errors.length > 0) {
    const unidades = await obtenerUnidadesDisponibles();
    return res.render("bomberos/bomberoAdd", {
      Grados,
      Estados,
      unidades,
      User,
      errors,
      ...datos,
    });
  }

  // Procesar unidadesHabilitadas para que sea un array de números
  let unidades = datos.unidadesHabilitadas || [];
  if (!Array.isArray(unidades)) {
    unidades = [unidades];
  }
  unidades = unidades.map((n) => Number(n));

  // Crear y guardar nuevo bombero
  const nuevoBombero = new Bomberos({
    nombre: datos.nombre,
    apellido: datos.apellido,
    dni: datos.dni,
    nOrden: datos.nOrden,
    rango: datos.rango,
    estado: datos.estado,
    despachador: datos.despachador === "true",
    admin: datos.admin === "true",
    chofer: datos.chofer === "true",
    unidadesHabilitadas: unidades,
  });

  try {
    await nuevoBombero.save();
    res.redirect("/bomberos"); // Redirigir a la lista o donde quieras
  } catch (error) {
    console.error(error);
    errors.push({ text: "Error guardando el bombero" });
    const unidadesDisponibles = await obtenerUnidadesDisponibles();
    res.render("bomberos/bomberoAdd", {
      Grados,
      Estados,
      unidades: unidadesDisponibles,
      User,
      errors,
      ...datos,
    });
  }
}