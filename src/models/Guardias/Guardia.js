import { Schema, model } from "mongoose";

const guardiaSchema = new Schema(
  {
    numero: {
      type: Number,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    oficialDeSemana: {
      type: Schema.Types.ObjectId,
      ref: "Bomberos",
      required: true,
    },
    superiorDeTurno: {
      type: Schema.Types.ObjectId,
      ref: "Bomberos",
      required: true,
    },
    bomberosAsignados: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bomberos",
      }
    ],
    guardiasEspeciales: [
      {
        bombero: {
          type: Schema.Types.ObjectId,
          ref: "Bomberos",
        }
      }
    ],
    asistencias: [
      {
        type: Schema.Types.ObjectId,
        ref: "AsistenciasGuardia",
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Guardias", guardiaSchema);
