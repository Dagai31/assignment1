// const { contentType } = require("express/lib/response");

// const { response } = require("express");

$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('tbody#namebody');
            tbodyEl.html('');
            response.tweets.forEach(function(tweet) {
              tbodyEl.append('\
              <tr>\
                <td class="id">' + tweet.id + '</td>\
                <td class="name">' + tweet.screen_name + '</td>\
                <td class="screen_name">' + tweet.name + '</td>\
              </tr>\
            ');
                       
          });
          console.log(response);
          }
        });
    });
	
    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('tbody#tweetbody');
            tbodyEl.html('');
            response.tweetinfo.forEach(function(tweet) {
              tbodyEl.append('\
              <tr>\
                <td class="id">' + tweet.id + '</td>\
                <td class="name">' + tweet.text + '</td>\
                <td class="screen_name">' + tweet.created_at + '</td>\
              </tr>\
            ');
                       
          });
          console.log(response);
          }
        });
    });

	
   //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
          url: '/searchinfo',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('tbody#searchbody');
            tbodyEl.html('');
            response.searchinfo.forEach(function(tweet) {
              tbodyEl.append('\
              <tr>\
                <td class="id">' + tweet.id + '</td>\
                <td class="name">' + tweet.text + '</td>\
                <td class="screen_name">' + tweet.created_at + '</td>\
              </tr>\
            ');
                       
          });
          console.log(response);
          }
        });
    });

	
	  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');

        //TODO: creat a tweet
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({id: createInput.val().split(';')[0], text: createInput.val().split(';')[1]}),
          success: function(response){
            console.log(response);
            createInput.val('');
            // const parsedStrings = createInput.split(';');
            // var id = parsedStrings[0];
            // var tweet = parsedStrings[1];
            $('#get-button').click();
          }

        });
  });
             	
	
	  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a user
    $.ajax({
      url: '/tweets/:nm',
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({newName: newName}),
          success: function(response){
            console.log(response);
            $('#get-button').click();
          }
    });

  });

	
  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input');
    event.preventDefault();
    //TODO: delete a tweet
    $.ajax({
      url: '/tweetinfo/'+id,
          method: 'DELETE',
          contentType: 'application/json',
          success: function(response){
            console.log(response);
            $('#get-button').click();
          }
    });

  });

});

function test_print(){

         console.log(“test code”)

}
