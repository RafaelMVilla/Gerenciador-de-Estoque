// Constantes responsáveis para listar todos os itens
const btnItens = document.getElementById('btn-itens');
const tableItens = document.getElementById('item-tbody');

// Constantes responsáveis para buscar um item por Id
const formBuscar = document.getElementById('form-item-busca');
const inputBuscarId = document.getElementById('input-item-busca');

// Constantes responsáveis para criar
const formItem = document.getElementById('form-item-add');
const inputDispositivo = document.getElementById('input-item-dispositivo');
const inputMarca = document.getElementById('input-item-marca');
const inputModelo = document.getElementById('input-item-modelo');
const inputResponsavel = document.getElementById('input-item-responsavel');
const inputLocal = document.getElementById('input-item-local');

// Constantes responsáveis para alterar o item
const formItemAlterar = document.getElementById('form-item-alterar');

// Constantes responsáveis para deletar o item
const formDelete = document.getElementById('form-delete');

// Constante responsável pela URL da API
const stockUpURL = "http://localhost:5013/api/Item";

// Método responsável para pegar todos os itens
const getItens = async () => {
    tableItens.innerHTML = "";

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
            const novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `<td>${item.id}</td>
                <td>${item.dispositivo}</td>
                <td>${item.marca}</td>
                <td>${item.modelo}</td>
                <td>${item.responsavel}</td>
                <td>${item.local}</td>`;
            tableItens.appendChild(novaLinha);
        });
        
    } catch (error) {
      console.log(error.message);
      tableItens.innerText = `<tr><td colspan="6">${error.message}</td></tr>`;
    }
}

// Método responsável por buscar um item pelo ID

const getItemId = async (id) => {
    tableItens.innerHTML = "";

    try {
        const response = await fetch(`${stockUpURL}/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar o item!");
            
        }

        const item = await response.json();
        const novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `<td>${item.id}</td>
            <td>${item.dispositivo}</td>
            <td>${item.marca}</td>
            <td>${item.modelo}</td>
            <td>${item.responsavel}</td>
            <td>${item.local}</td>`;
        tableItens.appendChild(novaLinha);
    } catch (error) {
        console.log(error.message);
        tableItens.innerText = `<tr><td colspan="6">${error.message}</td></tr>`;
        alert(error.message);
    }
} 

// Método responsável por criar um novo item
const postItem = async (novoItem) => {
    tableItens.innerHTML = '';

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

// Método responsável por alterar item pelo ID
const putItem = async () => {
    const id = document.getElementById('input-item-id-alterado').value;
    const dispositivo = document.getElementById('input-item-dispositivo-alterado').value;
    const marca = document.getElementById('input-item-marca-alterado').value;
    const modelo = document.getElementById('input-item-modelo-alterado').value;
    const responsavel = document.getElementById('input-item-responsavel-alterado').value;
    const local = document.getElementById('input-item-local-alterado').value;
    
    tableItens.innerHTML = '';

    try {
        const response = await fetch(`${stockUpURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dispositivo,
                marca,
                modelo,
                responsavel,
                local
            })
        });

        if(!response.ok){
            throw new Error("Erro ao alterar dados do item");
        }

        const item = await response.json();

        alert(`O item ${item.dispositivo} foi alterado com sucesso!`);
    } catch(error){
        console.log(error.message);
        alert(error.message);
    }
}

// Método responsável para deletar o item pelo ID
const deleteItem = async () => {
    const id = document.getElementById('input-item-delete').value;
    tableItens.innerHTML = '';

    try {
        const response = await fetch(`${stockUpURL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar Item!");
        }

        const aviso = await response.text();
        alert(aviso);        
    } catch (error) {
        alert(error.message);
    }
}


// Função para listar todos os itens pelo botão "btn-itens"
btnItens.addEventListener('click', (e) => {
    e.preventDefault();
    getItens();
});

// Função para buscar um item pelo ID
formBuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    getItemId(inputBuscarId.value);
})

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

// Função para alterar um item pelo ID
formItemAlterar.addEventListener('submit', (e) => {
    e.preventDefault();
    putItem();
});

 // Função para Deletar o item pelo ID
 formDelete.addEventListener('submit', (e) => {
    e.preventDefault();
    deleteItem();
 })