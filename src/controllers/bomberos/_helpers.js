import Bomberos from "../../models/Bomberos";
import Unidades from "../../models/Unidades";


export async function obtenerUnidadesDisponibles() {
  return Unidades.find().sort({ numero: 1 }).lean(); // Devuelve todas ordenadas
}