(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
        } else {
          inserir();
          form.classList.remove("was-validated");
          form.reset();
        }
        event.preventDefault();
        event.stopPropagation();
      },
      false
    );
  });
})();

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bd_clientes")) ?? [];
}

function setLocalStorage(bd_clientes) {
  localStorage.setItem("bd_clientes", JSON.stringify(bd_clientes));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() {
  limparTabela();
  const bd_clientes = getLocalStorage();
  let index = 1;
  for (cliente of bd_clientes) {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.celular}</td>
        <td>${cliente.estado}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `;
    document.querySelector("#tabela>tbody").appendChild(novaLinha);
    index++;
  }
}

function inserir() {
  const cliente = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    celular: document.getElementById("celular").value,
    estado: document.getElementById("estado").value,
  };
  const bd_clientes = getLocalStorage();
  bd_clientes.push(cliente);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function excluir(index) {
  const bd_clientes = getLocalStorage();

  bd_clientes.splice(index - 1, 1);

  setLocalStorage(bd_clientes);
  atualizarTabela();
}

//bd_clientes.splice(index, 1);
// setLocalStorage(bd_clientes);
//atualizarTabela();

function alterar(index) {
  const bd_clientes = getLocalStorage();
}

function validarCelular() {
  const bd_clientes = getLocalStorage();
  for (cliente of bd_clientes) {
    if (celular.value == cliente.celular) {
      celular.setCustomValidity("Este n??mero de celular j?? existe!");
      feedbackCelular.innerText = "Este n??mero de celular j?? existe!";
      return false;
    } else {
      celular.setCustomValidity("");
      feedbackCelular.innerText = "Informe o celular corretamente.";
    }
  }
  return true;
}

atualizarTabela();

const celular = document.getElementById("celular");
const feedbackCelular = document.getElementById("feedbackCelular");
celular.addEventListener("input", validarCelular);
