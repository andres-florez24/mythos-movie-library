//======== VARIABLES GLOBALES =================//
let USUARIOS = {
    admin: "admin123",
    usuario: "1234",
    demo: "demo",
    benitoc: "12345678"
};
let usuarioActual = null;
let peliculasGlobales = [];
let peliculaEnEndiccion = null;
let intervaloCarrusel = null;

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
    document.querySelector("#btnGuardarPeliculas").addEventListener("click", guardarPeliculas);

    // ✨ NUEVOS EVENTOS PARA LOS FILTROS ✨
    document.querySelector("#inputBuscar").addEventListener("input", aplicarFiltros);
    document.querySelector("#selectGeneros").addEventListener("change", aplicarFiltros);
    document.querySelector("#selectOrden").addEventListener("change", aplicarFiltros);
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
    if (dashboard) dashboard.style.display = "block";

    let userSpan = document.querySelector(".userLogged .nombre-usuario");
    if (userSpan) {
        userSpan.textContent = usuarioActual;
    }

    let userPlate = document.querySelector(".userLogged");
    if (userPlate) {
        userPlate.classList.remove("d-none");
    }

    document.body.classList.add("bg-dashboard-activo");
    
    cargarPeliculas();
}

function mostrarLogin() {
    let loginSection = document.querySelector("#loginSection");
    if (loginSection) loginSection.style.display = "block"; 
    
    let navAuth = document.querySelector("#aut");
    if (navAuth) navAuth.style.display = "flex";
    
    let userPlate = document.querySelector(".userLogged");
    if (userPlate) {
        userPlate.classList.add("d-none"); 
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
            id: 1,
            titulo: "Inception",
            genero: "Ciencia Ficcion",
            director: "Christopher Nolan",
            ano: 2010,
            calificacion: 8.8,
            descripcion: "Inception es una película de ciencia ficción que sigue la historia de un grupo de ladrones que utilizan una máquina que invade los sueños para conquistar sus objetivos más audaces.",
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
        },
        {
            id: 5,
            titulo: "Gladiador",
            genero: "Accion",
            director: "Ridley Scott",
            ano: 2000,
            calificacion: 8.5,
            descripcion: "Un general romano traicionado busca venganza contra el corrupto emperador que asesinó a su familia, ascendiendo en las filas de los gladiadores del Coliseo.",
            imagen: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTk0NGEtMDlhMzRlZDk5YmY1XkEyXkFqcGc@._V1_.jpg"
        },
        {
            id: 6,
            titulo: "Interestelar y Más Allá",
            genero: "Aventura",
            director: "Steven Spielberg",
            ano: 1993,
            calificacion: 8.2,
            descripcion: "Un paleontólogo viaja a una isla remota donde un millonario ha clonado dinosaurios en un parque temático, desatando el caos absoluto.",
            imagen: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg"
        },
        {
            id: 7,
            titulo: "Pulp Fiction",
            genero: "Drama",
            director: "Quentin Tarantino",
            ano: 1994,
            calificacion: 8.9,
            descripcion: "Las vidas de dos matones de mafiosos, un boxeador, la esposa de un gánster y dos bandidos de poca monta se entrelazan en cuatro historias de violencia y redención.",
            imagen: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGc@._V1_.jpg"
        },
        {
            id: 8,
            titulo: "El Caballero de la Noche",
            genero: "Accion",
            director: "Christopher Nolan",
            ano: 2008,
            calificacion: 9.0,
            descripcion: "Cuando la amenaza conocida como el Guajiro o Joker emerge de su pasado desata el caos y la destrucción en Gotham, Batman debe aceptar uno de los mayores retos psicológicos.",
            imagen: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
        },
        {
            id: 9,
            titulo: "Forrest Gump",
            genero: "Drama",
            director: "Robert Zemeckis",
            ano: 1994,
            calificacion: 8.8,
            descripcion: "Las presidencias de Kennedy y Johnson, los eventos de Vietnam, el Watergate y otros eventos históricos se desarrollan a través de la perspectiva de un hombre de Alabama con un coeficiente intelectual de 75.",
            imagen: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGc@._V1_.jpg"
        },
        {
            id: 10,
            titulo: "El Señor de los Anillos: El Retorno del Rey",
            genero: "Aventura",
            director: "Peter Jackson",
            ano: 2003,
            calificacion: 9.0,
            descripcion: "Gandalf y Aragorn lideran el Mundo de los Hombres contra el ejército de Sauron para desviar su mirada de Frodo y Sam, que se acercan al Monte del Destino con el Anillo Único.",
            imagen: "https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_.jpg"
        },
        {
            id: 11,
            titulo: "Spider-Man: Un Nuevo Universo",
            genero: "Animado",
            director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
            ano: 2018,
            calificacion: 8.4,
            descripcion: "El adolescente Miles Morales se convierte en el Spider-Man de su universo, y debe unirse a cinco individuos con poderes arácnidos de otras dimensiones para detener una amenaza para todas las realidades.",
            imagen: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg"
        },
        {
            id: 12,
            titulo: "Volver al Futuro",
            genero: "Ciencia Ficcion",
            director: "Robert Zemeckis",
            ano: 1985,
            calificacion: 8.5,
            descripcion: "Marty McFly, un estudiante de secundaria de 17 años, es enviado accidentalmente treinta años al pasado en un DeLorean que viaja en el tiempo, inventado por su gran amigo, el excéntrico científico Doc Brown.",
            imagen: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGc@._V1_.jpg"
        },
        {
            id: 13,
            titulo: "El Resplandor",
            genero: "Terror",
            director: "Stanley Kubrick",
            ano: 1980,
            calificacion: 8.4,
            descripcion: "Una familia se dirige a un hotel aislado para pasar el invierno, donde una presencia siniestra influye en el padre para que se vuelva violento, mientras que su hijo vidente tiene horribles presentimientos del pasado y del futuro.",
            imagen: "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MWEtMjc0MzwtYzZjOC00M2VhLTg2YzctMzVmMzBlYWE3YmEzXkEyXkFqcGc@._V1_.jpg"
        }
    ];
    localStorage.setItem("peliculas", JSON.stringify(peliculasEjemplo));
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
    renderizarSlider();
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
function guardarPeliculas(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    let titulo = document.querySelector("#inputTitulo").value.trim();
    let genero = document.querySelector("#inputGenero").value.trim();
    let director = document.querySelector("#inputDirector").value.trim();
    let ano = document.querySelector("#inputAno").value.trim();
    let calificacion = document.querySelector("#inputCalificacion").value.trim();
    let descripcion = document.querySelector("#inputDescripcion").value.trim();
    let imagen = document.querySelector("#inputImagen").value.trim();

    if (!titulo || !genero || !director || !ano || !calificacion || !descripcion || !imagen) {
        alert("Por favor completa todos los campos para guardar la película.");
        return;
    }

    if (peliculaEnEndiccion) {
        let index = peliculasGlobales.findIndex((p) => p.id === peliculaEnEndiccion.id);
        if (index !== -1) {
            peliculasGlobales[index] = {
                ...peliculasGlobales[index],
                titulo, genero, director, ano, calificacion, descripcion, imagen
            };
            alert("Película actualizada con éxito");
        }
    } else {
        let nuevaPelicula = {
            id: Date.now(),
            titulo,
            genero,
            director,
            ano,
            calificacion,
            descripcion,
            imagen
        };

        peliculasGlobales.unshift(nuevaPelicula);
        alert("Película agregada exitosamente");
    }

    localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
    renderizarGrid(peliculasGlobales);
    renderizarSlider();

    document.querySelector("#formAgregarPelicula").reset();
    document.querySelector("#exampleModalLabel").textContent = "Agregar Nueva Película";
    
    let modalElement = document.getElementById('exampleModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }

    peliculaEnEndiccion = null; 
}

function editarPelicula(id){
    let pelicula = peliculasGlobales.find((p) => p.id === id);

    if(pelicula){
        peliculaEnEndiccion = pelicula; 

        document.querySelector("#inputTitulo").value = pelicula.titulo;
        document.querySelector("#inputGenero").value = pelicula.genero;
        document.querySelector("#inputDirector").value = pelicula.director;
        document.querySelector("#inputAno").value = pelicula.ano;
        document.querySelector("#inputCalificacion").value = pelicula.calificacion;
        document.querySelector("#inputDescripcion").value = pelicula.descripcion;
        document.querySelector("#inputImagen").value = pelicula.imagen;

        document.querySelector("#exampleModalLabel").textContent = "Editar Película";

        let modalElement = document.querySelector("#exampleModal");
        let modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// eliminar peliculas
function eliminarPeliculas(id){
    let confirmar = confirm("¿Deseas eliminar esta película?");

    if(confirmar){
        peliculasGlobales = peliculasGlobales.filter((p)=>p.id !== id);
        localStorage.setItem("peliculas", JSON.stringify(peliculasGlobales));
        cargarPeliculas();
        alert("Película eliminada con éxito");
    }
}

// ver detalle de peliculas 
function verDetalles(id){
    let pelicula = peliculasGlobales.find((p) => p.id === id);

    if(pelicula){
        document.querySelector("#detallesTitulo").textContent = pelicula.titulo;
        document.querySelector("#detallesGenero").textContent = pelicula.genero;
        document.querySelector("#detallesDirecto").textContent = pelicula.director;
        document.querySelector("#detallesAno").textContent = pelicula.ano;
        document.querySelector("#detallesCalificacion").textContent = pelicula.calificacion;
        document.querySelector("#detallesDescripcion").textContent = pelicula.descripcion;
        
        document.querySelector("#detallesImagen").src = pelicula.imagen;

        let modalElement = document.querySelector("#ModalDetalles");
        let modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        alert("No se encontró la película");
    }
}

function renderizarSlider(){
    let carrusel = document.querySelector("#carruselMovies");
    if (!carrusel) return;
    
    carrusel.innerHTML = "";
    
    peliculasGlobales.forEach((p) => {
        let card = document.createElement("div");
        card.className = "slider-movie-card";
        card.innerHTML = `
            <img src="${p.imagen}" onerror="this.src='img/placehoder.png'" alt="${p.titulo}">
            <div class="slider-movie-info">
                <h6>${p.titulo}</h6>
                <small class="text-muted">${p.ano}</small>
            </div>
        `;
        card.addEventListener("click", () => verDetalles(p.id));
        carrusel.appendChild(card); 
    });

    iniciarCarruselAutomatico();
}

function scrollSlide(direccion){
    let slider = document.querySelector("#carruselMovies");
    let scroll = 220;
    if (slider) {
        slider.scrollBy({
            left: direccion * scroll,
            behavior: "smooth"
        });
    }
}

// Función para mover el carrusel automáticamente
function iniciarCarruselAutomatico() {
    let slider = document.querySelector("#carruselMovies");
    if (!slider) return;

    clearInterval(intervaloCarrusel);

    intervaloCarrusel = setInterval(() => {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
            slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            slider.scrollBy({ left: 220, behavior: "smooth" });
        }
    }, 3000); 
}

//============= LÓGICA DE FILTROS ============//
function aplicarFiltros() {
    let textoBusqueda = document.querySelector("#inputBuscar").value.toLowerCase().trim();
    let generoSeleccionado = document.querySelector("#selectGeneros").value.toLowerCase();
    let ordenSeleccionado = document.querySelector("#selectOrden").value;

    let peliculasFiltradas = [...peliculasGlobales];

    if (textoBusqueda !== "") {
        peliculasFiltradas = peliculasFiltradas.filter((p) => 
            p.titulo.toLowerCase().includes(textoBusqueda) || 
            p.director.toLowerCase().includes(textoBusqueda)
        );
    }

    if (generoSeleccionado !== "") {
        peliculasFiltradas = peliculasFiltradas.filter((p) => 
            p.genero.toLowerCase().includes(generoSeleccionado)
        );
    }

    if (ordenSeleccionado === "mayorCalificacion") {
        peliculasFiltradas.sort((a, b) => parseFloat(b.calificacion) - parseFloat(a.calificacion));
    } 
    else if (ordenSeleccionado === "menorCalificacion") {
        peliculasFiltradas.sort((a, b) => parseFloat(a.calificacion) - parseFloat(b.calificacion));
    } 
    else if (ordenSeleccionado === "top5") {
        peliculasFiltradas.sort((a, b) => parseFloat(b.calificacion) - parseFloat(a.calificacion));
        peliculasFiltradas = peliculasFiltradas.slice(0, 5);
    }

    renderizarGrid(peliculasFiltradas);
}