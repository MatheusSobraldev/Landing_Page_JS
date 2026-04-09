var formulario = document.querySelector('#form-contato');
var mensagemFormulario = document.querySelector('.mensagem-formulario');

function mostrarErro(campo, mensagem) {
    var campoForm = campo.parentElement;
    campoForm.classList.remove('sucesso');
    campoForm.classList.add('erro');
    campoForm.querySelector('small').textContent = mensagem;
}

function mostrarSucesso(campo) {
    var campoForm = campo.parentElement;
    campoForm.classList.remove('erro');
    campoForm.classList.add('sucesso');
    campoForm.querySelector('small').textContent = '';
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function nomeValido(nome) {
    return /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var nome = document.querySelector('#nome');
    var email = document.querySelector('#email');
    var telefone = document.querySelector('#telefone');
    var assunto = document.querySelector('#assunto');
    var mensagem = document.querySelector('#mensagem');
    var formularioValido = true;

    if (nome.value.trim().length < 3) {
        mostrarErro(nome, 'Digite um nome com pelo menos 3 caracteres.');
        formularioValido = false;
    } else if (!nomeValido(nome.value.trim())) {
        mostrarErro(nome, 'Digite apenas letras no nome.');
        formularioValido = false;
    } else {
        mostrarSucesso(nome);
    }

    if (!emailValido(email.value.trim())) {
        mostrarErro(email, 'Digite um e-mail valido.');
        formularioValido = false;
    } else {
        mostrarSucesso(email);
    }

    if (telefone.value.trim().length < 10) {
        mostrarErro(telefone, 'Digite um telefone valido.');
        formularioValido = false;
    } else {
        mostrarSucesso(telefone);
    }

    if (assunto.value === '') {
        mostrarErro(assunto, 'Escolha um assunto.');
        formularioValido = false;
    } else {
        mostrarSucesso(assunto);
    }

    if (mensagem.value.trim() !== '' && mensagem.value.trim().length < 15) {
        mostrarErro(mensagem, 'Se escrever uma mensagem, use pelo menos 15 caracteres.');
        formularioValido = false;
    } else {
        mostrarSucesso(mensagem);
    }

    if (formularioValido) {
        mensagemFormulario.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
        mensagemFormulario.style.color = '#2E5283';
        formulario.reset();

        document.querySelectorAll('.campo-form').forEach(function (campo) {
            campo.classList.remove('sucesso');
        });
    } else {
        mensagemFormulario.textContent = 'Confira os campos destacados antes de enviar.';
        mensagemFormulario.style.color = '#b00020';
    }
});
