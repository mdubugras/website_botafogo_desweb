const botaoContainer = document.createElement('div');
const botaoMasc = document.createElement('button');
const botaoFem = document.createElement('button');
const botaoCompleto = document.createElement('button');
const botaoSair = document.querySelector('.botao-sair');

botaoContainer.className = 'botao-container';
botaoMasc.innerHTML = 'Masculino';
botaoFem.innerHTML = 'Feminino';
botaoCompleto.innerHTML = 'Elenco Completo';

botaoContainer.appendChild(botaoMasc);
botaoContainer.appendChild(botaoFem);
botaoContainer.appendChild(botaoCompleto);
document.body.appendChild(botaoContainer);

async function detalhesJogador(id) {
    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao obter informações dos jogadores:', error);
        window.alert('Erro ao obter informações dos jogadores.');
        return null;
    }
}

async function mostrarJogadores(link) {
    try {
        const response = await fetch(link);
        const jogadores = await response.json();

        const jogadoresContainer = document.querySelector('.jogadores-container');
        jogadoresContainer.innerHTML = ''; 

        jogadores.forEach(jogador => {
            const cartaJogador = document.createElement('div');
            cartaJogador.classList.add('carta-jogador');

            if (link.includes('masculino')) { 
                cartaJogador.classList.add('carta-masculino');
            } else if (link.includes('feminino')) { 
                cartaJogador.classList.add('carta-feminino');
            } else {
                cartaJogador.classList.add('carta-todos');
            }

            cartaJogador.innerHTML = `
                <img src="${jogador.imagem}" alt="${jogador.nome}">
                <h3>${jogador.nome}</h3>
                <button class="botao-saiba-mais" data-id="${jogador.id}">Saiba mais</button>
            `;
            jogadoresContainer.appendChild(cartaJogador);
            
        });

        const botoesSaibaMais = document.querySelectorAll('.botao-saiba-mais');
        botoesSaibaMais.forEach(botao => {
            botao.addEventListener('click', async () => {
                const jogadorId = botao.getAttribute('data-id');
                const jogadorDetalhes = await detalhesJogador(jogadorId);

                if (jogadorDetalhes) {
                    const modalOverlay = document.querySelector('.modal-overlay');
                    const modalFoto = document.querySelector('.foto-jogador');
                    const modalNome = document.querySelector('.nome-jogador');
                    const modalDescricao = document.querySelector('.descricao-jogador');
                    const modalNascimento = document.querySelector('.nascimento-jogador');
                    const modalAltura = document.querySelector('.altura-jogador');
                    const modalPosicao = document.querySelector('.posicao-jogador');

                    modalFoto.src = jogadorDetalhes.imagem;
                    modalFoto.alt = jogadorDetalhes.nome;
                    modalNome.innerHTML = jogadorDetalhes.nome_completo;
                    modalDescricao.innerHTML = jogadorDetalhes.descricao;
                    modalNascimento.innerHTML = `Nascimento: ${jogadorDetalhes.nascimento}`;
                    modalAltura.innerHTML = `Altura: ${jogadorDetalhes.altura}`;
                    modalPosicao.innerHTML = `Posição: ${jogadorDetalhes.posicao}`;

                    modalOverlay.style.display = 'flex';
                } else {
                    window.alert('Detalhes do jogador não encontrados');
                    console.error('Detalhes do jogador não encontrados');
                }
            });
        });
    } catch (error) {
        window.alert('Erro ao obter informações dos jogadores.');
        console.error('Erro ao obter informações dos jogadores:', error);
    }
}

botaoMasc.addEventListener('click', () => {
    mostrarJogadores('https://botafogo-atletas.mange.li/masculino');
});

botaoFem.addEventListener('click', () => {
    mostrarJogadores('https://botafogo-atletas.mange.li/feminino');
});

botaoCompleto.addEventListener('click', () => {
    mostrarJogadores('https://botafogo-atletas.mange.li/all');
});

botaoSair.addEventListener('click', () => {
    window.location.href = 'index.html';
});

const fecharModal = document.querySelector('.fechar-modal');
fecharModal.addEventListener('click', function () {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.style.display = 'none'; 
});
