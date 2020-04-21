// Variables
const listaTweets = document.getElementById('lista-tweets');

// --- EVENT LISTENERS ---
eventListeners();

function eventListeners(){
    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// --- FUNCIONES ---

// Añadir tweet del formmulario
function agregarTweet(e){
    e.preventDefault();
    
    // Leer el tweet del textarea
    const tweet = document.getElementById('tweet').value;

    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;

    // Añade el boton de borrar al tweet
    li.appendChild(botonBorrar);

    // Añade el tweet a la lista
    listaTweets.appendChild(li);

    // Añadir a local storage
    agregarTweetLocalStorage(tweet);
}

// Borrar tweet del DOM
function borrarTweet(e){
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        alert('Tweet eliminado');
    }
}

// Mostrar datos de LocalStorage en la lista
function localStorageListo(){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        // Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;

        // Añade el boton de borrar al tweet
        li.appendChild(botonBorrar);

        // Añade el tweet a la lista
        listaTweets.appendChild(li);
    });
    
}

// Agregar tweet a LocalStorage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //Añadir el nuevo tweet
    tweets.push(tweet);

    // Mandarlo a LocalStorage en forma de string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Retorna los elemtos del LocalStorage
function obtenerTweetsLocalStorage(){
    let tweets;

    // Revisamos los valores del LocalStorage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

// Eliminar tweet de LocalStorage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    tweets = obtenerTweetsLocalStorage();

    // Eimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}