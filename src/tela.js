//métodos estáticos não podem acessar o 'this'
//por isso, não camos colocar o util em um construtor
const util = Util
const ID_CONTEUDO = "conteudo"
const ID_BOTAO_JOGAR = "jogar"
const ID_BOTAO_MOSTRAR_TUDO = "mostrarTudo"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const MENSAGENS = {
    sucesso: {
        texto: 'Combinação correta!',
        classe: 'alert-success'
    },
    erro: {
        texto: 'Combinação incorreta!',
        classe: 'alert-danger'
    }
}
class Tela {
    static obterCodigoHtml(item) {
        return `<div class="col-md-3">
        <div class="card" style="width: 38%; margin:auto; border-radius: 10%; background-color: transparent;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
            <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
        </div>
        <br>
    </div>`
    }

    static configurarBotaoVerificarSelecao(funcaoOnClick) {
        window.verificarSelecao = funcaoOnClick
    }

    static alterarCodigoHtml(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    static gerarStringPelaImagem(itens) {
        //Para cada item da lista, vai executar a função obterCodigoHtml
        //ao final, vai concatenar tudo em uma única string
        //muda o array pela string
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens) {
        const codigoHtml = Tela.gerarStringPelaImagem(itens)
        Tela.alterarCodigoHtml(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick) {
        const btnJogar = document.getElementById(ID_BOTAO_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }

    static exibirPersonagens(nomeDoPersonagem, img) {
        const elementosHtml = document.getElementsByName(nomeDoPersonagem)
        //para cada elemento encontrado na tela, vamos alterar a imagem
        //para a imagem inicial dele
        //com o forEach, para cada item dentro do () setamos o valor da imagem
        elementosHtml.forEach(item => item.src = img)
    }

    static async exibirMensagem(sucesso = true) {
        const elementoCombinacao = document.getElementById(ID_MENSAGEM)
        if(sucesso) {
            elementoCombinacao.classList.remove(MENSAGENS.erro.classe)
            elementoCombinacao.classList.add(MENSAGENS.sucesso.classe)
            elementoCombinacao.innerText = MENSAGENS.sucesso.texto
        } else {
            elementoCombinacao.classList.remove(MENSAGENS.sucesso.classe)
            elementoCombinacao.classList.add(MENSAGENS.erro.classe)
            elementoCombinacao.innerText = MENSAGENS.erro.texto
        }
        elementoCombinacao.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
        elementoCombinacao.classList.add(CLASSE_INVISIVEL)
    }

    static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar) {
            carregando.classList.remove(CLASSE_INVISIVEL)
        } else {
            carregando.classList.add(CLASSE_INVISIVEL)
        }
    }

    static iniciarContador() {
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        //vamos substituir o texto começando com $$contador segundos
        //onde está o $$contador adicionaremos o vamos
        const identificadorNoTexto = '$$contador'
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`
        //vamos criar uma função em linha para atualizar o texto a cada segundo
        const atualizarTexto = () => (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))

        atualizarTexto()
        //a cada segundo, vai chamar a função atualizar texto
        //essa função vai substituir o $$contador pelo `contarAte` diminuindo o valor
        //retornaremos o idDoIntervalo para parar ele mais tarde
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
    }

    static limparContador(idDoIntervalo) {
        clearInterval(idDoIntervalo)
        //deixamos sem texto
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static configurarBotaoMostrarTudo(funcaoOnClick) {
        const btnMostrarTudo = document.getElementById(ID_BOTAO_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnClick
    }
}