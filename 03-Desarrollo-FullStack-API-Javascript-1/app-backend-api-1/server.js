const express = require("express");
const cors = require("cors");
const fs = require("fs/promises"); // File System con soporte para async/await

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite peticiones del Front-end (http://localhost:5500 o similar)
app.use(express.json()); // Habilita la lectura de JSON en el cuerpo (body) del request

//-- Metodos de un API: GET, POST, PUT, DELETE
//-- GET: Obtener datos
//-- POST: Crear un nuevo recurso (o registro o objeto JSON en este caso)
//-- PUT: Actualizar un recurso existente (o registro o objeto JSON en este caso)
//-- DELETE: Eliminar un recurso existente (o registro o objeto JSON en este caso)
//-- Tambien hay INFO, TRACE, PATCH (no vamos a tocar estos metodos en este curso)

// Ruta POST: Guardar una nueva mascota en PetMatch
app.post("/api/mascotas", async (req, res) => {
  try {
    const nuevaMascota = req.body;

    // 1. Leer las mascotas actuales en el db.json
    const data = await fs.readFile("db.json", "utf-8");
    const mascotas = JSON.parse(data);

    // 2. Agregar la nueva mascota capturada
    mascotas.push(nuevaMascota);

    // 3. Escribir el nuevo listado actualizado en db.json
    // El parámetro 'null, 2' formatea el archivo JSON con sangría de 2 espacios
    await fs.writeFile("db.json", JSON.stringify(mascotas, null, 2));

    // 4. Responder al cliente Front-End
    res.status(201).json({
      mensaje: "¡Mascota registrada con éxito en PetMatch!",
      mascota: nuevaMascota,
    });
  } catch (error) {
    console.error("Error al procesar el archivo:", error);
    res
      .status(500)
      .json({ error: "Error interno al guardar los datos de la mascota" });
  }
});

// Ruta GET opcional: Obtener todas las mascotas registradas
app.get("/api/mascotas", async (req, res) => {
  try {
    const data = await fs.readFile("db.json", "utf-8");
    const mascotas = JSON.parse(data);
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las mascotas" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de PetMatch ejecutándose en http://localhost:${PORT}`,
  );
});
