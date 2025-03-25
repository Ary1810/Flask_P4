document.addEventListener("DOMContentLoaded", function () { 
    const formulario = document.getElementById("miFormulario");
    const titulosFormulario = document.querySelectorAll("#titulos"); 

    function obtenerValor(id) {
        return document.getElementById(id).value.trim();
    }

    function mostrarError(id, mensaje) {
        document.getElementById(id).textContent = mensaje;
    }

    function validarNombre() {
        const nombre = obtenerValor("nombre");
        if (nombre.length < 1) {
            mostrarError("error-nombre", "El campo Nombre no puede estar vacío.");
            return false;
        }
        mostrarError("error-nombre", "");
        return true;
    }

    function validarEmail() {
        const email = obtenerValor("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarError("error-email", "Ingresa un email válido.");
            return false;
        }
        mostrarError("error-email", "");
        return true;
    }

    function validarTelefono() {
        const telefono = obtenerValor("telefono");
        const telefonoRegex = /^\d{10}$/;
        
        if (telefono.length === 0) {
            mostrarError("error-telefono", ""); // Campo opcional
            return true;
        } else if (!telefonoRegex.test(telefono)) {
            mostrarError("error-telefono", "El teléfono debe contener exactamente 10 dígitos.");
            return false;
        }
        mostrarError("error-telefono", "");
        return true;
    }

    document.getElementById("telefono").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });

    function validarWebsite() {
        const website = obtenerValor("website");
        const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/;
        
        if (website.length > 0 && !urlRegex.test(website)) {
            mostrarError("error-website", "Ingresa una URL válida.");
            return false;
        }
        mostrarError("error-website", "");
        return true;
    }

    function validarAsunto() {
        const asunto = obtenerValor("asunto");
        if (asunto.length < 1) {
            mostrarError("error-asunto", "El campo Asunto no puede estar vacío.");
            return false;
        }
        mostrarError("error-asunto", "");
        return true;
    }

    function validarMensaje() {
        const mensaje = obtenerValor("mensaje");
        if (mensaje.length < 1) {
            mostrarError("error-mensaje", "El campo Mensaje no puede estar vacío.");
            return false;
        }
        mostrarError("error-mensaje", "");
        return true;
    }

    // Agregar validación en tiempo real
    document.getElementById("nombre").addEventListener("input", validarNombre);
    document.getElementById("email").addEventListener("input", validarEmail);
    document.getElementById("telefono").addEventListener("input", validarTelefono);
    document.getElementById("website").addEventListener("input", validarWebsite);
    document.getElementById("asunto").addEventListener("input", validarAsunto);
    document.getElementById("mensaje").addEventListener("input", validarMensaje);

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const esNombreValido = validarNombre();
        const esEmailValido = validarEmail();
        const esTelefonoValido = validarTelefono();
        const esWebsiteValido = validarWebsite();
        const esAsuntoValido = validarAsunto();
        const esMensajeValido = validarMensaje();

        if (esNombreValido && esEmailValido && esTelefonoValido && esWebsiteValido && esAsuntoValido && esMensajeValido) {
            formulario.style.display = "none";
            titulosFormulario.forEach(titulo => titulo.style.display = "none"); 

            const mensajeExito = document.createElement("div");
            mensajeExito.textContent = "Formulario enviado correctamente. La página se recargará en 5 segundos.";
            mensajeExito.style.color = "green";
            mensajeExito.style.marginTop = "10px";
            mensajeExito.style.textAlign = "center";
            mensajeExito.style.fontSize = "1.5em";

            document.querySelector(".contact_form").appendChild(mensajeExito);

            setTimeout(() => {
                location.reload();
            }, 5000);
        }
    });
});
