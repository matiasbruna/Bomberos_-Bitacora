import Bomberos from "../../models/Bomberos";
import { User } from "../../models/auth";

// Muestra solo los bomberos que pueden ser Superiores de Turno
export async function mostrarSuperioresDeTurno(req, res) {
  const todosBomberos = await Bomberos.find({ SuperiorDeTurno: true })
    .sort({ nOrden: 1 })
    .lean();
    
  res.render("bomberos/superioresDeTurno", { todosBomberos, User });
}
