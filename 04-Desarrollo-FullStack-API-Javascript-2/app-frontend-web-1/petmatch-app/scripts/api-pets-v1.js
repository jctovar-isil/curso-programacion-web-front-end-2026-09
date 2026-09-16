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
    const url = "http://localhost:3000/api/mascotas";
    fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
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
