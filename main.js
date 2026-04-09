var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function criarEstruturaCarrinho() {
    var carrinhoExiste = document.querySelector('.carrinho-lateral');

    if (carrinhoExiste) {
        return;
    }

    var fundo = document.createElement('div');
    fundo.className = 'carrinho-fundo';

    var carrinhoLateral = document.createElement('aside');
    carrinhoLateral.className = 'carrinho-lateral';
    carrinhoLateral.setAttribute('aria-label', 'Carrinho de compras');
    carrinhoLateral.innerHTML = `
        <div class="carrinho-topo">
            <h2>Carrinho</h2>
            <button class="fechar-carrinho" type="button" aria-label="Fechar carrinho">Fechar</button>
        </div>
        <div class="itens-carrinho"></div>
        <p class="carrinho-vazio">Seu carrinho está vazio.</p>
        <div class="carrinho-rodape">
            <strong>Total: <span class="total-carrinho">R$0,00</span></strong>
            <button class="finalizar-compra" type="button">Finalizar compra</button>
        </div>
    `;

    document.body.appendChild(fundo);
    document.body.appendChild(carrinhoLateral);
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function pegarPrecoNumerico(textoPreco) {
    return Number(textoPreco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
}

function atualizarCarrinho() {
    var itensCarrinho = document.querySelector('.itens-carrinho');
    var carrinhoVazio = document.querySelector('.carrinho-vazio');
    var totalCarrinho = document.querySelector('.total-carrinho');
    var quantidadesCarrinho = document.querySelectorAll('.quantidade-carrinho');

    if (!itensCarrinho || !carrinhoVazio || !totalCarrinho) {
        return;
    }

    itensCarrinho.innerHTML = '';

    carrinho.forEach(function (item, indice) {
        var itemCarrinho = document.createElement('article');
        itemCarrinho.className = 'item-carrinho';
        itemCarrinho.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div>
                <h3>${item.nome}</h3>
                <p>${formatarPreco(item.preco)}</p>
                <button type="button" data-indice="${indice}">Remover</button>
            </div>
        `;

        itensCarrinho.appendChild(itemCarrinho);
    });

    var total = carrinho.reduce(function (soma, item) {
        return soma + item.preco;
    }, 0);

    totalCarrinho.textContent = formatarPreco(total);
    carrinhoVazio.classList.toggle('visivel', carrinho.length === 0);

    quantidadesCarrinho.forEach(function (quantidade) {
        quantidade.textContent = carrinho.length;
    });

    salvarCarrinho();
}

function abrirCarrinho() {
    document.body.classList.add('carrinho-aberto');
}

function fecharAbaCarrinho() {
    document.body.classList.remove('carrinho-aberto');
}

function prepararBotoesCarrinho() {
    document.querySelectorAll('[data-carrinho]').forEach(function (botao) {
        var contadorExiste = botao.querySelector('.quantidade-carrinho');

        if (!contadorExiste) {
            var contador = document.createElement('span');
            contador.className = 'quantidade-carrinho';
            contador.textContent = '0';
            botao.appendChild(contador);
        }

        botao.addEventListener('click', function (evento) {
            evento.preventDefault();
            abrirCarrinho();
        });
    });
}

function prepararBotoesAdicionar() {
    document.querySelectorAll('.produto > button').forEach(function (botao) {
        botao.addEventListener('click', function () {
            var produto = botao.closest('.produto');
            var item = {
                nome: produto.querySelector('h3').textContent,
                preco: pegarPrecoNumerico(produto.querySelector('strong').textContent),
                imagem: produto.querySelector('img').src
            };

            carrinho.push(item);
            atualizarCarrinho();
            abrirCarrinho();
        });
    });
}

function prepararMenuResponsivo() {
    var botaoMenu = document.querySelector('.botao-menu button');

    if (!botaoMenu) {
        return;
    }

    botaoMenu.addEventListener('click', function () {
        document.body.classList.toggle('menu-aberto');
    });
}

function prepararBuscaGlobal() {
    document.querySelectorAll('.form-busca-global').forEach(function (formulario) {
        formulario.addEventListener('submit', function (evento) {
            var campoBusca = formulario.querySelector('input[name="busca"], #campo-busca');
            var caminhoProdutos = formulario.dataset.produtosPath || './Produtos/produto.html';
            var termoBusca = '';

            if (campoBusca) {
                termoBusca = campoBusca.value.trim();
            }

            if (window.location.pathname.toLowerCase().includes('/produtos/produto.html') || window.location.pathname.toLowerCase().endsWith('\\produtos\\produto.html')) {
                evento.preventDefault();

                if (typeof filtrarProdutos === 'function') {
                    filtrarProdutos();
                }

                return;
            }

            evento.preventDefault();
            window.location.href = caminhoProdutos + '?busca=' + encodeURIComponent(termoBusca);
        });
    });
}

criarEstruturaCarrinho();
prepararBotoesCarrinho();
prepararBotoesAdicionar();
prepararMenuResponsivo();
prepararBuscaGlobal();
atualizarCarrinho();

document.querySelector('.carrinho-fundo').addEventListener('click', fecharAbaCarrinho);
document.querySelector('.fechar-carrinho').addEventListener('click', fecharAbaCarrinho);
document.querySelector('.itens-carrinho').addEventListener('click', function (evento) {
    if (evento.target.tagName === 'BUTTON') {
        var indice = Number(evento.target.dataset.indice);
        carrinho.splice(indice, 1);
        atualizarCarrinho();
    }
});
