//======== VARIABLES GLOBALES =================//

let USUARIOS = {
    admin: "admin123",
    usuario: "1234",
    demo: "demo"
};
let usuarioActual = null;

//======== INICIALIZACION DE APP=================//

document.addEventListener("DOMContentLoaded", () => {
    inicializarApp(); // cargar aplicacion
    eventos(); // cargar eventos
});

function inicializarApp() {
    // cargar usuario registrados en locaStorage
    cargarUsuariosRegistrados();
    
    // verificar si hay usuario logeado
    let userLogged = localStorage.getItem("usuarioLogueado");
    if (userLogged) {
        usuarioActual = JSON.parse(userLogged);
        mostrarDashboard();
    }
}

function cargarUsuariosRegistrados() {
    // obtener usuarios de locaStorage y  agregarlos a la variable USUARIOS
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
    if (usuariosRegistrados) {
        Object.assign(USUARIOS, usuariosRegistrados);
    }
}

//===========EVENTOS DEL USUARIO=================//

function eventos() {
    // Evento para iniciar sesión
    document.querySelector("#formLogin").addEventListener("submit", login);
    
    // Evento para el botón de salir del menú
    document.querySelector("#btnSalir").addEventListener("click", logout);
    
    // Evento para registrar nuevo usuario
    document.querySelector("#formRegister").addEventListener("submit", register);
}

//=========== LÓGICA DE AUTENTICACIÓN =================//

function login(e) {
    e.preventDefault(); // Evita que la página recargue por defecto
    e.stopPropagation();

    let user = document.getElementById("inputUser").value.trim();
    let password = document.getElementById("inputPassword").value.trim();

    if (USUARIOS[user] && USUARIOS[user] === password) {
        usuarioActual = user;
        localStorage.setItem("usuarioLogueado", JSON.stringify(user));
        
        // Limpiar formulario y mostrar dashboard
        document.querySelector("#formLogin").reset();
        mostrarDashboard();
    } else {
        alert("El usuario y contraseña no son válidos");
    }
}

function register(e) {
    e.preventDefault(); // Evitamos que la página se recargue

    // Obtenemos los valores de los inputs
    let nombre = document.getElementById("inputNombre").value.trim();
    let email = document.getElementById("inputEmail").value.trim();
    let usuario = document.getElementById("inputUseReg").value.trim();
    let password = document.getElementById("inputPasswordReg").value.trim();
    let confirmPassword = document.getElementById("inputConfirmPassword").value.trim();

    // Validaciones
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

        // verificar si el usuario existe
        if (USUARIOS[usuario]) {
            alert("El usuario ya está registrado");
            return;
        }

        USUARIOS[usuario] = password; // agregar usuario a la lista 
        
        // guardar en el localstorage
        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {};
        usuariosRegistrados[usuario] = password;
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

        // exito
        alert("Usuario " + usuario + " registrado con éxito ✔️✔️✔️✔️, inicia sesión");

        // limpiar el formulario de registro y volver a la pestaña de login
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
    // 1. Ocultar la tarjeta de login
    let loginSection = document.querySelector("#loginSection");
    if (loginSection) loginSection.style.display = "none";
    
    // 2. Ocultar las pestañas superiores
    let navAuth = document.querySelector("#aut");
    if (navAuth) navAuth.style.display = "none";
    
    // 3. Mostrar botón Salir 
    let btnSalir = document.querySelector("#btnSalir");
    if (btnSalir) btnSalir.classList.remove("d-none");

    // ✨ 4. MOSTRAR EL BOTÓN AGREGAR PELÍCULA ✨
    let btnAgregar = document.querySelector("#btnAgregarPelicula");
    if (btnAgregar) btnAgregar.classList.remove("d-none");
    
    // 5. Mostrar el Dashboard
    let dashboard = document.querySelector("#dashboard");
    if (dashboard) dashboard.classList.remove("d-none");

    // Mostrar el nombre del usuario
    let userSpan = document.querySelector(".userLogged");
    if (userSpan) userSpan.textContent = usuarioActual;

    // Cambiar el fondo al mármol limpio
    document.body.classList.add("bg-dashboard-activo");
}

function mostrarLogin() {
    // 1. Volver a mostrar la tarjeta de login
    let loginSection = document.querySelector("#loginSection");
    if (loginSection) loginSection.style.display = "block"; 
    
    // 2. Mostrar las pestañas superiores
    let navAuth = document.querySelector("#aut");
    if (navAuth) navAuth.style.display = "flex";
    
    // 3. Ocultar botón Salir
    let btnSalir = document.querySelector("#btnSalir");
    if (btnSalir) btnSalir.classList.add("d-none");

    // ✨ 4. OCULTAR EL BOTÓN AGREGAR PELÍCULA ✨
    let btnAgregar = document.querySelector("#btnAgregarPelicula");
    if (btnAgregar) btnAgregar.classList.add("d-none");
    
    // 5. Ocultar el Dashboard
    let dashboard = document.querySelector("#dashboard");
    if (dashboard) dashboard.classList.add("d-none");

    // Quitar el fondo del dashboard para volver al original
    document.body.classList.remove("bg-dashboard-activo");
}