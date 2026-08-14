//======== VARIABLES GLOBALES =================//
let USUARIOS = {
    admin: "admin123",
    usuario: "1234",
    demo: "demo"
};
let usuarioActual = null;
let peliculasGlobales = [];
let peliculaEnEndiccion = null;


//======== INICIALIZACION DE APP=================//
document.addEventListener("DOMContentLoaded", () => {
    inicializarApp(); 
    eventos(); 
});

function inicializarApp() {
    cargarUsuariosRegistrados();
    
    let userLogged = localStorage.getItem("usuarioLogueado");
    if (userLogged) {
        usuarioActual = JSON.parse(userLogged);
        mostrarDashboard();
    }
}

function cargarUsuariosRegistrados() {
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
    if (usuariosRegistrados) {
        Object.assign(USUARIOS, usuariosRegistrados);
    }
}


  //===========EVENTOS DEL USUARIO=================//
function eventos() {
    document.querySelector("#formLogin").addEventListener("submit", login);
    document.querySelector("#btnSalir").addEventListener("click", logout);
    document.querySelector("#formRegister").addEventListener("submit", register);
    
    // Evento directo usando tu nuevo ID, igual que los demás
    document.querySelector("#btnGuardarPeliculas").addEventListener("click", guardarPeliculas);
}



//=========== LÓGICA DE AUTENTICACIÓN =================//
function login(e) {
    e.preventDefault(); 
    e.stopPropagation();

    let user = document.getElementById("inputUser").value.trim();
    let password = document.getElementById("inputPassword").value.trim();

    if (USUARIOS[user] && USUARIOS[user] === password) {
        usuarioActual = user;
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));
        
        document.querySelector("#formLogin").reset();
        mostrarDashboard();
    } else {
        alert("El usuario y contraseña no son válidos");
    }
}

function register(e) {
    e.preventDefault(); 

    let nombre = document.getElementById("inputNombre").value.trim();
    let email = document.getElementById("inputEmail").value.trim();
    let usuario = document.getElementById("inputUseReg").value.trim();
    let password = document.getElementById("inputPasswordReg").value.trim();
    let confirmPassword = document.getElementById("inputConfirmPassword").value.trim();

    if (nombre && email && usuario && password && confirmPassword) {
        if (usuario.length < 4) {
            alert("El usuario debe contener mínimo 4 caracteres");
            return;
        }
        if (password.length < 8) {
            alert("La contraseña debe contener mínimo 8 caracteres");
            return;
        }
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        if (USUARIOS[usuario]) {
            alert("El usuario ya está registrado");
            return;
        }

        USUARIOS[usuario] = password; 
        
        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};
        usuariosRegistrados[usuario] = password;
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

        alert("Usuario " + usuario + " registrado con éxito ✔️✔️✔️✔️, inicia sesión");

        document.querySelector("#formRegister").reset();
        document.querySelector("#login-tab").click();
    } else {
        alert("Por favor completa todos los campos");
    }
}

function logout() {
    usuarioActual = null;
    localStorage.removeItem("usuarioLogueado");
    mostrarLogin();
}

//=========== FUNCIONES DE INTERFAZ (UI) =================//
function mostrarDashboard() {
    let loginSection = document.querySelector("#loginSection");
    if (loginSection) loginSection.style.display = "none";
    
    let navAuth = document.querySelector("#aut");
    if (navAuth) navAuth.style.display = "none";
    
    let btnSalir = document.querySelector("#btnSalir");
    if (btnSalir) btnSalir.classList.remove("d-none");

    let btnAgregar = document.querySelector("#btnAgregarPelicula");
    if (btnAgregar) btnAgregar.classList.remove("d-none");
    
    let dashboard = document.querySelector("#dashboard");
    if (dashboard) dashboard.style.display = "block"; // Aseguramos que se muestre

    // ✨ CORRECCIÓN AQUÍ: Apuntamos al span interno para no borrar la estrella ✨
    let userSpan = document.querySelector(".userLogged .nombre-usuario");
    if (userSpan) {
        userSpan.textContent = usuarioActual;
    }

    // Aseguramos también que se quite la clase d-none del contenedor principal si la tiene
    let userPlate = document.querySelector(".userLogged");
    if (userPlate) {
        userPlate.classList.remove("d-none");
    }

    document.body.classList.add("bg-dashboard-activo");
    
    // cargar peliculas al entrar al dashboard
    cargarPeliculas();
}

function mostrarLogin() {
    let loginSection = document.querySelector("#loginSection");
    if (loginSection) loginSection.style.display = "block"; 
    
    let navAuth = document.querySelector("#aut");
    if (navAuth) navAuth.style.display = "flex";
    
    
    let userPlate = document.querySelector(".userLogged");
    if (userPlate) {
        userPlate.classList.add("d-none"); // Oculta el cuadro de inmediato al salir
    }

    let btnSalir = document.querySelector("#btnSalir");
    if (btnSalir) btnSalir.classList.add("d-none");

    let btnAgregar = document.querySelector("#btnAgregarPelicula");
    if (btnAgregar) btnAgregar.classList.add("d-none");
    
    let dashboard = document.querySelector("#dashboard");
    if (dashboard) dashboard.style.display = "none";

    document.body.classList.remove("bg-dashboard-activo");
}

//============= DATOS DE EJEMPLO ============//
function cargarDatosEjemplo(){
    let peliculasEjemplo =[
        {
            id:1,
            titulo: "Inception",
            genero : "Ciencia Ficcion",
            director: "Christopher Nolan",
            ano: 2010,
            calificacion: 8.8,
            descripcion: "Inception es una película de ciencia ficción que sigue la historia de un grupo de ladrones que utilizan una máquina que invadi los sueños para conquistar sus objetivos más audaces.",
            imagen: "https://th.bing.com/th/id/R.4679296126f3f95d38cb7984429ced9d?rik=97VoMD8WjY%2bn2Q&pid=ImgRaw&r=0"
        },
        {
             id: 2,
            titulo: "Interstellar",
            genero: "Ciencia Ficcion",
            director: "Christopher Nolan",
            ano: 2014,
            calificacion: 8.7,
            descripcion: "Narra las aventuras de un grupo de exploradores que hacen uso de un agujero de gusano recientemente descubierto para superar las limitaciones de los viajes espaciales humanos.",
            imagen: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg"
        },
        {
            id: 3,
            titulo: "The Matrix",
            genero: "Ciencia Ficcion",
            director: "Hermanas Wachowski",
            ano: 1999,
            calificacion: 8.7,
            descripcion: "Un hacker informático aprende de misteriosos rebeldes sobre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.",
            imagen: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg"
        },
        {
            id: 4,
            titulo: "El Padrino",
            genero: "Accion",
            director: "Francis Ford Coppola",
            ano: 1972,
            calificacion: 9.2,
            descripcion: "La historia de la familia Corleone bajo el mando de Don Vito Corleone, centrándose en la transformación de su hijo menor, Michael, de un outsider a un líder mafioso.",
            imagen: "https://m.media-amazon.com/images/M/MV5BZmNiNzM4MTctODI5YS00MzczLWE2MzktNzY4YmNjYjA5YmY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        }
    ];
    localStorage.setItem("peliculas",JSON.stringify(peliculasEjemplo));
}

//============= CARGAR PELICULAS ============//
function cargarPeliculas() {
    let peliculas = localStorage.getItem("peliculas");
    
    if (!peliculas) {
        cargarDatosEjemplo();
        peliculas = localStorage.getItem("peliculas"); 
    }
    
    peliculasGlobales = peliculas ? JSON.parse(peliculas) : [];
    renderizarGrid(peliculasGlobales);
}

//============= RENDERIZAR GRID ============//
function renderizarGrid(pelis) {
    const gridPeliculas = document.getElementById("gridPeliculas");
    const sinResultados = document.getElementById("sinResultados");

    gridPeliculas.innerHTML = "";

    if (!pelis || pelis.length === 0) {
        sinResultados.style.display = "block";
        return;
    }

    sinResultados.style.display = "none";

    gridPeliculas.innerHTML = pelis.map(p => `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="movie-card">
                <img src="${p.imagen}" class="movie-image" alt="${p.titulo}" onerror="this.src='img/placehoder.png'">
                <div class="movie-content">
                    <h5 class="movie-title">${p.titulo}</h5>
                    <span class="movie-genero">${p.genero}</span>
                    <div class="movie-meta"><b>${p.ano}</b> - ${p.director}</div>
                    <div class="movie-rating">
                        <img src="img/calificacion.png" alt="Estrella" style="height: 60px; vertical-align: -3px;">
                        <span>${p.calificacion}</span> /10
                    </div>
                    <div class="movie-description">${p.descripcion}</div>
                    <div class="movie-actions">
                        <button class="btn btn-gold btn-sm d-flex align-items-center" onclick="verDetalles(${p.id})">
                            Ver Detalles
                        </button>
                        <button class="btn btn-sm" style="background-color: #f4f4f4; border: 1px solid #c4a265; color: #4a3b32;" onclick="editarPelicula(${p.id})">
                            Editar
                        </button>
                        <button class="btn btn-sm" style="background-color: #fae1dd; border: 1px solid #e29578; color: #7f4f24;" onclick="eliminarPeliculas(${p.id})">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>   
        </div>
    `).join('');
}

//Agregar o Editar peliculas 

//Agregar o Editar peliculas 
//Agregar o Editar peliculas 
function guardarPeliculas(){
    // Obtener los datos del formulario
    let titulo = document.querySelector("#inputTitulo").value.trim();
    let genero = document.querySelector("#inputGenero").value.trim();
    let director = document.querySelector("#inputDirector").value.trim();
    let ano = document.querySelector("#inputAno").value.trim();
    let calificacion = document.querySelector("#inputCalificacion").value.trim();
    let descripcion = document.querySelector("#inputDescripcion").value.trim();
    let imagen = document.querySelector("#inputImagen").value.trim();

    // Validar campos vacíos
    if (!titulo || !genero || !director || !ano || !calificacion || !descripcion || !imagen) {
        alert("Por favor completa todos los campos para guardar la película.");
        return;
    }

    // Validar si estamos editando o agregando una película
    if (peliculaEnEndiccion) {
        // --- EDITAR PELÍCULA ---
        let index = peliculasGlobales.findIndex((p) => p.id === peliculaEnEndiccion.id);
        
        if (index !== -1) {
            peliculasGlobales[index] = {
                ...peliculasGlobales[index],
                titulo, genero, director, ano, calificacion, descripcion, imagen
            };
            alert("Pelicula actualizada con exito");
        }
    } else {
        // --- AGREGAR PELÍCULA ---
        let nuevaPelicula = {
            id: Date.now(),
            titulo,
            genero,
            director,
            ano,
            calificacion,
            descripcion,
            imagen,
            fecha: new Date()
        };

        // Agregar pelicula a la lista 
        peliculasGlobales.unshift(nuevaPelicula);
        alert("Pelicula agregada exitosamente");
    }

    // ==========================================
    // ACCIONES COMUNES (Guardar, Renderizar y Cerrar)
    // ==========================================
    
    // 1. Guardar la lista actualizada en el localStorage
    localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));

    // 2. Refrescar la pantalla para ver los cambios de inmediato
    renderizarGrid(peliculasGlobales);

    // 3. Limpiar formulario, restaurar el título del modal y cerrarlo
    document.querySelector("#formAgregarPelicula").reset();
    document.querySelector("#exampleModalLabel").textContent = "Agregar Nueva Película";
    
    let modalElement = document.getElementById('exampleModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }

    // 4. Limpiar la variable de edición
    peliculaEnEndiccion = null; 
}

function editarPelicula(id){
    // Encontrar la película para editarla
    let pelicula = peliculasGlobales.find((p) => p.id === id);

    // Si se encontró llenamos el formulario 
    if(pelicula){
        peliculaEnEndiccion = pelicula; // Actualizar la variable global 

        document.querySelector("#inputTitulo").value = pelicula.titulo;
        document.querySelector("#inputGenero").value = pelicula.genero;
        document.querySelector("#inputDirector").value = pelicula.director;
        document.querySelector("#inputAno").value = pelicula.ano;
        document.querySelector("#inputCalificacion").value = pelicula.calificacion;
        document.querySelector("#inputDescripcion").value = pelicula.descripcion;
        document.querySelector("#inputImagen").value = pelicula.imagen;

        // Cambiar título del modal
        document.querySelector("#exampleModalLabel").textContent = "Editar Película";

        // CORREGIDO: Usar la variable 'modal' en minúscula con .show()
        let modalElement = document.querySelector("#exampleModal");
        let modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.show();
    }
}