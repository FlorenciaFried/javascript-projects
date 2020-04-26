// Constructor para seguro
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;

  // Calculo cantidad segun marca
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
  }

  // Calculo la cantidad segun el seguro
  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  // Leer el año
  const diferencia = new Date().getFullYear() - this.anio;
  // Cada año de diferencia se reduce 3% el seguro
  cantidad -= (diferencia * 3 * cantidad) / 100;

  return cantidad;
};

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
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

    //Cotizar el seguro
    const cantidad = seguro.cotizarSeguro();
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
