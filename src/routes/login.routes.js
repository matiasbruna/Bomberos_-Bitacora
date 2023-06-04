import User from "../models/auth";
import { Router } from "express";

import { deslogearBombero, logearBombero, mostrarLogin } from "../controllers/login.controller";

const router = Router();

router.get("/login", mostrarLogin);

router.post("/login", logearBombero);

router.get("/logOut", deslogearBombero);

export default router;
