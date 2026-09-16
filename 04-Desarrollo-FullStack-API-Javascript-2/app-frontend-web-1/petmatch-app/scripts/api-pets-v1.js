const API_URL_REGISTRO = "http://localhost:3000/api/mascotas";
if (document.getElementById("registrar") !== null && document.getElementById("registrar") !== undefined) {
    document.getElementById("registrar").addEventListener("click", function (e) {
        e.preventDefault();
        //-- Obtenemos los valores de los campos del formulario
        const nombre = document.getElementById("nombre").value;
        const especie = document.getElementById("especie").value;
        const raza = document.getElementById("raza").value;
        const edad = document.getElementById("edad").value;
        const foto = document.getElementById("foto").value;
        const esSano = document.getElementById("esSano").checked;
        //-- Armando el JSON con los datos de la mascota
        const mascota = {
            nombre: nombre,
            especie: especie,
            raza: raza,
            edad: edad,
            foto: foto,
            esSano: esSano,
        };
        //--Invocando el API REST para registrar la mascota
        fetch(API_URL_REGISTRO, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //Si tu API requiere autenticación, puedes agregar un token de autorización aquí
            //"Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(mascota),
        }).then((response) => {
          if (response.ok) {
            console.log("Mascota registrada con éxito");
          } else {
            console.error("Error al registrar la mascota");
          }
        });
        console.log(mascota);
    });
};

const API_URL_LISTADO = "http://localhost:3000/api/mascotas";
const contenedor = document.querySelector("#catalogo-mascotas");

function tarjetaMascota(mascota) {
    const articulo = document.createElement("article");
    articulo.className = "mascota";
    const estado = mascota.esSano ? "Sano" : "Requiere revisión";
    const claseEstado = mascota.esSano ? "estado--sano" : "estado--revision";
    articulo.innerHTML = `
                <img class="mascota__foto" src="${mascota.foto}" alt="Foto de ${mascota.nombre}" loading="lazy">
                <div class="mascota__contenido">
                    <h2 class="mascota__nombre">${mascota.nombre}</h2>
                    <p class="mascota__datos">
                        <strong>Especie:</strong> ${mascota.especie}<br>
                        <strong>Raza:</strong> ${mascota.raza}<br>
                        <strong>Edad:</strong> ${mascota.edad} años
                    </p>
                    <span class="estado ${claseEstado}">${estado}</span>
                </div>`;
    return articulo;
}

async function cargarMascotas() {
    try {
        //-- Invocando el API REST para obtener el listado de mascotas
        const respuesta = await fetch(API_URL_LISTADO);
        if (!respuesta.ok) throw new Error("No se pudo obtener el catálogo");
        const datos = await respuesta.json();
        const mascotas = Array.isArray(datos) ? datos : datos.mascotas || [datos];
        //-- Limpiando el contenedor y agregando las tarjetas de mascotas (estilizacion HTML con CSS)
        contenedor.replaceChildren(...mascotas.map(tarjetaMascota));
        if (!mascotas.length)
            contenedor.innerHTML = '<p class="mensaje">No hay mascotas disponibles.</p>';
    } catch (error) {
        contenedor.innerHTML = '<p class="mensaje">No fue posible cargar las mascotas. Verifica que la API esté disponible.</p>';
    }
}
