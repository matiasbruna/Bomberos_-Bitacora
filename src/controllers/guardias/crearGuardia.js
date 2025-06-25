import { errors, reiniciarErrors } from "../../models/Errors";
import { User, Admin } from "../../models/auth";
import Grados from "../../models/Grados";
import Bomberos from "../../models/Bomberos";

export async function vistaNuevaGuardia(req, res) {
  reiniciarErrors();

  try {
    // Rangos de oficiales (grado 1 a 9)
    const nombresOficiales = Grados
      .filter(g => g.numero >= 1 && g.numero <= 9)
      .map(g => g.nombre);

    // Rangos de aspirantes (18 y 19)
    const nombresAspirantes = Grados
      .filter(g => g.numero >= 18)
      .map(g => g.nombre);

    // Oficiales de semana
    const oficialesSemana = await Bomberos.find({
      estado: "Activo",
      rango: { $in: nombresOficiales }
    })
      .sort({ nOrden: 1 })
      .lean();

    // Superiores de turno
    const superioresDeTurno = await Bomberos.find({
      estado: "Activo",
      SuperiorDeTurno: true
    })
      .sort({ nOrden: 1 })
      .lean();

    // Excluir oficiales, superiores, aspirantes y guardias especiales
    const idsOficiales = oficialesSemana.map(b => b._id.toString());
    const idsSuperiores = superioresDeTurno.map(b => b._id.toString());

    const idsExcluir = [...idsOficiales, ...idsSuperiores];

    const bomberosAsignables = await Bomberos.find({
      estado: "Activo",
      _id: { $nin: idsExcluir },
      rango: { $nin: nombresAspirantes },
      $or: [
        { GuardiaEspecial: { $exists: false } },
        { GuardiaEspecial: null },
        { GuardiaEspecial: false }
      ]
    })
      .sort({ nOrden: 1 })
      .lean();

    res.render("guardias/crearGuardia", {
      oficialesSemana,
      superioresDeTurno,
      bomberosAsignables,
      User,
      errors,
    });
  } catch (error) {
    console.error(error);
    errors.push({ text: "Error al cargar datos para crear guardia" });
    res.render("guardias/crearGuardia", {
      oficialesSemana: [],
      superioresDeTurno: [],
      bomberosAsignables: [],
      User,
      errors,
    });
  }
}
