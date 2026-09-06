// pegando os elementos 
const buttonAddItem = document.querySelector(".btn-add-item");
const addItemInput = document.querySelector("#add-item-input");
const itemsOfListContainer = document.querySelector(".items-of-list");
const items = document.querySelector(".items")
const itemsParagraph = document.querySelector(".items p")
const buttonDom = document.querySelector("#remove-item");

// FOOTER
const removedItems = document.querySelector(".removed-item");
const itemAdded = document.querySelector(".item-added");


// fazendo o user digitar apenas caracteres nao numericos
addItemInput.addEventListener("input", (event) => {
    const hasNumberRegex = /\d+/g;
    addItemInput.value = addItemInput.value.replace(hasNumberRegex, "");
});

// função para adicionar o elemento na lista
const createElement = () => {

    // criando o elemento input, e colocando o atributo checkbox nele
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    // pegando o button com a img de remover
    const button = document.createElement("button");
    const imgButton = document.createElement("img");
    imgButton.setAttribute("src", "assets/img/Frame (3).svg")
    button.append(imgButton);

    // colocando o valor que o user digitar na tag P que criei
    const p = document.createElement("p");
    p.innerText = addItemInput.value;

    // criando a div items
    const itemsContainer = document.createElement("div");

    // criando a div que fica dentro da div pai items
    const divInnerItemsContainer = document.createElement("div");

    // e nessa div fica o input e o p juntos, o button com a img fica separado
    divInnerItemsContainer.append(input);
    divInnerItemsContainer.append(p);

    // adicionando a classe items ta tag div(itemsContainer) que criei
    itemsContainer.classList.add("items");

    // adicionando a div com o input e o p dentro da div items
    itemsContainer.prepend(divInnerItemsContainer);

    // adicionando por ultimo o elemento button
    itemsContainer.append(button);

    itemsOfListContainer.prepend(itemsContainer);    
}

// adicionando o elemento na lista
buttonAddItem.addEventListener("click", (event) => {
    event.preventDefault()
    const hasNoneCharacter = /^\s*$/; // essa expressão regex, é se o user não digitar NADA ou se digitar espaço(espaço tambem é caractere)

    try {
        if(hasNoneCharacter.test(addItemInput.value)) { // SEMPRE TESTAR A VALIDAÇÃO PRIMEIRO caso o user não digitar nada ou digitar varios espaçoes da um alert no catch com mensagem personalizada
            throw new Error("Digite alguma coisa para adicionar")   
        }

        else if(addItemInput.value) {
            createElement()
            itemAdded.style.opacity = "1";
        } 
    } catch (error) {
        alert(error.message)
        
    }
    

})

// removendo o elemento da lista
buttonDom.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("apaguei");
})











/* ANOTAÇÕES PARA ANOTAR NO CADERNO DEPOIS

por um momento deu um branco não sei porque, sobre como pegar o valor do input, é: o nome da variavel que eu peguei o input e colocar o .VALUE no final para pegar apenas o valor
===
eu tambem esqueci de colocar a virgula entre a função e o nome do evento

===
Eu tive dúvida sobre por que o botão de remover desaparecia do item anterior quando eu adicionava um novo elemento à lista.

Eu estava tentando reutilizar o mesmo botão, buscando-o com querySelector(".items button"). Você me deu a dica de usar console.log(button) para observar no console o que estava acontecendo com o botão. Assim, percebi que o mesmo elemento estava sendo movido para o novo item.

Consegui resolver criando um novo botão para cada elemento da lista. Para colocar o ícone nele, criei um elemento img, usei setAttribute e adicionei o atributo src com o caminho da imagem:

O bug acontecia porque um elemento do DOM não pode existir em dois lugares ao mesmo tempo. Ao reutilizar o botão, ele era retirado do item anterior e colocado no novo. Agora, cada item possui seu próprio checkbox, texto, botão e imagem.
===

Função para criar os itens
Eu percebi que podia criar uma função responsável por montar toda a estrutura de cada item da lista. A função pode ser reutilizada, mas os elementos criados dentro dela serão novos a cada chamada.

Para isso, a função recebe um parâmetro:
const createItem = (text) => {
    // criação dos elementos...

    paragraph.innerText = text;

    return item;
};

O text é um parâmetro, ou seja, uma informação que a função espera receber. Quando chamo a função, passo o valor do input como argumento:
const item = createItem(addItemInput.value);


Nesse momento, o valor digitado é recebido pelo parâmetro text. Depois, a função usa esse valor para preencher o elemento <p>.

O return item devolve o item completo para fora da função. Assim, posso inseri-lo na lista:
itemsOfListContainer.prepend(item);


A vantagem é que posso chamar createItem() várias vezes. Em cada chamada, a função cria novos elementos <input>, <p>, <button> e <img>. Portanto, eu reutilizo a função, mas não reutilizo os mesmos elementos do DOM.

Antes, eu tentava atualizar diretamente um <p> que já existia. Por isso, o texto anterior era sobrescrito. O parâmetro resolve esse problema porque cada novo texto é usado na criação de um novo item.
====

TESTAR A VALIDAÇÃO PRIMEIRO E DEPOIS SE DER CERTO COLOCAR, SE COLOCAR A VALIDAÇÃO DEPOIS ELE NÃO IRÁ FUNCIONAR
mas eu fiz, com o regex, le ai e me de a dica, sem mostra codigo

2:32 PM
Você criou a regex corretamente, mas a validação está na ordem errada: espaços tornam o valor do input “verdadeiro”, então o primeiro if é executado antes do else if.

Pense em testar primeiro se o conteúdo é vazio ou formado apenas por espaços. Só depois permita criar o item.

*/
