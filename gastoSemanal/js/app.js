// Variables
const presupuestoUsuario = prompt("Cual es tu presupuesto semanal?");
const formulario = document.getElementById("agregar-gasto");
let cantidadPresupuesto;

// Clases
// Clase de presupuesto
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }

  // Metodo para ir restanto del presupuesto actual
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}

// Maneja todo lo relacionado al HTML
class Interfaz {
  insertarPresupuesto(cantidad) {
    const presupuestoSpan = document.querySelector("span#total");
    const restanteSpan = document.querySelector("span#restante");

    // Insertar al HTML el presupuesto y el restante
    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }

  imprmirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.appendChild(document.createTextNode(mensaje));

    // Insertar en el DOM
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    // Sacar el mensaje de error despues de 3seg
    setTimeout(function () {
      formulario.reset();
    }, 3000);
  }

  // Inserta los gastos a la lista
  agregarGastoListado(nombre, cantidad) {
    const gastosListado = document.querySelector("#gastos ul");

    //Crear un LI
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    // Insertar el gasto
    li.innerHTML = `
        ${nombre} 
        <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
    `;

    // Poner el gasto en el HTML
    gastosListado.appendChild(li);
  }

  // Comprueba el presupuesto restante
  presupuestoRestante(cantidad) {
    const restante = document.querySelector("span#restante");

    // Leemos el presupuesto restante
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(
      cantidad
    );

    restante.innerHTML = `${presupuestoRestanteUsuario}`;

    this.colorPresupusto();
  }

  // Camvia de color el presupuesto restante
  colorPresupusto() {
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;

    // Comprobar el 25%
    if (presupuestoTotal / 4 > presupuestoRestante) {
      const restante = document.querySelector(".restante");
      restante.classList.remove("alert-success", "alert-warning");
      restante.classList.add("alert-danger");
    } else if (presupuestoTotal / 2 > presupuestoRestante) {
      const restante = document.querySelector(".restante");
      restante.classList.remove("alert-success");
      restante.classList.add("alert-warning");
    }
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  if (presupuestoUsuario === null || presupuestoUsuario == "") {
    window.location.reload();
  } else {
    // Instanciar el presupuesto
    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

    // Instanciar la clase de Interfaz
    const ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // Leer del formulario de gastos
  const nombreGasto = document.querySelector("#gasto").value;
  const cantidadGasto = document.querySelector("#cantidad").value;

  // Instanciar la interfaz
  const ui = new Interfaz();

  // Comprobar que los campos no esten vacios
  if (nombreGasto === "" || cantidadGasto === "") {
    // 2 parametros: mensaje y tipo
    ui.imprmirMensaje("Hubo un error", "error");
  } else {
    // Insertar en el HTML
    ui.imprmirMensaje("Correcto", "correcto");
    ui.agregarGastoListado(nombreGasto, cantidadGasto);
    ui.presupuestoRestante(cantidadGasto);
  }
});
