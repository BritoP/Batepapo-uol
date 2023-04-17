axios.defaults.headers.common['Authorization'] = 'pJY2W50kPz7cAJaR8fghfVSj';
let nome = "";
let usuario = {};
let mensagens = [];
let online = 0;
entrarSite();
function entrarSala(){
    if(online === 1){
    procurarMensagens();
    checkUsuario();
    }
    else{
        entrarSite();
    }
}
function procurarMensagens(){
    let mensagens = axios.get("https://mock-api.driven.com.br/api/vm/uol/messages");
    mensagens.then(mostrarMensagens);
    setTimeout(procurarMensagens,3000);
}
function mostrarMensagens(resposta){
    mensagens = resposta.data;
    let elemento = document.querySelector(".main");
    elemento.innerHTML = '';
    for(i = 0;i < mensagens.length;i++){
        let mensagemAtual = mensagens[i];
        elemento.innerHTML+=`
        <li class="mensagem"data-test="message">
            <span class="time">(${mensagemAtual.time}) </div>
            <span class="from"> ${mensagemAtual.from} </div>
            <span class="texto"> para </div>
            <span class="to"> ${mensagemAtual.to}: </div>
            <span class="texto"> ${mensagemAtual.text} </div>
        </li>
        `
        console.log("percorrido");
    }
}
function enviarMensagem(){
    let elemento = document.querySelector("#inputMensagem");
    let mensagemNova = elemento.value;
    console.log(mensagemNova);
    let mensagemFormatada = {from: nome,
	to: "Todos",
	text: mensagemNova,
	type: "message"
    };
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', mensagemFormatada);
    promessa.then(processarResposta3);
    promessa.catch(tratarErro2);
    elemento.value = '';
}
function checkUsuario(){
    let check = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', usuario);
    check.then(processarResposta2);
    check.catch(tratarErro3);
    setTimeout(checkUsuario, 5000);
    
}
  
function entrarSite(){
    nome = prompt("Qual o seu nome?");
    console.log(nome);
    usuario = {name:nome}; 
    console.log(usuario); 
    let promessa = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', usuario);
    promessa.then(processarResposta);
    promessa.catch(tratarErro);

}
function processarResposta(resposta) {
	console.log(resposta.status);
    online = 1;
    entrarSala();
}
function processarResposta2(resposta) {
	console.log(resposta.status);
}
function processarResposta3(resposta) {
	console.log(resposta.status);
    procurarMensagens();
}
function tratarErro(erro) {
    console.log("Status code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
    entrarSite();
}
function tratarErro2(erro) {
    console.log("Status code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
    checkUsuario();
}
function tratarErro3(erro) {
    console.log("Status code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
    window.location.reload();
}