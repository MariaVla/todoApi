$(document).ready(function(){
  // Cuando la pagina termina de cargar, hace un get a mi propio servidor.
  $.getJSON("/api/todos")
  .then(addTodos)
  .catch(err => {
    console.log(err);
  });

  $('#todoInput').keypress(function(event){
    //chequeo si es enter
    if (event.which == 13) {
      createTodo();
    }
  });

  $('.list').on('click', 'li', function() {
    //Paso por parametro el li que clicke
    updateTodo($(this));
  });

  // Escucha por clicks en los spans que estan dentro de la ul con clase list.
  // Tengo que hacer esto porque no le puedo poner un listener a algo que cuando cargo la pagina no existia.
  $('.list').on('click', 'span', function(event) {
    // con this encuentro lo que se apreto
    //luego, busco el padre, que en este caso es li.
    event.stopPropagation(); //esto es para cuando activemos el evento, no activemos el del padre.
    removeTodo($(this).parent());
  });
});

function removeTodo(todo) {
  var clikedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clikedId;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function (data) {
    todo.remove();
  })
  .catch(err => {
    console.log(err);
  });
}

function addTodos(todos) {
  //adds todos to the page
  todos.forEach(function(todo) {
    addTodo(todo);
  })
}

function createTodo() {
  //send request to create new todo
  var userInput = $('#todoInput').val();
  $.post('/api/todos', {name: userInput}).then(function(newTodo) {
    $('#todoInput').val('');
    addTodo(newTodo);
  }).catch(err => {
    console.log(err);
  });
}

function addTodo(todo) {
  var newTodo = $('<li>' + todo.name + ' <span>X</span>' + '</li>');
  //con esto guardamos info que luego necesitamos. Esto se puede volver engorroso, aca es donde sirven los framework como react
  newTodo.data('id',todo._id);
  newTodo.data('completed',todo.completed);
  newTodo.addClass('task');
  if (todo.completed) {
      newTodo.addClass('done');
  }
  //agregamos el nuevo todo al ul con clase list
  $('.list').append(newTodo);
}

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateDate = {completed: isDone}
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateDate
  })
  .then(function (updatedTodo) {
    todo.toggleClass('done');
    todo.data('completed', isDone);
  })
  .catch(err => {
    console.log(err);
  });
}