// con este codigo le asignamos false a todos los bomberos en el campo guardia especial.
import Bomberos from "../../models/Bomberos";

export const fixGuardiaEspecial = async (req, res) => {
  try {
    const result = await Bomberos.updateMany(
      { GuardiaEspecial: { $exists: false } }, // documentos sin el campo
      { $set: { GuardiaEspecial: false } }
    );
    res.json({
      message: "Actualización completada",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error actualizando GuardiaEspecial:", error);
    res.status(500).json({ error: "Error interno al actualizar" });
  }
};
