import Bomberos from "../../models/Bomberos";
import Unidades from "../../models/Unidades";
import { errors, reiniciarErrors } from "../../models/Errors";
import { User } from "../../models/auth";
import { obtenerUnidadesDisponibles } from "./_helpers";
import Grados from "../../models/Grados";
import Estados  from "../../models/Estados";

// Vista para editar bombero: cargar unidades libres + ya asignadas al editar
export const vistaEditarBombero = async (req, res) => {
  reiniciarErrors();
  const bombero = await Bomberos.findById(req.params.id).lean();
  const unidadesDisponibles = await obtenerUnidadesDisponibles();
  const actuales = bombero.unidadesHabilitadas || [];
  const unidadesAsignadas = await Unidades.find({ numero: { $in: actuales } }).lean();
  const unidades = [
    ...unidadesDisponibles,
    ...unidadesAsignadas.filter(u => !unidadesDisponibles.some(d => d._id.toString() === u._id.toString()))
  ];
  res.render("bomberos/bomberoEditar", { Grados, Estados, unidades, User, errors: [], ...bombero });
};

// Editar bombero y sus unidades habilitadas
export const editarBombero = async (req, res) => {
  reiniciarErrors();
  const datos = req.body;
  console.log(req.body);
  const { _id, nombre, apellido, dni, nOrden, rango, estado, despachador, admin, chofer, unidadesHabilitadas } = datos;

const esDespachador = Array.isArray(despachador)
  ? despachador.includes('true')
  : despachador === 'true';

const esAdmin = Array.isArray(admin)
  ? admin.includes('true')
  : admin === 'true';

const esChofer = Array.isArray(chofer)
  ? chofer.includes('true')
  : chofer === 'true';

  // Validaciones
  if (!nombre) errors.push({ text: 'Debes ingresar un Nombre.' });
  if (!apellido) errors.push({ text: 'Debes ingresar un Apellido.' });
  if (!nOrden) errors.push({ text: 'Debes ingresar un Número de Orden.' });
  if (!dni) errors.push({ text: 'Debes ingresar un DNI.' });

  if (esChofer) {
    let unidades = unidadesHabilitadas || [];
    if (!Array.isArray(unidades)) unidades = [unidades];
    if (unidades.length === 0) {
      errors.push({ text: 'Seleccioná al menos una unidad para el chofer.' });
    }
  }

  if (errors.length > 0) {
    const unidadesDisponibles = await obtenerUnidadesDisponibles();
    let actuales = unidadesHabilitadas || [];
    if (!Array.isArray(actuales)) actuales = actuales ? [actuales] : [];
    const unidadesAsignadas = await Unidades.find({ numero: { $in: actuales } }).lean();
    const unidades = [
      ...unidadesDisponibles,
      ...unidadesAsignadas.filter(u => !unidadesDisponibles.some(d => d._id.toString() === u._id.toString()))
    ];

    return res.render("bomberos/bomberoEditar", { Grados, Estados, unidades, User, errors, ...datos });
  }

  // Preparar datos para actualizar
  const updateData = {
    nombre,
    apellido,
    dni,
    nOrden,
    rango,
    estado,
    despachador: esDespachador,
    admin: esAdmin,
    chofer: esChofer,
  };

  // Solo asignar unidades habilitadas si es chofer, sino vaciar
  if (esChofer) {
    updateData.unidadesHabilitadas = Array.isArray(unidadesHabilitadas)
      ? unidadesHabilitadas
      : unidadesHabilitadas ? [unidadesHabilitadas] : [];
  } else {
    updateData.unidadesHabilitadas = [];
  }

  try {
    await Bomberos.findByIdAndUpdate(_id, updateData);
    res.redirect("/bomberos");
  } catch (error) {
    console.error(error);
    res.redirect("/bomberos");
  }
};