import {User,Admin} from "../models/auth";
import Bomberos from "../models/Bomberos";
import  {errors, reiniciarErrors } from "../models/Errors";

export const mostrarLogin = async (req, res) => {
    reiniciarErrors();
    //buca solo los que en la propiedad despachador tengan true
    const bombero = await Bomberos.find({ despachador: true }).sort({apellido: 1}).lean();
    res.render("users/login", { bombero });
};

export const logearBombero = async (req, res) => {
    reiniciarErrors();

    try
    {
        //cargo los datos ingresados en el formularios
        const usuario = req.body;
        // verifico que ingreso alguna password 
        const {password, apellido} = usuario;
        if (!password){ errors.push({text:'Debe ingresar una password'});}
        
        const bomberoEncontrado = await Bomberos.findOne({dni: password, apellido: apellido }).lean();
        
        if(bomberoEncontrado){
          
            let usuario = bomberoEncontrado.apellido + ", " + bomberoEncontrado.nombre;
            User.push(usuario);
            if(bomberoEncontrado.admin){
                Admin.push(usuario);
            }
            console.log(User[0])
            res.redirect("/");
        }
        else {
            errors.push({text:'Password incorrecta'})
        }

        if(errors.length> 0){
            const bombero = await Bomberos.find({ despachador: true }).lean();
            res.render("users/login", { bombero , errors});
        }
    }
    catch(error)
    {
        console.error(error);
    }
};

export const deslogearBombero = (req,res)=>{
    User.splice(0, User.length);
    Admin.splice(0, Admin.length);
    res.redirect("/");
};