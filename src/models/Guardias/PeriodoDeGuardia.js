import { Schema, model } from "mongoose";

const periodoDeGuardiaSchema = new Schema(
  {
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    guardias: [
      {
        type: Schema.Types.ObjectId,
        ref: "Guardias",
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("PeriodosDeGuardia", periodoDeGuardiaSchema);
