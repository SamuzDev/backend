const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión con la base de datos exitosa");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default mongoose;