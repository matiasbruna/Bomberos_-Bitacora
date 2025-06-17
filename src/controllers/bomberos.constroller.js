import { errors, reiniciarErrors } from "../models/Errors";
import Bomberos from "../models/Bomberos";
import Grados from "../models/Grados";
import Estados from "../models/Estados";
import Unidades from "../models/Unidades";
import { User } from "../models/auth";

// Helper para obtener unidades no asignadas a ningún chofer
const obtenerUnidadesDisponibles = async () => {
  const choferes = await Bomberos.find({ chofer: true }, 'unidadesHabilitadas').lean();
  const assignedIds = choferes.reduce((acc, c) => acc.concat(c.unidadesHabilitadas.map(u => u.toString())), []);
  return Unidades.find({ _id: { $nin: assignedIds } }).lean();
};

// Mostrar todos los bomberos 
export const mostrarBomberos = async (req, res) => {
  const todosBomberos = await Bomberos.find().sort({ nOrden: 1 }).lean();
  res.render("bomberos/bomberos", { todosBomberos,User });
};

// Vista para crear nuevo bombero: carga solo unidades libres
export const vistaNuevoBombero = async (req, res) => {
  reiniciarErrors();
  const unidades = await obtenerUnidadesDisponibles();
  res.render("bomberos/bomberoAdd", { Grados, Estados, unidades, User, errors: [] });
};

// Cargar nuevo bombero con asignación de unidades si es chofer
export const cargarNuevoBombero = async (req, res) => {
  reiniciarErrors();
  const datos = req.body;
  const bombero = new Bomberos(datos);
  const { nombre, apellido, dni, nOrden, chofer, unidadesHabilitadas } = datos;

  // Validaciones básicas
  if (!nombre) errors.push({ text: 'Debes ingresar un Nombre.' });
  if (!apellido) errors.push({ text: 'Debes ingresar un Apellido.' });
  if (!nOrden) errors.push({ text: 'Debes ingresar un Número de Orden.' });
  if (!dni) errors.push({ text: 'Debes ingresar un DNI.' });
  else {
    const existe = await Bomberos.findOne({ dni }).lean();
    if (existe) errors.push({ text: 'El DNI ya fue ingresado.' });
  }

  // Validar unidades: si es chofer, debe seleccionar al menos una unidad
  if (chofer) {
    let unidades = unidadesHabilitadas || [];
    if (!Array.isArray(unidades)) unidades = [unidades];
    if (unidades.length === 0) {
      errors.push({ text: 'Seleccioná al menos una unidad para el chofer.' });
    }
  }

  if (errors.length > 0) {
    // Re-render con unidades libres + seleccionadas
    const unidadesDisponibles = await obtenerUnidadesDisponibles();
    let actuales = datos.unidadesHabilitadas || [];
    if (!Array.isArray(actuales)) actuales = actuales ? [actuales] : [];
    const unidadesAsignadas = await Unidades.find({ _id: { $in: actuales } }).lean();
    const unidades = [
      ...unidadesDisponibles,
      ...unidadesAsignadas.filter(u => !unidadesDisponibles.some(d => d._id.toString() === u._id.toString()))
    ];

    return res.render("bomberos/bomberoAdd", { Grados, Estados, unidades, User, errors, ...datos });
  }

  // Asignar unidades si es chofer
  if (chofer) {
    bombero.unidadesHabilitadas = Array.isArray(unidadesHabilitadas)
      ? unidadesHabilitadas
      : [unidadesHabilitadas];
  }

  try {
    await bombero.save();
    res.redirect("/bomberos");
  } catch (error) {
    console.error(error);
    res.redirect("/bomberos");
  }
};

// Vista para editar bombero: cargar unidades libres + ya asignadas al editar
export const vistaEditarBombero = async (req, res) => {
  reiniciarErrors();
  const bombero = await Bomberos.findById(req.params.id).lean();
  const unidadesDisponibles = await obtenerUnidadesDisponibles();
  const actuales = bombero.unidadesHabilitadas || [];
  const unidadesAsignadas = await Unidades.find({ _id: { $in: actuales } }).lean();
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
  const { _id, nombre, apellido, dni, nOrden, rango, estado, despachador, admin, chofer, unidadesHabilitadas } = datos;

  // Validaciones
  if (!nombre) errors.push({ text: 'Debes ingresar un Nombre.' });
  if (!apellido) errors.push({ text: 'Debes ingresar un Apellido.' });
  if (!nOrden) errors.push({ text: 'Debes ingresar un Número de Orden.' });
  if (!dni) errors.push({ text: 'Debes ingresar un DNI.' });
  if (chofer) {
    let unidades = unidadesHabilitadas || [];
    if (!Array.isArray(unidades)) unidades = [unidades];
    if (unidades.length === 0) {
      errors.push({ text: 'Seleccioná al menos una unidad para el chofer.' });
    }
  }

  if (errors.length > 0) {
    // Re-render con unidades libres + seleccionadas
    const unidadesDisponibles = await obtenerUnidadesDisponibles();
    let actuales = unidadesHabilitadas || [];
    if (!Array.isArray(actuales)) actuales = actuales ? [actuales] : [];
    const unidadesAsignadas = await Unidades.find({ _id: { $in: actuales } }).lean();
    const unidades = [
      ...unidadesDisponibles,
      ...unidadesAsignadas.filter(u => !unidadesDisponibles.some(d => d._id.toString() === u._id.toString()))
    ];

    return res.render("bomberos/bomberoEditar", { Grados, Estados, unidades, User, errors, ...datos });
  }

  // Preparar datos de actualización
  const updateData = { nombre, apellido, dni, nOrden, rango, estado, despachador, admin };
  if (chofer) {
    updateData.unidadesHabilitadas = Array.isArray(unidadesHabilitadas)
      ? unidadesHabilitadas
      : [unidadesHabilitadas];
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
