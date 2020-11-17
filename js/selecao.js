function validaLogin(){

    let userTxt = localStorage.getItem("userLogged");

    if(!userTxt){
        //alert("Realizar login")
        window.location = "login.html";
    }

    let jsonUser = JSON.parse(userTxt);
    if(jsonUser != null){
        loginAprovado(jsonUser);
    }else{
        window.location = "login.html";
    }
}

function loginAprovado(user){
    
    document.getElementById("user").innerHTML = `${user.nome} <br> ${user.racf} ` ;
    document.getElementById("imgUser").innerHTML = `<img src ="${user.linkFoto}">`;
}

function cadastrar() {
    window.location = "cadastro.html";
}

function consultar() {
    window.location = "consulta.html";
}
