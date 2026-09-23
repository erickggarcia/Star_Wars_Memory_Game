# 🌌 Star Wars Memory Game

Jogo da memória com tema de Star Wars, feito com JavaScript puro, sem frameworks. As cartas são embaralhadas, ficam visíveis por alguns segundos para o jogador memorizar e depois são escondidas. O objetivo é encontrar os pares de personagens.

🔗 **Jogue agora:** [erickggarcia.github.io/Star_Wars_Memory_Game](https://erickggarcia.github.io/Star_Wars_Memory_Game/)

---

## 🎮 Como jogar

1. Clique em **"Clique aqui para iniciar"** para embaralhar as cartas.
2. Memorize a posição dos personagens durante a contagem regressiva de 3 segundos.
3. Depois que as cartas forem escondidas, clique em duas cartas para tentar formar um par.
4. Se os personagens forem iguais, o par é revelado e aparece a mensagem de combinação correta; se não, aparece a mensagem de combinação incorreta.
5. Clique em **"Mostrar tudo"** para revelar todas as cartas a qualquer momento.

---

## ✨ Funcionalidades

- [x] 8 personagens duplicados, formando 16 cartas
- [x] Embaralhamento aleatório a cada partida, com um id único para cada carta
- [x] Contagem regressiva com indicador de carregamento antes de esconder as cartas
- [x] Verificação de pares, impedindo que a mesma carta seja clicada duas vezes para formar um par
- [x] Mensagens de acerto e erro exibidas temporariamente
- [x] Botão para revelar todas as cartas
- [x] Layout responsivo, com imagem de fundo própria para mobile

---

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+): classes, métodos estáticos, `async/await`, Promises, template strings, desestruturação e métodos de array (`map`, `concat`, `sort`, `find`)
- [Bootstrap 4](https://getbootstrap.com/docs/4.4/) (via CDN) — grid, botões, alertas e spinner
- GitHub Pages — hospedagem

---

## 🏗️ Estrutura

```
.
├── imagens/              # cartas dos personagens, verso da carta e fundos
├── src/
│   ├── jogoDaMemoria.js  # regras do jogo (embaralhar, esconder, verificar pares)
│   ├── tela.js           # manipulação do DOM (renderizar cartas, mensagens, contador)
│   └── util.js           # utilitários (timeout com Promise)
├── index.html
└── index.js              # ponto de entrada: monta as dependências e inicia o jogo
```

O código separa a lógica do jogo da manipulação da tela. A classe `JogoDaMemoria` recebe `Tela` e `Util` pelo construtor (injeção de dependências), então as regras do jogo não acessam o DOM diretamente. A classe `Tela` concentra toda a interação com o HTML em métodos estáticos.

---

## 🚀 Como rodar

O projeto não tem dependências nem etapa de build.

```bash
# 1. Clone o repositório
git clone https://github.com/erickggarcia/Star_Wars_Memory_Game.git
cd Star_Wars_Memory_Game
```

2. Abra o arquivo `index.html` no navegador.

Se preferir rodar com um servidor local:

```bash
npx serve .
```

Ou use a extensão **Live Server** do VS Code.

---

## 👤 Autor

**Erick Garcia** — Backend Developer

[GitHub](https://github.com/erickggarcia)
