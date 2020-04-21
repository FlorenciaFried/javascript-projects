// Variables
const cart = document.getElementById('carrito');
const couses = document.getElementById('lista-cursos');
const listCourses = document.querySelector('#lista-carrito tbody');
const emptyCartBtn = document.getElementById('vaciar-carrito');

// -- EVENT LISTENERS --
loadEventListeners();

function loadEventListeners(){
    // Dispara cuando se presiona "Agregar carrito"
    couses.addEventListener('click', buyCouse);

    // Cuando se elimina un curso del carrito
    cart.addEventListener('click', deleteCourse);

    // Al vaciar el carrito
    emptyCartBtn.addEventListener('click', emptyCart);

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

// -- FUNCIONES --
// Funcion que añade el curso al carrito
function buyCouse(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const course = e.target.parentElement;

        console.log(course);
        // Enviamos el curso seleccionado para leer sus datos
        readCourseData(course);
    }
}

// Lee los datos del curso
function readCourseData(course){
    const infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }

    // Le paso el objeto a insertar al carrito
    insertCart(infoCourse);
}

// Muestra el curso seleccionado en el carrito
function insertCart(course){
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${course.image}" width=100>
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
            <a  href="#" 
                class="borrar-curso" 
                data-id="${course.id}"
            >X</a>
        </td>

    `;

    listCourses.appendChild(row);

    saveCourseLocalStorage(course);
}

// Elimina el curso del carrito en el DOM
function deleteCourse(e){
    e.preventDefault();
    
    let course, courseID;

    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseID = course.querySelector('a').getAttribute('data-id');
    }

    deleteCourseLS(courseID);
}

// Eliminar todos los cursos del carrito en el DOM
function emptyCart(){
    //listCourses.innerHTML = ''; ESTA ES UNA OPCION pero mas lenta
    while(listCourses.firstChild){
        listCourses.removeChild(listCourses.firstChild);
    }
    
    // Vaciar LocalStorage
    emptyLocalStorage();
}

// Almacena los cursos del carrito en LocalStorage
function saveCourseLocalStorage(course){
    let courses

    courses = getCoursesLocalStorage();

    // El curso seleccionado se agrega al carrito en LocalStorage
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Devuelve los elementos que haya en LocalStorage
function getCoursesLocalStorage(){
    let coursesLS;

    // Comprobamos si hay algo en LocalStorage
    if(localStorage.getItem('courses') === null){
        coursesLS = [];
    }else{
        coursesLS = JSON.parse(localStorage.getItem('courses'));
    }

    return coursesLS;
}

// Imprime los cursos del LocalStorage
function readLocalStorage(){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();

    coursesLS.forEach(function(course){
        // Contruir el template
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a  href="#" 
                    class="borrar-curso" 
                    data-id="${course.id}"
                >X</a>
            </td>
    
        `;
    
        listCourses.appendChild(row);
    });
}

// Elimina el curso por el ID en LocalStorage
function deleteCourseLS(course){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();

    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id == course){
            coursesLS.splice(index, 1);
        }
    });

    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// Elimina todos los cursos de LocalStorage
function emptyLocalStorage(){
    localStorage.clear();
}