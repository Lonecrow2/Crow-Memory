const cartas = document.querySelectorAll(".imagens");
let primeira_carta = false
let trava = "desbloqueado"

cartas.forEach(carta => {
    carta.addEventListener("click", () => {
        if (trava == "desbloqueado") {
            let imagem = carta.querySelector("img");
            if (imagem.style.opacity === "0" || imagem.style.opacity === "") {
                imagem.style.opacity = "1";
            } if (primeira_carta == false) {
                primeira_carta = imagem
            } else {
                trava = "bloqueado"

                if (imagem.src !== primeira_carta.src && trava == "bloqueado") {
                    setTimeout(() => {
                        imagem.style.opacity = "0"
                        primeira_carta.style.opacity = "0"
                        primeira_carta = false
                        trava = "desbloqueado"
                    }, 500)
                } else {
                    primeira_carta = false
                    trava = "desbloqueado"
                }
            }
        }
    });
})
