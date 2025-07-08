
import { Router } from "express";
const router = Router();
import Bomberos from "../models/Bomberos.js";
import { vistaNuevoSiniestro, crearSiniestro } from "../controllers/siniestros/crear.js";
import { listarSiniestros } from "../controllers/siniestros/listar.js"; 
import { vistaAgregarDotacion } from "../controllers/siniestros/agregarDotacion.js";

// Rutas para siniestros:
router.get("/siniestros/nuevo", vistaNuevoSiniestro);
router.post("/siniestros/nuevo", crearSiniestro);

//Rutas para Dotacion :
router.get("/siniestros/:id/dotacion", vistaAgregarDotacion);


// Ruta para listar todos los siniestros
router.get("/siniestros", listarSiniestros);


router.get("/siniestros/choferesPorUnidad", async (req, res) => {
  const unidadSeleccionada = parseInt(req.query.unidad);

  try {
    const choferes = await Bomberos.find({
      estado: "Activo",
      chofer: true,
      unidadesHabilitadas: unidadSeleccionada,
    }).select("nombre apellido rango _id").lean();

    res.json(choferes);
  } catch (error) {
    console.error("Error al buscar choferes:", error);
    res.status(500).json({ error: "Error al obtener los choferes." });
  }
});


export default router;
