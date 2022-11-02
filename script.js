let perguntas;
let Resposta;
let Imagem;


const ObterQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
TodosOsQuizzes = document.querySelector('section')
ObterQuizzes.then(InserirQuizzes)
BotaoCriar = document.querySelector(".ListaQuizzes")

function InserirQuizzes(resposta){
    console.log(resposta.data)
    for(i=0;i<resposta.data.length;i++){
    TodosOsQuizzes.innerHTML = TodosOsQuizzes.innerHTML + `<div onclick = 'EscolherQuizz(this)'class='quiz' id=${resposta.data[i].id}><img src=${resposta.data[i].image}></img><p>${resposta.data[i].title}</p></div>`
    // TodosOsQuizzes.innerHTML='<h1>Todos os Quizzes</h1>'
    }
    // console.log(resposta.data)
}


function Esconder(){
    
    BotaoCriar.classList.add('escondido')
}

function EscolherQuizz(elemento){
    BuscarQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${elemento.id}`)
    document.querySelector(".ListaQuizzes").classList.add('escondido')
    BuscarQuizz.then(MostrarQuizz)

}

function MostrarQuizz(elemento){
    // console.log(elemento.data)
    perguntas = elemento.data.questions
    CapaTitulo = document.querySelector('.PaginaDeUmQuizz')
    CapaTitulo.innerHTML = `<img class='capa' src="${elemento.data.image}" alt=""></img><h3>${elemento.data.title}</h1>`
    alert('funfando')
    // console.log(perguntas[0].answers[0].image)
    for(let i=0;i<perguntas.length;i++){
        CapaTitulo.innerHTML+= `<div class='perguntas'><div class='pergunta'><h1>${perguntas[i].title}</h1></div><div class='imagens'></div></div>`
        Pergunta = document.querySelectorAll('.pergunta')
        Pergunta[i].style.background =`${perguntas[i].color}`
        Resposta = document.querySelectorAll('.imagens')
        for(let j=0;j<perguntas[i].answers.length;j++){

            Resposta[i].innerHTML+= `<div class='imagem'><img onclick='VerificarResposta(this)' alt='${perguntas[i].answers[j].isCorrectAnswer}' src='${perguntas[i].answers[j].image}'></img><p>${perguntas[i].answers[j].text}</p></div>`
        }
    }
    // console.log(Resposta[0].innerHTML)

    
}

function VerificarResposta(elemento){
    console.log(elemento)
    Imagem = elemento.parentNode.parentNode.children
    console.log(Imagem[0])
    for (i=0;i<Imagem.length;i++)
        if (elemento.alt==='true'){

            Imagem[i].style.opacity='0.3'
            Imagem[i].removeAttribute('onclick')
            elemento.parentNode.style.opacity='1'
            elemento.parentNode.children[1].style.color='green'

        }

    
}