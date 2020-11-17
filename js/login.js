function autenticar(event) {

    event.preventDefault();

    let usuario = document.getElementById("Usuario");
    let senha = document.getElementById("Senha");

    let valor = parseInt(usuario.value);
    let isNumero = Number.isNaN(valor);
    let funcional = (isNumero)?0:valor;

    let loginMsg = {
        racf: usuario.value,
        funcional,
        senha: senha.value
    } 

    let cabecalho = {
        method: 'POST',
        body: JSON.stringify(loginMsg),
        headers:{
            'Content-type':'application/json'
        }
    }

    //envia o pedido para o servidor, e so continua somente quando chegar a resposta (then)
    fetch('http://localhost:8080/usuario/login', cabecalho)
    .then( res => tratarResposta(res) ); //'arrow function' chamando a função tratarResposta
                                        //res é a resposta que veio do backend

}


function tratarResposta (res){
    if(res.status == 200){ //usuário/senha válidos
        res.json().then(res => fazerLogin(res));
    }else{
        document.getElementById("msgErro").innerHTML = "Usuário/Senha inválidos.";
    }
}

function fazerLogin(user){
    //armazena no locastorage os dados do usuário que fez login
    localStorage.setItem("userLogged", JSON.stringify(user));

    window.location = "selecao.html";
}


function logout(){
    localStorage.removeItem("userLogged");
    window.location = "login.html";
}
