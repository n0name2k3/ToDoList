
var taskAPI = 'http://localhost:3000/task';

//-------------------------------Main
function start()
{
    getTasks(renderTasks);
    handleCreateForm();
}
start();

//-----------------------------GetData
function getTasks(callback)
{
    fetch(taskAPI)
    .then(function(response){
        return response.json();
    })
    .then(callback)
}

//--------------------Render Task From DB
function renderTasks(task){
    var listBlock = document.querySelector(".task-list");
    var htmls = task.map(function(task){
        if(task.isDone == "true"){
            return `<li class="task-item-${task.id} active task-item">
                    <input type="checkbox" name="" class="checkbox-inp" id="box-${task.id}" onclick="checkStatus(${task.id})" checked>
                    <h4 class="task-item-name-${task.id}">${task.name}<button class="deleteBtn" onclick="handleDeleteTasks(${task.id})">Delete<i class="fas fa-trash"></i></button></h4>
                </li>`;
        }
        return `<li class="task-item-${task.id} task-item">
                    <input type="checkbox" name="" class="checkbox-inp" id="box-${task.id}" onclick="checkStatus(${task.id})">
                    <h4 class="task-item-name-${task.id}">${task.name}<button class="deleteBtn" onclick="handleDeleteTasks(${task.id})">Delete<i class="fas fa-trash"></i></button></h4>
                </li>`;
    })
    listBlock.innerHTML = htmls.join("");
}

//--------------------Create New Tasks
function handleCreateForm()
{
    var newName = document.querySelector('input[name="name"]').value;
    if(newName)
    {
        var formData = 
            {
                name: newName
            };
            createTasks(formData,function()
            {
                getTasks(renderCourses);
            });
    }
    else{
        alert("Empty Task?");
    }
}

function createTasks(data,callback)
{
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };

    fetch(taskAPI, option)
        .then(function(response){
            response.json();
        })
        .then(callback);

        document.location.reload()
}

//--------------------Check Status
function checkTasks(data,callback,id)
{
    var option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };

    fetch(taskAPI + '/' + id, option)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function checkStatus(id)
{
    
    fetch(taskAPI + '/' + id)
    .then(function(response){
        return response.json();
    })
    .then(function(){
        var checkBox = document.getElementById("box-" + id);
        var taskItem = document.querySelector(".task-item-" + id);
        
        
    if(checkBox.checked == true)
    {
        taskItem.classList.add("active");

        var formData = 
        {
            
            isDone: "true"
        };
        checkTasks(formData,function()
        {
            getTasks(renderCourses);
        },id);

    }
    else {
        taskItem.classList.remove("active");

        var formData = 
        {
            
            isDone: "false"
        };

        checkTasks(formData,function()
        {
            getTasks(renderCourses);
        },id);
    }
    })

}

//--------------------Delete Tasks
function handleDeleteTasks(id)
{
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };


    
    fetch(taskAPI + '/' + id, option)
        .then(function(response){
            response.json();
        })
        .then(function(){
            document.querySelector(".task-item-" + id).remove();
        });
}
