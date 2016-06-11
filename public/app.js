function getResults(){
  $('#comments').empty();
  $.getJSON('/all', function(data) {
    for (var i = 0; i<data.length; i++){
      $('#comments').prepend('<p id="dataentry" data-id=' +data[i]._id+ '>' + data[i].title + '<span class=deleter>X</span></p>');
    }
  });
}

getResults();

$('#makenew').on('click', function(){
  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/submit',
    data: {
      Articles: $('#title').val(),
      Comments: $('#comments').val(),
      created: Date.now()
    }
  })
  .done(function(data){
    $('#title').prepend('<p id="dataentry" data-id=' +data._id+ '>' + data.title + '<span class=deleter>X</span></p>');
    $('#comments').val("");
    $('#title').val("");
  }
  );
});

$('#clearall').on('click', function(){
  $.ajax({
    type: "GET",
    dataType: "json",
    url: '/clearall',
    success: function(response){
      console.log(response);
      $('#comments').empty();
    }
  });
});


$(document).on('click', '.deleter', function(){
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: '/delete/' + selected.data('id'),
    success: function(response){
      console.log(response);
      selected.remove();
    }
  });
});


$(document).on('click', '#dataentry', function(){
  var selected = $(this);
  console.log(selected);
  $.ajax({
    type: "GET",
    url: '/find/' + selected.data('id'),
    success: function(data){
      $('#comments').val(data.comments);
      $('#title').val(data.title);
      $('#actionbutton').html('<button id="updater" data-id="'+ data._id +'">Update</button>');
    }
  });
});

$(document).on('click', '#updater', function(){
  var selected = $(this);
  console.log(selected);
  $.ajax({
    type: "POST",
    url: '/update/' + selected.data('id'),
    dataType:"json",
    data: {
      title: $('#title').val(),
      comments: $('#comments').val()
    },
    success: function(data){
      $('#comments').val("");
      $('#title').val("");
      $('#actionbutton').html('<button id="makenew">Submit</button>');
      getResults();
    }
  });
});