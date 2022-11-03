
//----ÍNICIO JS JONAS----//

let perguntas;
let Resposta;
let Imagem;
let pontos=0;
let clicks=0;
let nivel;
let Niveis=[]
const ObterQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
TodosOsQuizzes = document.querySelector('section')
ObterQuizzes.then(InserirQuizzes)
BotaoCriar = document.querySelector(".ListaQuizzes")
CriarQuizz = document.querySelector('.CriarQuizz')
CapaTitulo = document.querySelector('.PaginaDeUmQuizz')

function InserirQuizzes(resposta) {
    console.log(resposta.data)
    for(i=0;i<resposta.data.length;i++){
    TodosOsQuizzes.innerHTML = TodosOsQuizzes.innerHTML + `<div onclick = 'EscolherQuizz(this)'class='quiz' id=${resposta.data[i].id}><img src=${resposta.data[i].image}></img><p>${resposta.data[i].title}</p></div>`
    // TodosOsQuizzes.innerHTML='<h1>Todos os Quizzes</h1>'
    }
    // console.log(resposta.data)
}




function EscolherQuizz(elemento) {
    BuscarQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento.id}`)
    document.querySelector(".ListaQuizzes").classList.add('escondido')
    BuscarQuizz.then(MostrarQuizz)

}

function shuffleArray(arr) {
    // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

function MostrarQuizz(elemento) {
    nivel = elemento.data.levels
    perguntas = elemento.data.questions
    CapaTitulo.innerHTML = `<div class='capa'><img src="${elemento.data.image}" alt=""></img></div><h3>${elemento.data.title}</h1>`
    
    // console.log(perguntas[0].answers[0].image)
    for (let i = 0; i < perguntas.length; i++) {
        shuffleArray(perguntas[i].answers)
        CapaTitulo.innerHTML += `<div class='perguntas'><div class='pergunta'><h1>${perguntas[i].title}</h1></div><div class='imagens'></div></div>`
        Pergunta = document.querySelectorAll('.pergunta')
        Pergunta[i].style.background = `${perguntas[i].color}`
        Resposta = document.querySelectorAll('.imagens')
        for (let j = 0; j < perguntas[i].answers.length; j++) {
            
            Resposta[i].innerHTML += `<div class='imagem'><img class='resp' onclick='VerificarResposta(this)' id='${perguntas[i].answers[j].isCorrectAnswer}' src='${perguntas[i].answers[j].image}'></img><p>${perguntas[i].answers[j].text}</p></div>`
        }
        
    }
    // console.log(Resposta[0].innerHTML)


}

function VerificarResposta(elemento) {
    clicks+=1
    
    // console.log(elemento.parentNode.parentNode.parentNode.parentNode.children)
    clicks += 1
    console.log(elemento.parentNode)
    Imagem = elemento.parentNode.parentNode.children
    // console.log(Imagem[0])
    if (elemento.id === 'true') {
        pontos += 1
        for (let i = 0; i < Imagem.length; i++) {
            Imagem[i].children[0].removeAttribute('onclick')
            Imagem[i].children[0].style.opacity = '0.3'
            Imagem[i].children[1].style.color = 'red'

        }
        elemento.parentNode.children[1].style.color = 'green'
        elemento.style.opacity = '1'


    }

    else if (elemento.id === 'false') {
        for (let i = 0; i < Imagem.length; i++) {

            Imagem[i].children[0].removeAttribute('onclick')
            Imagem[i].children[0].style.opacity = '0.3'
            Imagem[i].children[1].style.color = 'red'

            elemento.style.opacity = '1'
            if (Imagem[i].children[0].id === 'true') {
                Imagem[i].children[1].style.color = 'green'
            }
        }
    }

        if(clicks===perguntas.length){
            console.log(nivel.length)
            for(let i=1;i<nivel.length;i++){
                if(pontos/perguntas.length*100 < nivel[i].minValue ){
                    CapaTitulo.innerHTML+=  ` <div class="resultado"><div class="titulo">${Math.round(pontos/perguntas.length*100)}% de acerto: ${nivel[i-1].title}</div><div class="ImagemFim"><img src='${nivel[i-1].image}'></img><p>${nivel[i-1].text}</p></div></div>`+`<button class="reiniciar" onclick='reinicar()' >Reiniciar Quizz</button><button onclick ='home()' class="voltar">Voltar para Home</button>`
                    break
                }

                else if(pontos/perguntas.length*100 >= nivel[nivel.length-1].minValue ){
                    CapaTitulo.innerHTML+=  ` <div class="resultado"><div class="titulo">${Math.round(pontos/perguntas.length*100)}% de acerto: ${nivel[nivel.length-1].title}</div><div class="ImagemFim"><img src='${nivel[nivel.length-1].image}'></img><p>${nivel[nivel.length-1].text}</p></div></div>`+`<button class="reiniciar" onclick='reinicar()'>Reiniciar Quizz</button><button onclick ='home()' class="voltar">Voltar para Home</button>`
                    break
                }
            }
        }
}
let ars
function reinicar(){
    ars = document.querySelectorAll('.resp')
    for(let i=0;i<ars.length;i++){
        ars[i].setAttribute('onclick','VerificarResposta(this)')
        ars[i].style.opacity='1'
        ars[i].parentNode.children[1].style.color='black'

    }

    for(let j=0;j<perguntas.length;j++){
        shuffleArray(perguntas[j].answers)
    }
    pontos=0
    clicks=0
    document.querySelector('.pergunta').scrollIntoView()
    CapaTitulo.children[CapaTitulo.children.length-1].outerHTML =''
    CapaTitulo.children[CapaTitulo.children.length-1].outerHTML =''
    CapaTitulo.children[CapaTitulo.children.length-1].outerHTML =''
    
}

//-------FIM JS JONAS------//


function irParaTelaDeCriarPerguntas(){ //-----TELA1-------//
    const tela1 = document.querySelector('.CriarTela1');
    const tela2 = document.querySelector('.CriarTela2');
    tela1.classList.add ('escondido');
    tela2.classList.remove ('escondido');
}

        function irParaTelaDeCriarPerguntas() { //-----TELA1-------//
            const tela1 = document.querySelector('.CriarTela1');
            const tela2 = document.querySelector('.CriarTela2');
            const esconderh1 = document.querySelector('.CriarQuizz > h1');
            esconderh1.classList.add('escondido');
            tela1.classList.add('escondido');
            tela2.classList.remove('escondido');
        }

        function irParaTelaDeCriarNiveis() { //-----TELA2-------//
            const tela2 = document.querySelector('.CriarTela2');
            const tela3 = document.querySelector('.tela3');
            tela2.classList.add('escondido');
            tela3.classList.remove('escondido');
        }

        function tela4() {
            const tela3 = document.querySelector('.tela3');
            tela3.classList.add('escondido');
            const tela4 = document.querySelector(".tela4");
            tela4.classList.remove('escondido');
        }

        function pagquizz() {
            console.log('tela 2');
        }
        function home() {
            console.log('voltar tela 1 - home');
            window.location.reload()
        }
        function criarquizz() {
            const listaquizzes = document.querySelector('.ListaQuizzes');
            const CriarQuizz = document.querySelector('.CriarQuizz');
            listaquizzes.classList.add('escondido')
            CriarQuizz.classList.remove('escondido')
            promisse = ObterQuizzes;
            promisse.then(console.log('quizzes carregados'));
        }

