
$(document).ready(function() {
    
  let tasks = [];

  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
      createTaskElement(tasks[i]);
    }
  }

  $("#newtaskbox").hide();

  $("#add").click(function() {
    $("#newtaskbox").show();
  });

  $(".deleteimage").click(function() {
    let parentDiv = $(this).parent();
    let index = $(".deleteimage").index(this);
    tasks.splice(index, 1);
    updateTasksInLocalStorage(tasks);

    // İlgili div'i kaldır
    parentDiv.remove();
  });

  $(".deleteimage").mouseover(function() {
    $(this).attr("src", "images/remove2.png");
  });

  $(".deleteimage").mouseleave(function() {
    $(this).attr("src", "images/remove.png");
  });

  $("#submit").click(function() {
    newTask();
    // Sayfayı yenile
    location.reload();
  });

  function newTask() {
    let newTaskInput = $("#newtaskinput").val();

    if (newTaskInput === "") {
      alert("Please fill in the blanks");
      return;
    }

    let task = {
      title: newTaskInput
    };

    tasks.push(task);
    updateTasksInLocalStorage(tasks);

    createTaskElement(task);
    $("#newtaskinput").val("");
    $("#newtaskbox").hide();
  }

  function createTaskElement(task) {
    let newTaskDiv = $("<div>").addClass("newtaskdiv");
    let newTaskP = $("<p>").addClass("newtaskp").text(task.title);
    let deleteImage = $("<img>")
      .attr("src", "images/remove.png")
      .addClass("deleteimage");

    newTaskDiv.append(newTaskP, deleteImage);
    $("body").append(newTaskDiv);
  }

  function updateTasksInLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

