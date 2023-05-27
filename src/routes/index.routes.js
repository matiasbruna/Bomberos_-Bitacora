import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get('/acercaDe',(req,res)=>{
  res.render("acercaDe");
});

export default router;
