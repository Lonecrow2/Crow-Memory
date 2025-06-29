const cartas = document.querySelectorAll(".imagens");
primeira_carta = null

cartas.forEach(carta => {
    carta.addEventListener("click", () => {
        let imagem = carta.querySelector("img");
        if (imagem.style.opacity === "0" || imagem.style.opacity === "") {
            imagem.style.opacity = "1";
        } if (!primeira_carta) {
            primeira_carta = imagem
        } else {
            if (imagem.src !== primeira_carta.src) {
                setTimeout(() => {
                    imagem.style.opacity = "0"
                    primeira_carta.style.opacity = "0"
                    primeira_carta = null
                }, 1000)
            } else {
                primeira_carta = null
            }
        }
    });
})
