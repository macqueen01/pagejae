$(document).ready(function() {

  $('.logo').click(function() {
    window.location.href = 'Jae.html';
  });
  
  $("#submitForm").submit(function(e) {

    var name = $("#name").val();
    var message = $("#message").val();

    $.ajax({
      method: "POST",
      url: "http://localhost:5000/sendMessage",
      data: JSON.stringify({
        "name"     : name,
        "message"  : message
        }),
      contentType: 'application/json'
    }).done(function(msg) {
      console.log(msg);
    });
  });

    $.ajax({
        method: "GET",
        url: "http://localhost:5000/getMessage",
        contentType: 'application/json'
    }).done(function(msg) {
        var cells = msg;

        cells.forEach(function(cell) {
          if (cells.indexOf(cell) % 2 == 0) {
            $("#commentLeftContainer")
              .append('<div role="listitem" class="w-dyn-item"><a data-ix="project-list-thumb" class="home-work-item w-inline-block">' +
                '<h4 class="work-title">' + cell.name + '</h4>' +
                '<h7 style="font-weight: 100;"> posted at ' + cell.date + '</h7>' +
                '<h4 class="project-description" style="color: gray;">' + cell.message + '</h4>' +
                '</a></div>');
          } else {
            $("#commentRightContainer")
              .append('<div role="listitem" class="w-dyn-item"><a data-ix="project-list-thumb" class="home-work-item w-inline-block">' +
                '<h4 class="work-title">' + cell.name + '</h4>' +
                '<h7 style="font-weight: 100;"> posted at ' + cell.date + '</h7>' +
                '<h4 class="project-description" style="color: gray;">' + cell.message + '</h4>' +
                '</a></div>');
          }
        });
    });
  });
  