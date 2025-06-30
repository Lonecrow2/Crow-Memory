const cartas = document.querySelectorAll(".imagens");
let primeira_carta = false

cartas.forEach(carta => {
    carta.addEventListener("click", () => {
        let imagem = carta.querySelector("img");
        if (imagem.style.opacity === "0" || imagem.style.opacity === "") {
            imagem.style.opacity = "1";
        } if (primeira_carta == false) {
            primeira_carta = imagem
        } else {
            if (imagem.src !== primeira_carta.src) {
                setTimeout(() => {
                    imagem.style.opacity = "0"
                    primeira_carta.style.opacity = "0"
                    primeira_carta = false
                }, 500)
            } else {
                primeira_carta = false
            }
        }
    });
})
