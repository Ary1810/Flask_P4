document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".form-subir");
    const tituloSubirReceta = document.querySelector("h2"); 

    // Función para mostrar errores
    function mostrarError(id, mensaje) {
        let campo = document.getElementById(id);
        let errorMensaje = campo.nextElementSibling;

        if (!errorMensaje || !errorMensaje.classList.contains("error-mensaje")) {
            errorMensaje = document.createElement("p");
            errorMensaje.classList.add("error-mensaje");
            errorMensaje.style.color = "red";
            errorMensaje.style.fontSize = "14px";
            campo.insertAdjacentElement("afterend", errorMensaje);
        }
        errorMensaje.textContent = mensaje;
    }

    // Función para limpiar errores cuando el usuario corrige
    function limpiarError(id) {
        let campo = document.getElementById(id);
        let errorMensaje = campo.nextElementSibling;
        if (errorMensaje && errorMensaje.classList.contains("error-mensaje")) {
            errorMensaje.remove();
        }
    }

    // Evento para validar el formulario al enviarlo
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        let valido = true;
        let errores = {};

        // Limpiar mensajes anteriores
        document.querySelectorAll(".error-mensaje").forEach(el => el.remove());

        // Validar título
        const titulo = document.getElementById("titulo").value.trim();
        if (titulo === "") {
            errores.titulo = "El título de la receta es obligatorio.";
            valido = false;
        }

        // Validar autor
        const autor = document.getElementById("autor").value.trim();
        if (autor === "") {
            errores.autor = "El autor de la receta es obligatorio.";
            valido = false;
        }

        // Validar cantidad de personas
        const personas = document.getElementById("personas");
        if (personas.value.trim() === "" || isNaN(personas.value) || parseInt(personas.value) < 1) {
            errores.personas = "Debe ser un número mayor a 0.";
            valido = false;
        }

        // Validar tiempo de preparación
        const tiempo = document.getElementById("tiempo");
        if (tiempo.value.trim() === "" || isNaN(tiempo.value) || parseInt(tiempo.value) < 1) {
            errores.tiempo = "Debe ser un número mayor a 0.";
            valido = false;
        } else if (parseInt(tiempo.value) > 720) {
            errores.tiempo = "Máximo permitido: 12 horas (720 min).";
            valido = false;
        }

        // Validar ingredientes
        const ingredientes = document.getElementById("ingredientes").value.trim();
        if (ingredientes === "") {
            errores.ingredientes = "Este campo es obligatorio.";
            valido = false;
        }

        // Validar preparación
        const preparacion = document.getElementById("preparacion").value.trim();
        if (preparacion === "") {
            errores.preparacion = "Este campo es obligatorio.";
            valido = false;
        }

        // Validar imagen
        const imagen = document.getElementById("imagen-receta");
        if (imagen.files.length === 0) {
            errores["imagen-receta"] = "Debe subir una imagen.";
            valido = false;
        } else {
            const archivo = imagen.files[0];
            const formatosPermitidos = ["image/jpeg", "image/png", "image/gif"];
            if (!formatosPermitidos.includes(archivo.type)) {
                errores["imagen-receta"] = "Formato no válido. Solo se permiten JPG, PNG y GIF.";
                valido = false;
            }
        }

        // Mostrar errores si existen
        for (const campo in errores) {
            mostrarError(campo, errores[campo]);
        }

        if (valido) {
            if (tituloSubirReceta) {
                tituloSubirReceta.style.display = "none"; 
            }
            formulario.innerHTML = "<p style='color: green; font-size: 18px; text-align: center;'>La receta se subió correctamente. Recargando en 5 segundos.</p>";
            setTimeout(() => location.reload(), 5000);
        }
    });

    document.querySelectorAll("input, textarea, select").forEach(campo => {
        campo.addEventListener("input", function () {
            const id = this.id;
            if (id === "personas" || id === "tiempo") {
                if (this.value.trim() !== "" && !isNaN(this.value) && parseInt(this.value) > 0) {
                    limpiarError(id);
                }
            } else if (this.value.trim() !== "") {
                limpiarError(id);
            }
        });

        // Si es un campo tipo "file", validar en el cambio
        if (campo.type === "file") {
            campo.addEventListener("change", function () {
                if (this.files.length > 0) {
                    limpiarError(this.id);
                }
            });
        }
    });
});
