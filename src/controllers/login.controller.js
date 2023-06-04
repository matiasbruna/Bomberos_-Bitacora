import User from "../models/auth";
import Bomberos from "../models/Bomberos";

export const mostrarLogin = async (req, res) => {
    //buca solo los que en la propiedad despachador tengan true
    const bombero = await Bomberos.find({ despachador: true }).lean();
    res.render("users/login", { bombero });
};

export const logearBombero = async (req, res) => {
    try {
      const usuario = req.body;
      const bomberoEncontrado = await Bomberos.findOne({
        nombre: usuario.despachador,
      }).lean();
      const { dni } = bomberoEncontrado;
  
      if (bomberoEncontrado) {
        if (dni == usuario.password) {
          User.push(usuario.despachador);
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
};

export const deslogearBombero = (req,res)=>{
    User.splice(0, User.length);
    
    res.redirect("/");
};