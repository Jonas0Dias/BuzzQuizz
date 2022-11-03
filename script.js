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


function Esconder() {

    
    BotaoCriar.classList.add('escondido')
    CriarQuizz.classList.remove('escondido')
}

function EscolherQuizz(elemento) {
    BuscarQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento.id}`)
    document.querySelector(".ListaQuizzes").classList.add('escondido')
    BuscarQuizz.then(MostrarQuizz)

}

function MostrarQuizz(elemento) {
    nivel = elemento.data.levels
    perguntas = elemento.data.questions
    CapaTitulo.innerHTML = `<div class='capa'><img src="${elemento.data.image}" alt=""></img></div><h3>${elemento.data.title}</h1>`
    
    // console.log(perguntas[0].answers[0].image)
    for (let i = 0; i < perguntas.length; i++) {
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
    console.log(elemento.parentNode)
    Imagem = elemento.parentNode.parentNode.children
    // console.log(Imagem[0])
        if (elemento.id==='true'){
            pontos+=1
            for(let i=0;i<Imagem.length;i++){
            Imagem[i].children[0].removeAttribute('onclick')
            Imagem[i].children[0].style.opacity = '0.3'
            Imagem[i].children[1].style.color = 'red'

        }
        elemento.parentNode.children[1].style.color = 'green'
        elemento.style.opacity = '1'


    }

        else if(elemento.id==='false'){
            for(let i=0;i<Imagem.length;i++){
            
                Imagem[i].children[0].removeAttribute('onclick')
                Imagem[i].children[0].style.opacity='0.3'
                Imagem[i].children[1].style.color='red'
                
                elemento.style.opacity='1'
                if (Imagem[i].children[0].id==='true'){
                    Imagem[i].children[1].style.color='green'
                }
            }
        }

        if(clicks===perguntas.length){
            console.log(nivel.length)
            for(let i=1;i<nivel.length;i++){
                if(pontos/perguntas.length*100 < nivel[i].minValue ){/*é pq tu ficou com zero*/
                    CapaTitulo.innerHTML+=  ` <div class="resultado"><div class="titulo">${nivel[i-1].title}</div><div class="ImagemFim"><img src='${nivel[i-1].image}'></img><p>${nivel[i-1].text}</p></div></div>`+`<button class="reiniciar">Reiniciar Quizz</button><button class="voltar">Voltar para Home</button>`
                    break
                }

                else if(pontos/perguntas.length*100 >= nivel[nivel.length-1].minValue ){
                    console.log('acertou todas')
                }
            }
        }
}