function onLoad() {
    //console.log('carregou a tela!!!', Tela, JogoDaMemoria)
    const dependencias = {
        tela:Tela, // essas classes são globais
        util:Util
    }
    //inicializamos o jogo da memória
    const jogoDaMemoria = new JogoDaMemoria(dependencias)
    jogoDaMemoria.inicializar()
}

window.onload = onLoad