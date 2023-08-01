function validaCPF() {
    const cpfFormatado = document.getElementById('cpf').value;

    const cpf = limpaFormatação(cpfFormatado);

    if (cpf.length !== 11) {
        mostraResultado('O CPF deve conter 11 dígitos.', 'red');
        return false;
    }

    if (verificaDigitosRepetidos(cpf)) {
        mostraResultado('CPF não pode conter repetição de dígitos.', 'red');
        return false;
    }

    const digito1 = calcularDigitoVerificador(cpf, 1);
    const digito2 = calcularDigitoVerificador(cpf, 2);

    if (digito1 && digito2) {
        mostraResultado('CPF Válido - ' + cpf, 'green');
    } else {
        mostraResultado('CPF Inválido - ' + cpf, 'red');
    }
}

    function calcularDigitoVerificador(cpf, posicao) {
        const sequencia = cpf.slice(0, 8 + posicao).split('');

        let soma = 0;
        let multiplicador = 9 + posicao;

        for (const numero of sequencia) {
            soma += multiplicador * Number(numero);
            multiplicador--;
        }

        const restoDivisao = (soma * 10) % 11;
        const digito = cpf.slice(8 + posicao, 9 + posicao);

        return restoDivisao == digito;
    }


function limpaFormatação(cpf) {
    cpf = cpf.replace(/\D/g, '');

    return cpf;
}

function mostraResultado(text, color) {
    const span = document.getElementById('Resultado');

    span.innerHTML = text;
    span.style.color = color;
}

function verificaDigitosRepetidos(cpf) {
    return cpf.split('').every((d) => d === cpf[0]);

}