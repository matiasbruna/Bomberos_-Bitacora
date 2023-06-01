import { Schema, model } from "mongoose";

const novedadesPeronal = new Schema(
  {
    cuartelero: {
      type: String,
      require: true,
      trim: true,
    },
    bombero: {
      type: String,
      require: true,
      trim: true,
    },
    situacion: {
        type: String,
        require: true,
        trim: true,
    },
    descripcion: {
        type: String,
        require: true,
        trim: true,
    },
    fechaInicio: {
      type: Date,
      require: true,
    },
    fechaFinal: {
      type: Date,
      trim: true,
    },
    finalizo: {
        type: Boolean
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("NovedadesPersonal", novedadesPeronal);