import { Router } from "express";
import Bomberos from "../models/Bomberos";
const router = Router();

router.get("/login", async (req, res) => {
  //buca solo los que en la propiedad despachador tengan true
  const bombero = await Bomberos.find({ despachador: true }).lean();
  console.log(bombero);
  res.render("users/login", { bombero });
});

router.post("/login", async (req, res) => {
  try {
    const usuario = req.body;
    const bomberoEncontrado = await Bomberos.findOne({
      nombre: usuario.despachador,
    }).lean();
    const { dni } = bomberoEncontrado;

    if (bomberoEncontrado) {
      if (dni == usuario.password) {
        console.log("ususario encontrado");
      } else {
        console.log("Paswword Incorrecto");
      }
    } else {
      console.log("No se encontró ningún bombero con ese nombre.");
    }

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error de servidor");
  }
});

export default router;