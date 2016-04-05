// jQuery
$(document).ready(function(){
  $('form#new-doughnut').on('submit', sendOurDataViaAJAX)
  getDoughnuts();
});

function sendOurDataViaAJAX(e){
  e.preventDefault();

  // our API uses JSON, so we need to make a javascript object! There are a lot of ways to do this, this just a basic example.
  var doughnut = {
    style: $('form#new-doughnut select#doughnut-style').val(),
    flavor: $('form#new-doughnut input#doughnut-flavor').val()
  };

  // create a new AJAX request
  $.post('https://api.doughnuts.ga/doughnuts', doughnut)
    .done(function(data){
      addDoughnut(data);
    });

  // clear our input box!
  $('form#new-doughnut input#doughnut-flavor').val(null)
}

function getDoughnuts(){
  var doughnuts = $.get('https://api.doughnuts.ga/doughnuts')
    .done(function(data){
      $.each(data, function(index, doughnut){
        addDoughnut(doughnut);
      });
    });
}

function addDoughnut(doughnut) {
  $("ul#doughnuts").prepend("<li>" + doughnut.flavor + " - <em>" + doughnut.style + "</em></li>")
}