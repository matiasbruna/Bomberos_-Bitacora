import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render('index');
});

//Rutas de Modulo Bomberos

router.get("/Bomberos", (req, res) => {
    res.render("bomberos");
  });

export default router;
