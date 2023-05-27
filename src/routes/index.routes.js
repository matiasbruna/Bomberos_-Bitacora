import { Router } from "express";
import Bomberos from "../models/Bomberos";
import Unidades from "../models/Unidades";
import Novedades from "../models/Novedades";
import Movimientos from "../models/Movimientos";
import Grados from "../models/Grados";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
