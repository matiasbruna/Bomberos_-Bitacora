import Bomberos from "../../models/Bomberos";
import { User } from "../../models/auth";

//muestra la lsta de bomberos completa en la vista.

export async function mostrarBomberos(req, res) {
  const todosBomberos = await Bomberos.find()
    .sort({ nOrden: 1 })
    .lean();
  res.render("bomberos/bomberos", { todosBomberos,User });
}
