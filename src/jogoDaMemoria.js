class JogoDaMemoria {
    constructor({tela, util}) {
        this.tela = tela
        this.util = util
        this.personagensIniciais = [
            //caminho sempre relativo ao index.html
            {img:'./imagens/chewbaca.png', nome:'chewbaca'},
            {img:'./imagens/boba_fet.png', nome:'boba_fet'},
            {img:'./imagens/darth_vader.png', nome:'darth_vader'},
            {img:'./imagens/han_solo.png', nome:'han_solo'},
            {img:'./imagens/princess_leia.png', nome:'princess_leia'},
            {img:'./imagens/r2d2.png', nome:'r2d2'},
            {img:'./imagens/clone_trooper.png', nome:'clone_trooper'},
            {img:'./imagens/obiwan.png', nome:'obiwan'}
        ]
        this.iconePadrao = './imagens/padrao.png'
        this.personagenSelecionados = []
        this.personagensEscondidos = []
    }

    inicializar() {
        this.tela.atualizarImagens(this.personagensIniciais)
        // colocamos as ações que estão na função jogar() dentro da função onclick do botão "clique aqui para inciar"
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarTodosPersonagens.bind(this))
    }

    async embaralhar() {
        const copias = this.personagensIniciais
        //duplica os itens
        .concat(this.personagensIniciais)
        //entra em cada item e cria um id aleatório
        .map(item => {
            return Object.assign({}, item, {id:Math.random() / 0.5})
        })
        //ordenar
        .sort(() => Math.random() - 0.5)
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()
        //vamos utilizar 3 segundos para atualizar a tela
        await this.util.timeout(3000)
        this.esconderPersonagens(copias)
        this.tela.limparContador(idDoIntervalo)
        this.tela.exibirCarregando(false)
        
    }

    esconderPersonagens(personagens) {
        //vamos trocar a imagem de todos os personagens existentes pelo icone padrão
        //como fizemos no constructor, vamos extrair somente o necessário
        //Usando a sintaxe ({chave:1}) estamos falando que vamos retornar o que estiver dentro dos parenteses
        ////quando não usamos: (exemplo do id), o JS entende que o nome é o mesmo do valor. Ex. id: id, nome: nome
        const personagensOcultos = personagens.map(({id, nome}) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        //atualizamos a tela com os personagens ocultos
        this.tela.atualizarImagens(personagensOcultos)
        //guardamos os personagens ocultos para utilizar na função mostrarTodosPersonagens
        this.personagensEscondidos = personagensOcultos
    }

    exibirPersonagens(nomeDoPersonagem) {
        //Vamos procurar esse personagem pelo nome nos personagensIniciais
        //vamos obter somente a imagem dele
        const {img} = this.personagensIniciais.find(({nome}) => nomeDoPersonagem === nome)
        //vamos criar a função na tela para exibir somente o personagem selecionado
        this.tela.exibirPersonagens(nomeDoPersonagem, img)
    }
    
    verificarSelecao(id, nome) {
        const item = {id, nome}
        //vamos verificar a quantidade de personagens selecionados e tomar a ação de escolha como certa ou errada
        const personagensSelecionados = this.personagenSelecionados.length
        switch(personagensSelecionados) {
            case 0:
                //adiciona a escolha na lista, esperando o próximo clique
                this.personagenSelecionados.push(item)
                break;
                case 1:
                    //Se a quantidade de escolhas for igual a 1, significa que o usuário só pode escolher mais um
                    //vamos obter o primeiro item da lista
                    const [opcao1] = this.personagenSelecionados
                    //vamos zerar os itens para não recebermos mais de dois
                    this.personagenSelecionados = []
                    //conferimos se os nomes e ids batem como o esperado
                    if(opcao1.nome === item.nome && 
                        // verificamos se os ids são diferentes para não clicarmos duas vezes no mesmo personagem
                    opcao1.id !== item.id) {
                        this.tela.exibirMensagem()
                        //Como o padrão é true não precisamos passar nenhum parâmetro
                        this.exibirPersonagens(item.nome)
                        //para a execução
                        return;
                    } 
                    this.tela.exibirMensagem(false)
                    //fim do case
                    break;
                }
            }
            
    mostrarTodosPersonagens() {
        //vamos pegar todos os personagens da tela e colocar seu respectivo valor
        const personagensEscondidos = this.personagensEscondidos
        for(const personagem of personagensEscondidos) {
            const {img} = this.personagensIniciais.find(item => item.nome === personagem.nome)
            personagem.img = img
        }
        this.tela.atualizarImagens(personagensEscondidos)
    }

    jogar() {
        this.embaralhar()
    }
}