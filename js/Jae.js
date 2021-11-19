$(document).ready(function() {

  // navigate to itself
  $('.logo').click(function() {
    window.location.href = 'Jae.html';
  });

    $("#submitForm").submit(function(e) {
  
      var name     = $("#name").val();
      var message = $("#message").val();
  
      $.ajax({
        method: "POST",
        url: "http://localhost:5000/sendMessage",
        data: JSON.stringify({
          "name"     : name,
          "message"  : message
        }),
        contentType: 'application/json'
      })
      .done(function(msg) {
         console.log(msg);
      });
    });
  });
  