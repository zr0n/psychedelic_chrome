// Função para gerar uma cor aleatória em formato RGB
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Função para interpolar (lerp) entre duas cores
function lerpColor(color1, color2, t) {
    const [r1, g1, b1] = color1.match(/\d+/g).map(Number);
    const [r2, g2, b2] = color2.match(/\d+/g).map(Number);
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `rgb(${r}, ${g}, ${b})`;
}

// Função para gerar um filtro CSS aleatório e psicodélico
function getRandomFilter() {
    const filters = [
        `hue-rotate(${Math.floor(Math.random() * 360)}deg)`,
        `saturate(${Math.random() * 5})`,
        `brightness(${0.5 + Math.random() * 1.5})`,
        `contrast(${0.5 + Math.random() * 2})`,
        `invert(${Math.random() * 100}%)`,
        `sepia(${Math.random() * 100}%)`,
        `blur(${Math.random() * 5}px)`,
        `grayscale(${Math.random() * 100}%)`,
    ];
    // Escolhe 3 filtros aleatórios e combina
    return filters.sort(() => Math.random() - 0.5).slice(0, 3).join(' ');
}

// Função para determinar a cor do texto que contrasta com o fundo
function getContrastingTextColor(rgbColor) {
    const [r, g, b] = rgbColor.match(/\d+/g).map(Number);
    // Calcula o brilho percetível utilizando a fórmula de luminância
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    // Se o brilho for maior que 128, utiliza texto preto; caso contrário, branco
    return brightness > 128 ? 'black' : 'white';
}

// Função principal para animar os elementos e aplicar filtros nas imagens
function psychedelicEffect() {
    const elements = document.querySelectorAll('div'); // Seleciona todos os elementos <div>
    
    let startColors = [];
    let endColors = [];
    let startTime = Date.now();
    const duration = 2000; // Duração da transição em milissegundos

    // Inicializa as cores iniciais e finais
    elements.forEach(element => {
        startColors.push(getComputedStyle(element).backgroundColor);
        endColors.push(getRandomColor());
    });

    // Aplica filtros aleatórios nas imagens
    document.querySelectorAll('img').forEach(img => {
        img.style.transition = 'filter 1s ease'; // Suaviza a transição
        img.style.filter = getRandomFilter();
    });

    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        const images = document.querySelectorAll('img'); // Seleciona todas as imagens
        images.forEach(img => {
            if(Math.random() > 0.5)
                img.style.filter = getRandomFilter();
            img.style.transition = 'filter 1s ease'; // Suaviza a transição
            img.style.zIndex = 999999;
        });

        // Aplica a interpolação de cores aos elementos e ajusta a cor do texto
        elements.forEach((element, index) => {
            if (element.style) { // Verifica se o elemento suporta style
                const newBgColor = lerpColor(startColors[index], endColors[index], t);
                element.style.backgroundColor = newBgColor;
                element.style.color = getContrastingTextColor(newBgColor);
            }
        });

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            startTime = Date.now();
            startColors = endColors;
            endColors = Array.from(elements, () => getRandomColor());
            animate();
        }
    }

    animate();
}

// Inicia o efeito psicodélico
psychedelicEffect();
