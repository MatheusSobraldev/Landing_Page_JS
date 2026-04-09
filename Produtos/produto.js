var botoesTabs = document.querySelectorAll('.tab-link');
var produtos = document.querySelectorAll('.produto');
var campoBusca = document.querySelector('#campo-busca');
var botaoBusca = document.querySelector('#botao-busca');
var formularioBusca = document.querySelector('.form-busca-global');
var categoriaAtual = 'todos';

function ativarCategoria(categoria) {
    categoriaAtual = categoria;

    botoesTabs.forEach(function (tab) {
        tab.classList.toggle('ativo', tab.dataset.categoria === categoriaAtual);
    });

    filtrarProdutos();
}

function filtrarProdutos() {
    var textoBusca = campoBusca.value.toLowerCase();

    produtos.forEach(function (produto) {
        var nomeProduto = produto.querySelector('h3').textContent.toLowerCase();
        var pertenceCategoria = categoriaAtual === 'todos' || produto.dataset.categoria === categoriaAtual;
        var estaEmPromocao = categoriaAtual === 'promocao' && produto.classList.contains('produto-promocao');
        var correspondeBusca = nomeProduto.includes(textoBusca);

        produto.classList.toggle('oculto', !((pertenceCategoria || estaEmPromocao) && correspondeBusca));
    });
}

function aplicarBuscaDaUrl() {
    var parametros = new URLSearchParams(window.location.search);
    var textoBusca = parametros.get('busca');

    if (textoBusca) {
        campoBusca.value = textoBusca;
    }

    filtrarProdutos();
}

botoesTabs.forEach(function (botao) {
    botao.addEventListener('click', function () {
        ativarCategoria(botao.dataset.categoria);
    });
});

botaoBusca.addEventListener('click', filtrarProdutos);

if (formularioBusca) {
    formularioBusca.addEventListener('submit', function (evento) {
        evento.preventDefault();
        filtrarProdutos();
    });
}

campoBusca.addEventListener('keyup', function () {
    filtrarProdutos();
});

function ativarCategoriaPelaUrl() {
    var categoria = window.location.hash.replace('#', '');
    var categorias = ['todos', 'tenis', 'casaco', 'short', 'camisa', 'promocao'];

    if (categorias.includes(categoria)) {
        ativarCategoria(categoria);
    }
}

ativarCategoriaPelaUrl();
aplicarBuscaDaUrl();
window.addEventListener('hashchange', ativarCategoriaPelaUrl);
