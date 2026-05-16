import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const casillaSchema = mongoose.Schema(
  {
    entidad: { type: String, trim: true },
    distrito: { type: String, trim: true },
    seccion: { type: String, trim: true, required: true },
    tipoCasilla: {
      type: String,
      enum: ["basica", "contigua", "extraordinaria", "especial"],
      default: "basica",
    },
    // Identificador legible compuesto, ej. "0123-B" (sección + sufijo).
    identificador: { type: String, trim: true, unique: true, required: true },
    listaNominal: { type: Number, min: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

casillaSchema.plugin(toJSON);

export default mongoose.models.Casilla ||
  mongoose.model("Casilla", casillaSchema);
