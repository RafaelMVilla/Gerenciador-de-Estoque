// Constantes responsáveis para listar todos os itens
const btnItens = document.getElementById('btn-itens');
const listaItens = document.getElementById('item-list');

// Constantes responsáveis para criar
const formItem = document.getElementById('form-item-add');
const inputDispositivo = document.getElementById('input-item-dispositivo');
const inputMarca = document.getElementById('input-item-marca');
const inputModelo = document.getElementById('input-item-modelo');
const inputResponsavel = document.getElementById('input-item-responsavel');
const inputLocal = document.getElementById('input-item-local');

// Constante responsável pela URL da API
const stockUpURL = "http://localhost:5013/api/Item";

// Constante responsável para pegar todos os itens
const getItens = async () => {
    listaItens.innerHTML = "";

    try {

        const response = await fetch(stockUpURL, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os itens!");
        }

        const itens = await response.json();

        itens.forEach(item => {
            const novaLinha = document.createElement("li");
            novaLinha.innerText = `ID: ${item.id} | Dispositivo: ${item.dispositivo} | Marca: ${item.marca} | Modelo: ${item.modelo} | Responsável: ${item.responsavel} | Local: ${item.local}`;
            listaItens.appendChild(novaLinha);
        });
        
    } catch (error) {
      console.log(error.message);
      listaItens.innerText = `${error.message}`;  
    }
}

// Constante responsável por criar um novo item
const postItem = async (novoItem) => {
    listaItens.innerHTML = '';

    try {
        const response = await fetch(stockUpURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoItem)
        });

        
        if(!response.ok){
            throw new Error("Erro ao criar novo item!");
        }
    
        const item = await response.json();

        alert(`O item ${item.dispositivo} foi adicionado com sucesso!`);

    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
}


// Função para listar todos os itens pelo botão "btn-itens"
btnItens.addEventListener('click', (e) => {
    e.preventDefault();
    getItens();
});

// Função para criar um novo item pelo form
formItem.addEventListener('submit', (e) => {
    e.preventDefault();
    postItem({
        dispositivo: inputDispositivo.value,
        marca: inputMarca.value,
        modelo: inputModelo.value,
        responsavel: inputResponsavel.value,
        local: inputLocal.value,
    });
});
