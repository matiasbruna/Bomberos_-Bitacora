import { Schema, model } from "mongoose";

const novedadesSchema = new Schema(
  {
    bombero: {
      type: String,
      require: true,
      trim: true,
    },
    descripcion: {
      type: String,
      require: true,
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Novedades", novedadesSchema);