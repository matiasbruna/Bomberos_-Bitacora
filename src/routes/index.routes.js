import { Router } from "express";
import User from "../models/auth"
const router = Router();

router.get("/", (req, res) => {
  res.render("index",{User});
});

router.get('/acercaDe',(req,res)=>{
  res.render("acercaDe",{User});
});

export default router;
