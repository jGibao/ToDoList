let myProjects = [];
let myTable = document.querySelector('#table');
let currentProject;
firstStart = true;

function start() {
    document.getElementById("openButton").style.display = "none";
    let buttonArray = document.createElement("div");
    buttonArray.id = "buttonArray";
    document.body.appendChild(buttonArray);
    myProjects[0] = CreateProject("1", "Projeto 1", null);
    myProjects[1] = CreateProject("2", "Projeto avançado 2", null);

    addTodo("1", CreateToDo("1", "Fazer Interface", "Completar a interface ao estilo do cliente", "20/10/22", 2));
    addTodo("1", CreateToDo("1", "Fazer Codigo", "Completar o codigo ao gosto do cliente", "10/06/22", 3));

    addTodo("2", CreateToDo("2", "Fazer Botões", "Implementar 5 botões", "20/10/22", 2));
    addTodo("2", CreateToDo("2", "Fazer Footer", "Footer com contactos e localização", "10/06/22", 3));

    let projectButton = document.createElement("button");
    projectButton.textContent = "Choose a project";
    projectButton.type = "submit";
    projectButton.onclick = function() {
        projectButton.remove();
        chooseProject();
    };
    document.body.appendChild(projectButton);
}
start();

function CreateProject(projectId, projectName) {
    return {
        id: projectId,
        name: projectName,
        todoList: [],
        getTodoList() {
            return this.todoList;
        }
    };
}

function addTodo(projectId, todoList) {
    for (i = 0; i < myProjects.length; i++) {
        if (myProjects[i].id == projectId) {
            myProjects[i].todoList.push(todoList);
        }
    }
}

function CreateToDo(todoProjectId, todoTitle, todoDescription, todoDueDate, todoPriority) {
    return {
        projectId: todoProjectId,
        title: todoTitle,
        description: todoDescription,
        dueDate: todoDueDate,
        priority: todoPriority,

    };
}

function chooseProject() {

    myProjects.forEach(project => {
        let chooseButton = document.createElement("button");
        chooseButton.textContent = `${project.name}`;
        chooseButton.type = "submit";
        chooseButton.onclick = function() {
            document.getElementById("buttonArray").remove();
            document.getElementById("openButton").style.display = "block";
            showToDoList(project);
            currentProject = project;
        };
        document.getElementById("buttonArray").appendChild(chooseButton);

    })
}

function deleteToDo(title) {
    for (i = 0; i < currentProject.todoList.length; i++) {
        if (currentProject.todoList[i].title == title) {
            currentProject.todoList.splice(i, 1);
            updateTableTodo(currentProject.id);
            return;
        }
    }
}

function showToDoList(project) {
    console.log(project.name);
    updateTableTodo(project.id);
}

function updateTableTodo(projectId) {
    deletePrevTable();
    firstStart = false;
    let headers = ['Project Id', 'Title', 'Description', 'DueDate', 'Priority'];

    let table = document.createElement('table');
    table.setAttribute("id", "tableProv");
    let headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    myProjects[projectId - 1].todoList.forEach(ToDo => {
        console.log("vai buscar");
        let row = document.createElement('tr');
        Object.values(ToDo).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        });
        // let readbutton = document.createElement('button');
        // readbutton.className = 'readButton';
        // readbutton.textContent = "Un/Read";
        // readbutton.addEventListener("mousedown", function() { unread(book.title) });
        // row.appendChild(readbutton);
        let cell = document.createElement('td');
        let deletebutton = document.createElement('button');
        deletebutton.className = 'deleteButton';
        deletebutton.textContent = "Delete";

        deletebutton.addEventListener("mousedown", function() { deleteToDo(ToDo.title) });
        cell.appendChild(deletebutton);
        row.appendChild(cell);
        table.appendChild(row);
    });

    myTable.appendChild(table);

}

function deletePrevTable() {
    if (!firstStart) {
        let tableProv = document.getElementById("tableProv");
        tableProv.remove();
    }

}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function addTodoForm() {
    let exists = false;
    let toDo = CreateToDo(currentProject.id, document.getElementById("title").value, document.getElementById("description").value, document.getElementById("duedate").value, document.getElementById("priority").value);
    for (i = 0; i < currentProject.todoList.length; i++) {
        if (currentProject.todoList[i].title == toDo.title) {
            exists = true;
        } else {
            exists = false;
        }
    }
    if (!exists) {
        currentProject.todoList.push(toDo);
        updateTableTodo(currentProject.id);
    } else {
        window.alert("That task is already inserted!");
    }
}