// PARTE 1
// PROMISES
let p = new Promise((resolve, reject) => {
    let a  = 1 + 1
    if ( a == 2){
        resolve('Success')
    }else{
        reject('Failed')
    }
})

p.then((message)=>{
    console.log('This is in the THEN', message)
}).catch((message) => {
    console.log('This is in the catch', message)
})

//PARTE 2
// CALLBACKS
const usuarioOffline = true
const assistindoPodcast = false

//retorno = callback
// erroRetorno = errorCallback
function assistindoTutoriallCallback(retorno, erroRetorno){
    if(usuarioOffline){
        let e1 = {
            name: 'Offline',
            message: 'Ow, usuario nao esta navegando na internet no momento:('
        }
        erroRetorno(e1)
    }else if(assistindoPodcast){
        erroRetorno({
            name:'Podcast',
            message:'O(A) usuário(a) está assistindo a um PodCast e não o seu tutorial'
        })
    }else{
        retorno('Obrigado por assistir, deixe seu like e se inscreva no canal!')
    }
}

assistindoTutoriallCallback((respostaPositiva)=>{
    console.log('Success:', respostaPositiva)
}, (respostaNegativa)=>{
    console.log(respostaNegativa.name + " - " + respostaNegativa.message)
})

// PARTE 3
// TRANSFORMANDO CALLBACK EM PROMISES
function assistindoTutoriallPromise(){
    return new Promise((resolve, reject) => {
        if(usuarioOffline){
            let e1 = {
                name: 'Offline',
                message: 'Ow, usuario nao esta navegando na internet no momento:('
            }
            reject(e1)
        }else if(assistindoPodcast){
            reject({
                name:'Podcast',
                message:'O(A) usuário(a) está assistindo a um PodCast e não o seu tutorial'
            })
        }else{
            resolve('Obrigado por assistir, deixe seu like e se inscreva no canal!')
        }
    })
}

assistindoTutoriallPromise()
.then( respostaPositiva => {
        console.log('Success PROMISE:', respostaPositiva)
    })
.catch(respostaNegativa => {
    console.log('PROMISE ERROR ' + respostaNegativa.name + " - " + respostaNegativa.message)
})

// PARTE4
// PROMISES
const recordVideoOne = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('Video 1 Recorded')
    }, 10000)
})

const recordVideoTwo = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('Video 2 Recorded')
    }, 5000)
})

const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded')
})

Promise.all([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
])
.then((messages) => {
    console.log('Gravacoes', messages)
})

// Qual acabar primeiro executa
Promise.race([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
])
.then((messages) => {
    console.log('Corrida Gravacoes', messages)
})