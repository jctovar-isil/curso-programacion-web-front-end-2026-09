document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("adoptionForm");
    const btnSubmit = document.getElementById("btnSubmit");
    const divResultado = document.getElementById("divResultado");
    const resultadoTexto = document.getElementById("resultadoTexto");

    // LÓGICA DEL EFECTO RIPPLE EN EL BOTÓN
    btnSubmit.addEventListener("click", function (e) {

        const circle = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        const rect = this.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];
        if (ripple) {
        ripple.remove();
        }

        this.appendChild(circle);
    });

    // MANEJO DEL FORMULARIO Y PETICIÓN FETCH
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Resetear estados previos
        divResultado.classList.remove("show", "shake-error");

        const formData = {
            especie: document.getElementById("especie").value,
            edad: document.getElementById("edad").value,
            estadoSalud: document.getElementById("estadoSalud").value,
        };

        // Validación básica con animación Shake si hay error
        if (!formData.edad || formData.edad <= 0) {
            form.classList.add("shake-error");
            //-- Pintar el borde de rojo en el input de edad
            document.getElementById("edad").classList.add("input-error");
            setTimeout(() => form.classList.remove("shake-error"), 500);
            return;
        } else {
            document.getElementById("edad").classList.remove("input-error");
        }

        try {
            // Simulación o petición Fetch real a la API backend
            // const response = await fetch('/api/petmatch', { ... });

            // Simulación de respuesta exitosa
            resultadoTexto.textContent =
                "¡Registro completado! La mascota cumple con las condiciones para la adopción.";
            divResultado.classList.add("show");
        } catch (error) {
            resultadoTexto.textContent = "Ocurrió un error al procesar el registro.";
            divResultado.classList.add("show", "shake-error");
        }
    });

});
