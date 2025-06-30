const cartas = document.querySelectorAll(".imagens")
let primeira_carta = false
let trava = "bloqueado" // só libera o jogo depois que as imagens forem escondidas

// Mostra todas as imagens por um tempinho no início, depois esconde
cartas.forEach(carta1 => {
    let imagem_1 = carta1.querySelector("img")
    imagem_1.style.opacity = "1" // todas aparecem no começo
    setTimeout(() => {
        imagem_1.style.opacity = "0" // depois somem
        trava = "desbloqueado" // agora o jogador pode começar a jogar
    }, 1500)
})

cartas.forEach(carta => {
    carta.addEventListener("click", () => {
        if (trava == "desbloqueado") {
            let imagem = carta.querySelector("img")

            // se essa carta já foi descoberta, ignoramos o clique
            if (imagem.classList.contains("encontrada")) {
                return
            }

            // mostra a imagem se ela estiver escondida
            if (imagem.style.opacity === "0" || imagem.style.opacity === "") {
                imagem.style.opacity = "1"
            }

            // se for a primeira carta clicada
            if (primeira_carta == false) {
                primeira_carta = imagem
            }

            // se já tem uma carta aberta e o jogador clicou em uma diferente
            else if (imagem !== primeira_carta) {
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
})
