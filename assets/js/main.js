let tarefasInput = document.querySelector('.tarefas-input');
let tarefasButton = document.querySelector('.tarefas-button');
let tarefasList = document.querySelector('.tarefas-list');


tarefasButton.addEventListener('click', () => {         // Evento de click no botão
    if (!tarefasInput.value) return;

    createTarefa(tarefasInput.value);
})

tarefasInput.addEventListener('keypress', (e) => {      // Evento de Enter pressionada
    if (e.keyCode !== 13) return;
    if (!tarefasInput.value) return;

    createTarefa(tarefasInput.value);
});

document.addEventListener('click', (e) => {             // Evento de click em 'X'
    if (e.target.classList.contains('delete-button')) {
        e.target.parentElement.remove();
        saveTarefas();
    }    
});


function createDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.classList.add('delete-button');

    return deleteButton;
}

function createLi() {
    let li = document.createElement('li');
    li.classList.add('tarefa-item');

    return li;
}

function clearInput() {
    tarefasInput.value = '';
    tarefasInput.focus();
}

function createTarefa(tarefa) {
    let tarefaLi = createLi();

    tarefaLi.innerText = tarefa.trim();
    tarefaLi.appendChild(createDeleteButton());
    tarefasList.appendChild(tarefaLi);

    clearInput();
    saveTarefas();
}

function saveTarefas() {
    let liTarefas = tarefasList.querySelectorAll('.tarefa-item');
    let tarefas = [];

    for(let tarefa of liTarefas) {
        let tarefaText = tarefa.innerText.replace('X', '').trim();
        tarefas.push(tarefaText);
    }
    
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function getPreviousTarefas() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if(tarefas) {
        for(let tarefa of tarefas) {
            createTarefa(tarefa);
        }
    }
}
getPreviousTarefas();

