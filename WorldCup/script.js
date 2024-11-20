// Times participantes
const times = [
    "Brasil", "Argentina", "França", "Alemanha", "Espanha", "Inglaterra",
    "Portugal", "Itália", "Holanda", "Uruguai", "Croácia", "Bélgica",
    "Japão", "México", "Senegal", "Coreia do Sul"
];

// Lista de times com suas respectivas imagens
const timesComImagens = {
    "Brasil": "images/brasil.png",
    "Argentina": "images/argentina.png",
    "França": "images/franca.png",
    "Alemanha": "images/alemanha.png",
    "Espanha": "images/espanha.png",
    "Inglaterra": "images/inglaterra.png",
    "Portugal": "images/portugal.png",
    "Itália": "images/italia.png",
    "Holanda": "images/holanda.png",
    "Uruguai": "images/uruguai.png",
    "Croácia": "images/croacia.png",
    "Bélgica": "images/belgica.png",
    "Japão": "images/japao.png",
    "México": "images/mexico.png",
    "Senegal": "images/senegal.png",
    "Coreia do Sul": "images/coreia-do-sul.png"
};

// Função para adicionar um confronto com imagens
function criarJogoComImagem(time1, time2, containerId, mostrarPlacar = false) {
    const container = document.getElementById(containerId);
    const jogo = document.createElement("div");
    jogo.className = "jogo";
    
    if (time1 && time2) {
        const placar = mostrarPlacar ? ` (${gerarPlacar()})` : "";

        // Cria o primeiro time
        const time1Img = document.createElement("img");
        time1Img.src = timesComImagens[time1]; // Usa a imagem do time
        time1Img.alt = time1;
        time1Img.className = "time-imagem";
        
        // Cria o segundo time
        const time2Img = document.createElement("img");
        time2Img.src = timesComImagens[time2]; // Usa a imagem do time
        time2Img.alt = time2;
        time2Img.className = "time-imagem";

        // Adiciona os times e o placar ao confronto
        jogo.appendChild(time1Img);
        jogo.appendChild(document.createTextNode(` ${time1} x ${time2} `));
        jogo.appendChild(time2Img);
        jogo.appendChild(document.createTextNode(placar));
    } else if (time1) {
        jogo.textContent = time1; // Para fases com apenas um time (ex: campeão)
    }

    container.appendChild(jogo);
}

// Estrutura de fases do torneio
let fases = {
    "16avos": times,
    "oitavas": [],
    "quartas": [],
    "semi": [],
    "final": [],
    "campeao": []
};

function gerarPlacar() {
    const time1Placar = Math.floor(Math.random() * 5); // Placar aleatório para time 1
    const time2Placar = Math.floor(Math.random() * 5); // Placar aleatório para time 2
    return `${time1Placar} - ${time2Placar}`;
}

function criarJogo(time1, time2, containerId, mostrarPlacar = false) {
    const container = document.getElementById(containerId);
    const jogo = document.createElement("div");
    jogo.className = "jogo";
    if (time1 && time2) {
        const placar = mostrarPlacar ? ` (${gerarPlacar()})` : "";
        jogo.textContent = `${time1} x ${time2}${placar}`;
    } else if (time1) {
        jogo.textContent = time1; // Para fases com apenas um time (ex: campeão)
    }
    container.appendChild(jogo);
}

function atualizarTabela() {
    // Mostra as colunas apenas após a simulação de cada fase
    document.getElementById("16avos-esq").classList.add("show");
    document.getElementById("16avos-dir").classList.add("show");
    document.getElementById("oitavas-esq").classList.add("show");
    document.getElementById("oitavas-dir").classList.add("show");
    document.getElementById("quartas-esq").classList.add("show");
    document.getElementById("quartas-dir").classList.add("show");
    document.getElementById("semi-esq").classList.add("show");
    document.getElementById("semi-dir").classList.add("show");
    document.getElementById("final").classList.add("show");

   

        // Atualiza 16avos
        for (let i = 0; i < fases["16avos"].length; i++) {
            const containerId = i % 2 === 0? "16avos-esq" : "16avos-dir";
            criarJogo(fases["16avos"][i], fases["16avos"][i + 1], containerId, true);
            i++;
        }
    
        // Atualiza as próximas fases (Oitavas, Quartas, Semi)
        ["oitavas", "quartas", "semi"].forEach((fase) => {
            fases[fase].forEach((time, index) => {
                const containerId = index < fases[fase].length / 2 ? `${fase}-esq` : `${fase}-dir`;
                criarJogo(time, null, containerId);
            });
        });
    
        // Atualiza final
        if (fases["final"].length > 0) {
            criarJogo(fases["final"][0], fases["final"][1], "final", true);
        }
    
        // Atualiza campeão
        if (fases["campeao"].length > 0) {
            const campeaoDiv = document.createElement("div");
            campeaoDiv.className = "jogo";
            campeaoDiv.textContent = `🏆 Campeão: ${fases["campeao"][0]} 🏆`;
            document.getElementById("final").appendChild(campeaoDiv);
        }
    }
    

function simularFase() {
    if (fases["16avos"].length > 0) {
        // Simular oitavas
        for (let i = 0; i < fases["16avos"].length; i += 2) {
            const time1 = fases["16avos"][i];
            const time2 = fases["16avos"][i + 1];
            const vencedor = Math.random() > 0.5 ? time1 : time2;
            fases["oitavas"].push(vencedor);
        }
        fases["16avos"] = [];    
    } else if (fases["oitavas"].length > 0) {
        // Simular oitavas
        for (let i = 0; i < fases["oitavas"].length; i += 2) {
            const time1 = fases["oitavas"][i];
            const time2 = fases["oitavas"][i + 1];
            const vencedor = Math.random() > 0.5 ? time1 : time2;
            fases["quartas"].push(vencedor);
        }
        fases["oitavas"] = [];
    } else if (fases["quartas"].length > 0) {
        // Simular quartas
        for (let i = 0; i < fases["quartas"].length; i += 2) {
            const time1 = fases["quartas"][i];
            const time2 = fases["quartas"][i + 1];
            const vencedor = Math.random() > 0.5 ? time1 : time2;
            fases["semi"].push(vencedor);
        }
        fases["quartas"] = [];
    } else if (fases["semi"].length > 0) {
        // Simular semi
        for (let i = 0; i < fases["semi"].length; i += 2) {
            const time1 = fases["semi"][i];
            const time2 = fases["semi"][i + 1];
            const vencedor = Math.random() > 0.5 ? time1 : time2;
            fases["final"].push(vencedor);
        }
        fases["semi"] = [];
    } else if (fases["final"].length > 0) {
        // Simular final
        const vencedor = Math.random() > 0.5 ? fases["final"][0] : fases["final"][1];
        fases["campeao"].push(vencedor);
        fases["final"] = [];
    }

    // Atualiza a tabela
    atualizarTabela();
}

