//======== VARIABLES GLOBALES =================//

let USUARIOS = {
    admin: "admin123",
    usuario:"1234",
    demo:"demo"
};
let usuarioActual = null;

//======== INICIALIZACION DE APP=================//

document.addEventListener ("DOMContentLoaded",()=>{
    inicializarApp();
});


function inicializarApp(){
    //verificar si hat usuario logeado
    let userLogged = localStorage.getItem("usuarioLogueado");
    if(userLogged){
        usuarioActual = JSON.parse(userLogged);
        mostarDashboard();
    }
}

function login(e){
    e.preventDefault();
    let user = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;

    if(USUARIOS[user] && USUARIOS[user] === password){
        usuarioActual = user;
    }
}



