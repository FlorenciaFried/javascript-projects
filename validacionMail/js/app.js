// Variables
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("enviar");
const formularioEnviar = document.getElementById("enviar-mail");
const resetBtn = document.getElementById("resetBtn");

// --EVENT LISTENNERS --
eventListeners();

function eventListeners() {
  // Inicio de la aplicacion y deshabilitar submit
  document.addEventListener("DOMContentLoaded", inicioApp);

  // Campos del formulario
  email.addEventListener("blur", validarCampo);
  asunto.addEventListener("blur", validarCampo);
  mensaje.addEventListener("blur", validarCampo);

  // Boton de enviar
  btnEnviar.addEventListener("click", enviarEmail);

  // Boton de reset
  resetBtn.addEventListener("click", resetFormulario);
}

// --FUNCIONES--
function inicioApp() {
  // Deshabilitar el envio
  btnEnviar.disabled = true;
}

// Valida que el campo este completo
function validarCampo() {
  // Se valida la longuitud del texto y que no este vacio
  validarLonguitud(this);

  // Validar unicamente el email
  if (this.type === "email") {
    validarEmail(this);
  }

  let errores = document.querySelectorAll(".error");
  console.log(errores);

  if (email.value !== "" && asunto.value !== "" && mensaje.value !== "") {
    if (errores.length === 0) {
      btnEnviar.disabled = false;
    }
  }
}

function validarLonguitud(campo) {
  console.log(campo.value.length);
  if (campo.value.length > 0) {
    campo.style.borderBottomColor = "green";
    campo.classList.remove("error");
  } else {
    campo.style.borderBottomColor = "red";
    campo.classList.add("error");
  }
}

// Verificar
function validarEmail(campo) {
  const mensaje = campo.value;
  if (mensaje.indexOf("@") !== -1) {
    campo.style.borderBottomColor = "green";
    campo.classList.remove("error");
  } else {
    campo.style.borderBottomColor = "red";
    campo.classList.add("error");
  }
}

// Cuando se envia el correo
function enviarEmail(e) {
  // Spinner al presionar Enviar
  const spinnerGif = document.querySelector("#spinner");
  spinnerGif.style.display = "block";

  // Gif que envía el email
  const enviado = document.createElement("img");
  enviado.src = "img/mail.gif";
  enviado.style.display = "block";

  // Ocultar spinner y mostrar gif de enviaodo
  setTimeout(function () {
    spinnerGif.style.display = "none";

    document.querySelector("#loaders").appendChild(enviado);

    setTimeout(function () {
      enviado.remove();
      formularioEnviar.reset();
    }, 5000);
  }, 3000);

  e.preventDefault();
}

// Resetear el formulario
function resetFormulario(e) {
  formularioEnviar.reset();
  e.preventDefault();
}
