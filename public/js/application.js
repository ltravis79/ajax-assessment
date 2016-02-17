$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  console.log("Page Ready");
  $("#new_task").on("click", function(e) {
  	e.preventDefault();
  	console.log("Intercepted link click");
  	$("#new_task").remove();
  	$("body").append('<form id="new_task" method="POST" action="/tasks">\
				<input type="text" id="task_name" name="task_name" placeholder="Enter new task name">\
				<input type="submit" id="submit_button" value="Submit Task">\
			  </form>');
  	$("#submit_button").on("click", function(e) {
  		e.preventDefault();
  		console.log("Intercepted button click");
  		data = $("#new_task").serialize();
  		$.ajax({
  			method:"POST",
  			url: "/tasks",
  			data: data
  		})
  		.done(function(response) {
  			console.log("Successful Post");
  			console.log(response);
  			$("#task_list").append("<li>"+response.task_name+"\
  				<form class='delete_form'><input type='hidden' name='_method' value='delete'>\
  				<input type='submit' id='"+response.id+"' class='delete_button' value='Delete'></form></li>");
  			$("#task_name").value = "";
  			// QUESTIONS for Shambhavi -- 
  			// How to clear the text box after it's been used?
  			// Is there a better way to append data with text...
  			//    instead of "<li>"+data+"</li>", for example
  		})
  		.fail(function(response) {
  			console.log("Failed Post");
  			console.log(response);
  		})
  	})
  })
  $(".delete_button").on("click", function(e) {
  	e.preventDefault();
  	console.log(this);
  	console.log("Intercepted delete button click");
  	$.ajax({
  		method:"DELETE",
  		url: "/tasks/"+$(this).attr("id")
  		// QUESTIONS for Shambhavi -- 
  		// Is this the best approach for the RESTful route name?
  	})
  	.done(function(response) {
  		console.log("Successful Delete");
  		$(this).remove();
  	})
  	.fail(function(response) {
  		console.log("Failed Delete");
  		console.log(response);
  	})
  	// Delete button no longer removes the item after trrying to change controller to 
  	// allow for non-javascript sessions.  I think I need to adjust how the items are referenced by id.
  	// Adding individual forms may have messed up my references?
  })
});

