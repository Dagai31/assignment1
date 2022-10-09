var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
//app.set('view engine', 'ejs');
var fs = require('fs');
const { networkInterfaces } = require('os');

//global variable for tweet data
var tweetinfo = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse( data );
  }
});
 

//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  var tweets = [];
  tweetinfo.forEach(function(obj) { 
    tweets.push(obj.user); 
  });

  //console.log(userIDs);
  res.send({tweets: tweets});
  
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  //console.log( tweetinfo );
  res.send({ tweetinfo: tweetinfo });
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  var searchinfo = [];
  tweetinfo.forEach(function(obj) { 
    searchinfo.push(obj); 
  });

  //console.log(userIDs);
  res.send({searchinfo: searchinfo});
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  var tweetid = req.body.id;
  var tweettxt = req.body.text;
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  // var sec = "";
  // if(Number(today.getSeconds())<10){sec = "0" + today.getSeconds()};
  var today = new Date();
  var date = weekday[Number(today.getDay())] + ' ' + today.getMonth() + ' ' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ' +0000 ' + today.getTimezoneOffset() + ' ' +today.getFullYear();
  var dateTime = date+' '+time;

  tweetinfo.push({
    id: tweetid,
    text: tweettxt,
    created_at: dateTime
  })
  res.send(tweetinfo);
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
	var tweetid = req.body.id;

	/*
	var searchField = $('#search').id;
	var expression = new req.body.text;
	//var searchIndex = new 
	
	formData.append('tweetMessage', searchField);
	var char = new XMLHttpRequest();
	if(tweet == ''){
		alert('Is empty. Write something.');
		return;
	}
	else{
		res.open('POST', url, true);
		res.setRequestHeader('Content-Type', 'application/json');
	}
	
	*/
	
//var id = req.params.tweetid;
  var found = true;

  searchtinfo.forEach(function(obj, index){
    if(found && obj.id == Number(id)){
     
    }
  });
  res.send(searchinfo);

});
	
	
	
	res.send();
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //var user = tweetinfo["user" + req.params.id]
  //TODO: update tweets
  var tweetnm = req.body.name;
  var newnm = req.body.newName;
  var found = false;

  tweetinfo.forEach(function(obj){
    if(!found && obj.user.name == tweetnm){
      obj.user.screen_name = newnm;
    }
  });
  res.send("Successful tweet update!");
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var id = req.params.tweetid;
  var found = false;

  tweetinfo.forEach(function(obj, index){
    if(!found && obj.id == Number(id)){
      tweetinfo.splice(index,1);
    }
  });
  res.send("Successful tweet delete!");

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});
