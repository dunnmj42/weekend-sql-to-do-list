$(document).ready(onReady)

function onReady() {
    console.log('JQ READY');
    //setupClickListeners();
    getTasks();
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

function renderTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let $tr = $("<tr></tr>");

        $tr.data("task", task);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td>${task.timeAdded}</td>`);
        if(task.isImportant) {
            $tr.append(`<td>Important</td>`);
        } else {
            $tr.append(`<td>Not Important</td>`);
        }
        if(task.isComplete) {
            $tr.append(`<td>Complete</td>`);
        } else {
            $tr.append(`<td>Not Complete</td>`);
        }
        $tr.append(`<td><button class="removeBtn">Remove</button></td>`);
        $("#taskOutput").append($tr);
    }
}