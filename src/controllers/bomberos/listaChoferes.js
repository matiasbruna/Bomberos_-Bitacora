import Bomberos from "../../models/Bomberos";
import { User } from "../../models/auth";

// Muestra solo los bomberos que son choferes
export async function mostrarChoferes(req, res) {
  const todosBomberos = await Bomberos.find({ chofer: true })
    .sort({ nOrden: 1 })
    .lean();

  res.render("bomberos/choferes", { todosBomberos, User });
}