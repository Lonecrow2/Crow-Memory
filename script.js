let cartas
let primeira_carta = false
let trava = "bloqueado"

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
        img.style.opacity = "1"
    })

    // Esconde as imagens após um tempo
    setTimeout(() => {
        document.querySelectorAll(".imagens img").forEach(img => {
            img.style.opacity = "0"
        })
        trava = "desbloqueado"
    }, 1500)

    // Adiciona eventos de clique
    adicionarEventos()
}

function adicionarEventos() {
    document.querySelectorAll(".imagens").forEach(carta => {
        carta.onclick = () => {
            if (trava !== "desbloqueado") return

            const imagem = carta.querySelector("img")
            if (imagem.classList.contains("encontrada")) return

            if (imagem.style.opacity === "0" || imagem.style.opacity === "") {
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
                    trava = "desbloqueado"
                }
            }
        }
    })
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
