
function validaLogin(){

    let userTxt = localStorage.getItem("userLogged");

    if(!userTxt){
        window.location = "index.html";
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

function consultar(evento){

    evento.preventDefault();

    let campoAgencia = document.getElementById("sel_agencias");
    let idAgencia = campoAgencia[campoAgencia.selectedIndex].value; 

    fetch("http://localhost:8080/agencia/feriados/" + idAgencia)
    .then(res => res.json())
    .then(result => montarTabela(result));

}

function montarTabela(resposta) {
    let tabelaFeriados = '<table class = "table"> <tr> <th>Inicio/Fim</th> <th>Feriado</th> <th>Agência</th> </tr>';

    for (let index = 0; index < resposta.length; index++) {
        
        /* /* converter data */
        //let dataI = document.getElementById("txtInicio").value;
        //let dataF = document.getElementById("txtFim").value;
        //dataIn = new Date(dataI).toLocaleDateString('pt-BR');
        //dataFn = new Date(dataF).toLocaleDateString('pt-BR');

        tabelaFeriados = tabelaFeriados + `<tr> 
            <td> ${resposta[index].dataInicio} à ${resposta[index].dataFim}</td> 
            <td> ${resposta[index].nomeFeriado} </td>
            <td> ${resposta[index].agencia.nomeAgencia} </td>
        </tr>`;
    }

    tabelaFeriados = tabelaFeriados + '</table>';

    document.getElementById("tabela").innerHTML = tabelaFeriados;
}

function consultarTodos(){

    fetch("http://localhost:8080/feriados")
    .then(res => res.json())
    .then(result => montarTabela(result));
    
}

function voltar() {
    window.location = "selecao.html";
}