function validaLogin(){

    let userTxt = localStorage.getItem("userLogged");

    if(!userTxt){
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
    document.getElementById("idLogado").value = user.id;
    
    fetch("http://localhost:8080/agencias")
    .then(res => res.json())
    .then(result => preencheAgencias(result));

}

function preencheAgencias(resposta){
    let agencias = '';
    for (let index = 0; index < resposta.length; index++) {
        agencias = agencias + `<option value = ${resposta[index].idAgencia}> ${resposta[index].nomeAgencia} </option>`;
    }
    document.getElementById("sel_agencias").innerHTML = agencias;
}

function cadastrarFeriado(evento){

    evento.preventDefault();

    let campoAgencia = document.getElementById("sel_agencias");
    let id = campoAgencia[campoAgencia.selectedIndex].value; 

    let nomeFeriado = document.getElementById("txtFeriado").value;
    if (nomeFeriado==""){
        alert("Preencha o nome do feriado");
        return false;
    }

    let dataInicio = document.getElementById("txtInicio").value;
    if (dataInicio==""){
        alert("Preencha a data de inicio");
        return false;
    }

    let dataFim = document.getElementById("txtFim").value;
    if (dataFim==""){
        alert("Preencha a data de encerramento");
        return false;
    }

    let novoFeriado = {
        id: null,
        nomeFeriado:document.getElementById("txtFeriado").value,
        dataInicio: document.getElementById("txtInicio").value,
        dataFim: document.getElementById("txtFim").value,
        agencia:{idAgencia: id}
    }

    let cabecalho = {
        method: 'POST',
        body: JSON.stringify(novoFeriado),
        headers:{
            'Content-type':'application/json'
        }
    }

    fetch("http://localhost:8080/feriado/novo", cabecalho)
    .then(res => res.json())
    .then(result => console.log(result));

    //window.location = "consulta.html";
}

function voltar() {
    window.location = "selecao.html";
}
 
    
