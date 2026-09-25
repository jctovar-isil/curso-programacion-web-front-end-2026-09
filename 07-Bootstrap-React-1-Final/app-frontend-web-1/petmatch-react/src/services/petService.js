const API = "http://localhost:3000/api/mascotas";

// =========================================================
// OBTENER TODAS LAS MASCOTAS
// =========================================================

export async function getPets() {
    const response = await fetch(API)
    if (!response.ok) {
        throw new Error("Error al consultar el API")
    }
    return await response.json()
}
