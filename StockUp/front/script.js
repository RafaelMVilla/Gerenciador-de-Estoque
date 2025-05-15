const btnItens = document.getElementById('btn-itens');
const listaItens = document.getElementById('item-list');
const stockUpURL = "http://localhost:5013/api/Item";

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

btnItens.addEventListener('click', (e) => {
    e.preventDefault();
    getItens();
});
