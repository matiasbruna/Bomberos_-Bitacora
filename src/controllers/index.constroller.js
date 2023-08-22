import {User,Admin} from "../models/auth"

export const mostrarIndex = (req, res) => {
    res.render("index",{User, Admin});
};

export const mostrarAcercade = (req,res)=>{
    res.render("acercaDe",{User});
  };
  