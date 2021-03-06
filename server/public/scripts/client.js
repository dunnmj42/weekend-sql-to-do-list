$(document).ready(onReady);

function onReady() {
  console.log("JQ READY");
  setupClickListeners();
  getTasks();
}

// CLICK LISTENERS AND OBJECT ASSEMBLY
function setupClickListeners() {
  $("#taskOutput").on("click", ".markComplete", markComplete);
  $("#taskOutput").on("click", ".removeBtn", removeButton);
  $("#addTaskBtn").on("click", function () {
    console.log("addTaskBtn click");

    let newTask = {
      task: $("#taskIn").val(),
      isImportant: $("#isImportant").val(),
    };

    if (newTask.task && newTask.isImportant) {
      addTask(newTask);
    } else {
      alert("Please Complete the Form to add a Task");
    }
  });
}

// POST
function addTask(newTask) {
  console.log("in addTask", newTask);
  // ajax call to server to POST task
  $.ajax({
    type: "POST",
    url: "/todo",
    data: newTask,
  }).then(function (response) {
    $("#taskIn").val("");
    $("#isImportant").val("");
    getTasks();
  });
}

// GET
function getTasks() {
  console.log("in getTasks");
  // ajax call to server to get tasks
  $("#taskOutput").empty();
  $.ajax({
    type: "GET",
    url: "/todo",
  }).then(function (response) {
    renderTasks(response);
  });
}

// PUT
function markComplete() {
  console.log("clicked markComplete");

  let task = $(this).closest("tr").data("task");
  console.log(task);

  $.ajax({
    type: "PUT",
    url: `/todo/${task.id}`,
    data: task,
  })
    .then(function (response) {
      console.log("Updated");
      getTasks();
    })
    .catch(function (error) {
      alert("error updating status");
    });
}

// DELETE
function removeButton() {
  console.log("clicked remove");
  swal({
    title: "Are you sure?",
    text: "Once removed, you will not be able to recover this Task!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      ajaxDelete();
      swal("Task Removed!", {
        icon: "success",
      });
    } else {
      swal("Task not removed!");
    }
  });

  const task = $(this).closest("tr").data("task").id;
  console.log(task);

  // delete function being passed to router
  function ajaxDelete() {
    $.ajax({
      type: "DELETE",
      url: `/todo/${task}`,
    })
      .then(function (response) {
        getTasks();
      })
      .catch(function (error) {
        alert("error in delete");
      });
  }
}

// Render to DOM
function renderTasks(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let $tr = $("<tr></tr>");
    let dateAdded = new Date(task.timeAdded).toLocaleDateString("en-us");

    if (task.isComplete) {
      $tr = $(`<tr class="table-success"></tr>`);
    } // Set row color on complete

    $tr.data("task", task);
    $tr.append(`<td>${task.task}</td>`);
    $tr.append(`<td>${dateAdded}</td>`);
    if (task.isImportant) {
      $tr.append(`<td>Important</td>`);
    } else {
      $tr.append(`<td>Not Important</td>`);
    }
    if (task.isComplete) {
      $tr.append(
        `<td><button class="btn btn-warning markComplete">Mark Not Complete</button></td>`
      );
    } else {
      $tr.append(
        `<td><button class="btn btn-success markComplete">Mark Complete</button></td>`
      );
    }
    $tr.append(
      `<td><button class="btn btn-danger removeBtn">Remove</button></td>`
    );
    $("#taskOutput").append($tr);
  }
}
