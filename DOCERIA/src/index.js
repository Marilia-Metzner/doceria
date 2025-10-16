const qtd1 = document.getElementById("qtd1");
const qtd2 = document.getElementById("qtd2");
const qtd3 = document.getElementById("qtd3");
const qtd4 = document.getElementById("qtd4");
const qtd5 = document.getElementById("qtd5");
const qtd6 = document.getElementById("qtd6");

const somaQTD = document.getElementById("somaQTD");
const irAoCarrinho = document.getElementById("irAoCarrinho");
const preco = document.getElementById("preco");
const btnComprar = document.querySelector(".botaocompra");

function calculo() {
    totalQTD =  Number(qtd1.value) + 
                Number(qtd2.value) + 
                Number(qtd3.value) + 
                Number(qtd4.value) + 
                Number(qtd5.value) + 
                Number(qtd6.value);

    totalPreco = Number(qtd1.value*12.90) + 
                 Number(qtd2.value*12.30) + 
                 Number(qtd3.value*35.40) + 
                 Number(qtd4.value*35.90) + 
                 Number(qtd5.value*15.30) + 
                 Number(qtd6.value*10.90);

    somaQTD.innerHTML = totalQTD;
    preco.innerHTML = totalPreco.toFixed(2);
}

irAoCarrinho.addEventListener("click", calculo);


// Criando tela de dados
const overlayDados = document.createElement("div");
overlayDados.classList.add("overlay");
overlayDados.id = "dadosOverlay";
overlayDados.innerHTML = `
  <div class="modal">
    <span class="close-btn" id="fecharDados">X</span>
    <h2>Preencha seus dados</h2>
    <input class="input-field" type="text" id="nome" placeholder="Primeiro Nome">
    <input class="input-field" type="text" id="sobrenome" placeholder="Sobrenome">
    <input class="input-field" type="text" id="endereco" placeholder="Rua">
    <input class="input-field" type="text" id="endereco" placeholder="CEP">
    <input class="input-field" type="text" id="numero" placeholder="Número">
    <button id="confirmarDados">Confirmar</button>
  </div>
`;
document.body.appendChild(overlayDados);

// Criando tela de compra concluída
const overlayCompra = document.createElement("div");
overlayCompra.classList.add("overlay");
overlayCompra.id = "compraOverlay";
overlayCompra.innerHTML = `
  <div class="modal">
    <span class="close-btn" id="fecharCompra">X</span>
    <h2>Compra concluída ✔</h2>
    <p>Obrigado pela compra!</p>
    <p>Previsão da entrega 30-120min!</p>
  </div>
`;
document.body.appendChild(overlayCompra);

// FUNÇÕES DE ABRIR/FECHAR
function abrir(id) {
    document.getElementById(id).style.display = "flex";
}
function fechar(id) {
    document.getElementById(id).style.display = "none";
}

// Quando clicar em COMPRAR → abre tela de dados
btnComprar.addEventListener("click", () => {
    const quantidade = Number(somaQTD.innerHTML); // pega o total já mostrado
    const valorTotal = Number(preco.innerHTML);

    if (quantidade === 0 || valorTotal === 0) {
        alert("Adicione pelo menos 1 produto ao carrinho antes de comprar!");
        return; // não abre as telas
    }

    abrir("dadosOverlay"); // só abre se passou na verificação
});

// FECHAR telas pelo X
document.addEventListener("click", (e) => {
    if (e.target.id === "fecharDados") fechar("dadosOverlay");
    if (e.target.id === "fecharCompra") fechar("compraOverlay");
});

// CONFIRMAR DADOS
document.addEventListener("click", (e) => {
    if (e.target.id === "confirmarDados") {
        const nome = document.getElementById("nome").value.trim();
        const sobrenome = document.getElementById("sobrenome").value.trim();
        const endereco = document.getElementById("endereco").value.trim();
        const numero = document.getElementById("numero").value.trim();

        if (!nome || !sobrenome || !endereco || !numero) {
            alert("Preencha todos os campos antes de confirmar!");
            return;
        }

        fechar("dadosOverlay");
        abrir("compraOverlay");
    }
});