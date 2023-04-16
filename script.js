axios.defaults.headers.common['Authorization'] = 'pJY2W50kPz7cAJaR8fghfVSj';
let nome = "";
let usuario = {};
let mensagens = [];

entrarSite();
entrarSala();


function entrarSala(){
    procurarMensagens();
    checkUsuario();
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
        <div class="mensagem">
            <div class="time">(${mensagemAtual.time}) </div>
            <div class="from"> ${mensagemAtual.from} </div>
            <div class="texto"> para </div>
            <div class="to"> ${mensagemAtual.to} </div>
            <div class="texto"> ${mensagemAtual.text} </div>
        </div>
        `
        console.log("percorrido");
    }

}

function checkUsuario(){
    let check = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', usuario);
    check.then(processarResposta);
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
}
function tratarErro(erro) {
    console.log("Status code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
    entrarSite();
}
