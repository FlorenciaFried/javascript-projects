// Constructor para seguro
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

// Todo lo que se muestra
function Interfaz() {}

//Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarError = function (mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }

  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector(".form-group"));

  //Eliminar el mensaje despues de 3 segundos
  setTimeout(function () {
    document.querySelector(".mensaje").remove();
  }, 3000);
};

// Event Listenners
const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Leer marca seleccionada (id) del select
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;

  // Leer año seleccionado del select
  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  // Leer el valor del radio
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  // Crear una instancia de interfaz
  const interfaz = new Interfaz();

  // Revisamos que los campos no esten vacios
  if (marcaSeleccionada === "" || anioSeleccionado === "" || tipo === "") {
    // Inerfaz imprimiendo un error
    interfaz.mostrarError("Faltan datos, completar el formulario", "error");
  } else {
    // Instanciar seguro y mostrar interfaz
    console.log("Todo correcto");
  }
});

const anioActual = new Date();
const max = anioActual.getFullYear();
const min = max - 20;

const selectAnios = document.getElementById("anio");
for (let i = max; i >= min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectAnios.appendChild(option);
}
