let cartas
let primeira_carta = false
let trava = "bloqueado"
let controle_incio = 0

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function iniciarJogo() {
    cartas = document.querySelectorAll(".imagens")

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

    // Coloca as imagens embaralhadas em cada div
    cartas.forEach((div, index) => {
        div.innerHTML = `<img src="${embaralhados[index]}" alt="imagem ${index + 1}">`
    })

    // Remove classe encontrada de todas as imagens
    document.querySelectorAll(".imagens img").forEach(img => {
        img.classList.remove("encontrada")

    })

    // Esconde as imagens após um tempo

    document.querySelectorAll(".imagens img").forEach(img => {
        img.style.opacity = "0"
        trava = "desbloqueado"
    })


    let pontos1 = document.querySelector("#valor")
    let numero_0 = Number(pontos1.textContent)
    let resultado1 = 0
    pontos1.textContent = resultado1

    // Adiciona eventos de clique
    adicionarEventos()
}

function adicionarEventos() {
    document.querySelectorAll(".imagens").forEach(carta => {
        carta.onclick = () => {
            if (trava !== "desbloqueado") return

            const imagem = carta.querySelector("img")
            if (imagem.classList.contains("encontrada")) return

            if (controle_incio === 1 && (imagem.style.opacity === "0" || imagem.style.opacity === "")) {
                imagem.style.opacity = "1"
            }


            if (!primeira_carta) {
                primeira_carta = imagem
            } else if (imagem !== primeira_carta) {
                trava = "bloqueado"

                if (imagem.src !== primeira_carta.src) {
                    setTimeout(() => {
                        imagem.style.opacity = "0"
                        primeira_carta.style.opacity = "0"
                        primeira_carta = false
                        trava = "desbloqueado"
                    }, 500)
                } else {
                    imagem.classList.add("encontrada")
                    primeira_carta.classList.add("encontrada")
                    primeira_carta = false
                    let pontos = document.querySelector("#valor")
                    let numero_0 = Number(pontos.textContent)
                    let resultado = numero_0 + 1
                    pontos.innerHTML = resultado
                    trava = "desbloqueado"
                }
            }
        }
    })
}

function ver_imagens_reiniciar() {
    setTimeout(() => {
        const cartas_res = document.querySelectorAll(".imagens img");
        cartas_res.forEach(carta => {
            carta.style.opacity = "1"; // Mostra a imagem
        });

        // Depois de 1.5s, esconde novamente
        setTimeout(() => {
            cartas_res.forEach(carta => {
                carta.style.opacity = "0";
            });
        }, 1500);
    }, 0);
    controle_incio = 1
}


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

window.onload = iniciarJogo
