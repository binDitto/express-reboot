$(function(){

  // get cities object using /cities params
  $.get('/cities', appendToList);

  // listening for click on delete button
  $('.city-list').on('click', 'a[data-city]', function(event){

    if(!confirm('Are you sure?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax(
        type: 'DELETE',
        url: '/cities/' + target.data('city');
        })
        .done(function(){

          target.parents('li').remove();

        });



  });

  // this function appends li's with links to the ul in the index.html file
  function appendToList(cities) {
    var list = [];
    var content, city;

    for(var i in cities){
      city = cities[i];
      content = '<a href="/cities/'+city+'">'+city+'</a>' +
                '<a href="#" data-city="'+city+'"><i class='fa fa-times'></i></a>';
                // ^adds delete button
      list.push($('<li>', { html: content }));

    }
    $('.city-list').append(list);
  }

  //submit form using ajax
  $('form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);
    var cityData = form.serialize();

    $.ajax({
      type: 'POST',
      url: '/cities',
      data: cityData
    })
    .done(function(cityName){
        appendToList([cityName]);
        form.trigger('reset');
    });

  });
});
