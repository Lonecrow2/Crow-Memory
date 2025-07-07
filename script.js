let primeira_carta = false
let trava = "bloqueado"
let controle_incio = 0
let timerIniciado = false;
let segundos = 0;
let intervalo

function iniciarTimer() {
    segundos = 0;
    document.querySelector("#timer_valor").textContent = segundos;
    intervalo = setInterval(() => {
        segundos++;
        document.querySelector("#timer_valor").textContent = segundos;
    }, 1000);
}

// Embaralha um array aleatoriamente
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

// Inicia o jogo: embaralha imagens, reseta cartas e pontos
function iniciarJogo() {
    clearInterval(intervalo);          // Para o timer anterior, se existir
    document.querySelector("#timer_valor").textContent = 0 // Reseta no HTML
    segundos = 0;                      // Zera a contagem
    timerIniciado = false;            // Permite reiniciar quando clicar na 1ª carta

    let cartas = document.querySelectorAll(".imagens")

    const caminhos_src = [
        "imagens/lampada.jpg",
        "imagens/notebook.jpg",
        "imagens/torre.jpg",
        "imagens/janela.jpg",
        "imagens/banheiro feminino.jpg",
        "imagens/relogio.jpg",
        "imagens/vazo de rosas.jpg",
        "imagens/galinha.jpg",
        "imagens/banheiro feminino.jpg",
        "imagens/lampada.jpg",
        "imagens/notebook.jpg",
        "imagens/vazo de rosas.jpg",
        "imagens/janela.jpg",
        "imagens/galinha.jpg",
        "imagens/relogio.jpg",
        "imagens/torre.jpg"
    ]

    const embaralhados = embaralhar([...caminhos_src])

    // Coloca as imagens embaralhadas dentro das divs
    cartas.forEach((div, index) => {
        div.innerHTML = `<img src="${embaralhados[index]}" alt="imagem ${index + 1}">`
    })

    // Remove marcação de carta encontrada (caso seja reinício)
    document.querySelectorAll(".imagens img").forEach(img => {
        img.classList.remove("encontrada")
    })

    // Esconde todas as cartas e destrava o clique
    document.querySelectorAll(".imagens img").forEach(img => {
        img.style.opacity = "0"
        trava = "desbloqueado"
    })

    // Reinicia a pontuação
    let pontos1 = document.querySelector("#valor")
    let numero_0 = Number(pontos1.textContent)
    let resultado1 = 0
    pontos1.textContent = resultado1

    // Ativa os eventos de clique nas cartas
    adicionarEventos()
}

// Adiciona comportamento de clique em cada carta
function adicionarEventos() {
    document.querySelectorAll(".imagens").forEach(carta => {
        carta.onclick = () => {
            if (trava !== "desbloqueado") return

            const imagem = carta.querySelector("img")
            if (imagem.classList.contains("encontrada")) return

            // Mostra a carta apenas se o controle inicial estiver ativo
            if (controle_incio === 1 && (imagem.style.opacity === "0" || imagem.style.opacity === "")) {
                imagem.style.opacity = "1"
                if (!timerIniciado) {
                    iniciarTimer();
                    timerIniciado = true;
                }
            }

            // Primeira carta clicada
            if (!primeira_carta) {
                primeira_carta = imagem
            }
            // Segunda carta
            else if (imagem !== primeira_carta) {
                trava = "bloqueado"

                // Se forem diferentes, esconde as duas
                if (imagem.src !== primeira_carta.src) {
                    setTimeout(() => {
                        imagem.style.opacity = "0"
                        primeira_carta.style.opacity = "0"
                        primeira_carta = false
                        trava = "desbloqueado"
                    }, 500)
                }
                // Se forem iguais, marca como encontradas e soma ponto
                else {
                    imagem.classList.add("encontrada")
                    primeira_carta.classList.add("encontrada")
                    primeira_carta = false
                    let pontos = document.querySelector("#valor")
                    let numero_0 = Number(pontos.textContent)
                    let resultado = numero_0 + 1
                    pontos.innerHTML = resultado
                    trava = "desbloqueado"
                    if (resultado === 8) {
                        clearInterval(intervalo); // ou: pararTimer(); se estiver usando função
                    }
                }
            }
        }
    })
}

// Mostra todas as cartas rapidamente ao reiniciar ou iniciar (efeito "espiar")
function ver_imagens_reiniciar() {
    setTimeout(() => {
        const cartas_res = document.querySelectorAll(".imagens img");
        cartas_res.forEach(carta => {
            carta.style.opacity = "1"; // mostra as imagens
        });

        // Esconde novamente após 1.5s
        setTimeout(() => {
            cartas_res.forEach(carta => {
                carta.style.opacity = "0";
            });
        }, 1500);
    }, 0);
    controle_incio = 1 // libera clique nas cartas
}

// Função para espiar cartas fora do reinício
function mostrarCartas() {
    document.querySelectorAll(".imagens img").forEach(imagem => {
        if (
            !imagem.classList.contains("encontrada") &&
            (imagem.style.opacity === "0" || imagem.style.opacity === "")
        ) {
            imagem.style.opacity = "1"
            setTimeout(() => {
                imagem.style.opacity = "0"
            }, 1500)
        }
    })
}

// Roda o jogo quando a página carrega
window.onload = iniciarJogo
