import { Schema, model } from "mongoose";

const bomberosSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    apellido: {
      type: String,
      require: true,
      trim: true,
    },
    dni: {
      type: Number,
      require: true,
      unique: true,
    },
    nOrden: {
      type: Number,
      require: true,
    },
    rango: {
      type: String,
      require: true,
      trim: true,
    },
    estado:{
      type: String , 
      default: 'Activo',
      require:true,
    },
    despachador:{
      type: Boolean,
      default: false, 
    },
    admin:{
      type: Boolean,
      default: false, 
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Bomberos", bomberosSchema);
