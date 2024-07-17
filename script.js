const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id;
let LIST = [];

// Creación de fecha
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-AR', { weekday: 'long', month: 'short', day: 'numeric' });

// Función agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    if (eliminado) { return; }

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';
    
    const elemento = `
        <li id="elemento">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
}

// Función de tarea realizada
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = !LIST[element.id].realizado;
}

// Función de tarea eliminada
function tareaEliminada(element) {
    // Eliminar la tarea del array LIST
    LIST = LIST.filter(item => item.id !== parseInt(element.id));
    // Eliminar la tarea del DOM
    element.parentNode.parentNode.removeChild(element.parentNode);
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });
        id++;
    }
    localStorage.setItem('APP', JSON.stringify(LIST));
    input.value = '';
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
            id++;
        }
        localStorage.setItem('APP', JSON.stringify(LIST));
        input.value = '';
    }
});

lista.addEventListener('click', function(event) {
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('APP', JSON.stringify(LIST));
});

// Local Storage get item
let data = localStorage.getItem('APP');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

function cargarLista(DATA) {
    DATA.forEach(function(i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
    });
}
