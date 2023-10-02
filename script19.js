class ContaBancaria {
    constructor(agencia, numero, tipo, saldo = 0) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this.saldo = saldo;
    }

    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        } else {
            console.log("Saldo insuficiente");
            return false;
        }
    }

    depositar(valor) {
        this.saldo += valor;
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, cartaoCredito, saldo = 0) {
        super(agencia, numero, "Conta Corrente", saldo);
        this.cartaoCredito = cartaoCredito;
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo = 0) {
        super(agencia, numero, "Conta Poupança", saldo);
    }
}

class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo = 0) {
        super(agencia, numero, "Conta Universitária", saldo);
    }

    sacar(valor) {
        if (valor <= 500 && valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        } else {
            console.log("Limite de saque excedido ou saldo insuficiente");
            return false;
        }
    }
}
const contas = [];

function inserirConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipo = document.getElementById("tipo").value;
    const saldo = parseFloat(document.getElementById("saldo").value);

    let novaConta;

    if (tipo === "Conta Corrente") {
        const cartaoCredito = parseFloat(prompt("Digite o limite do cartão de crédito:"));
        novaConta = new ContaCorrente(agencia, numero, cartaoCredito, saldo);
    } else if (tipo === "Conta Poupança") {
        novaConta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipo === "Conta Universitária") {
        novaConta = new ContaUniversitaria(agencia, numero, saldo);
    }

    contas.push(novaConta);
    limparCampos();
}

function deletarConta() {
    const index = prompt("Digite o índice da conta que deseja deletar:");
    if (index >= 0 && index < contas.length) {
        contas.splice(index, 1);
    } else {
        console.log("Índice inválido");
    }
}

function visualizarContas() {
    const contasDiv = document.getElementById("contas");
    contasDiv.innerHTML = "";

    contas.forEach((conta, index) => {
        const contaInfo = `Índice: ${index}, Agência: ${conta.agencia}, Número: ${conta.numero}, Tipo: ${conta.tipo}, Saldo: R$ ${conta.saldo.toFixed(2)}`;
        const p = document.createElement("p");
        p.textContent = contaInfo;
        contasDiv.appendChild(p);
    });
}

function limparCampos() {
    document.getElementById("agencia").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("tipo").value = "Conta Corrente";
    document.getElementById("saldo").value = "";
}
