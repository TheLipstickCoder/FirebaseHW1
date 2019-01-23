$(document).ready(function(){
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAtFML-hmDzKdbUixONZz64hYES1ISVILE",
    authDomain: "jan-16.firebaseapp.com",
    databaseURL: "https://jan-16.firebaseio.com",
    projectId: "jan-16",
    storageBucket: "jan-16.appspot.com",
    messagingSenderId: "448032812603"
  };

  firebase.initializeApp(config);
  
//refers to firebase data
  var dataRef = firebase.database();

  //click event
  $('#addTrain').on('click', function(){

  var trainName = $('#trainName').val().trim();
  var destination = $('#destination').val().trim();
  var firstTime = $('#firstTime').val().trim();
  var frequency = $('#frequency').val().trim();

    var databaseInfo = {
        name: trainName,
        destination: destination,
        time: firstTime,
        frequency: frequency
    };

    dataRef.ref().push(databaseInfo);

    
    
    dataRef.ref().on('child_added', function(childSnapshot) {
        //this required lots of google, Stack Overflow. These vars use the keys from the object above to use the date at that time from the Firebase database.
        var dbName = childSnapshot.val().name;
        var dbDestination = childSnapshot.val().destination;
        var dbTime = childSnapshot.val().time;
        var dbFrequency = childSnapshot.val().frequency;
        
        //these vars store the momentJS time data. referred to multiple other repos to come up with a method that makes sense to me for my code
        var difference = moment().diff(moment.unix(dbTime), 'minutes');
        var timeMod =  moment().diff(moment.unix(dbTime), 'minutes') % dbFrequency;
        var mins = dbFrequency - timeMod;
        
        var nextArr = moment().add(mins, 'm').format('hh:mm');

        console.log(dbName);
        console.log(dbDestination);
        console.log(dbTime);
        console.log(dbFrequency);
        console.log(difference);
        console.log(timeMod);
        console.log(nextArr);
        
        //appending time to table
        $('tableHead').append('<tr><td>' + dbName + '</td><td>' + dbDestination + '</td><td>' + dbFrequency + '</td><td>' + nextArr + '</td><td>' + mins + '</td></tr>')
        

    });

  });

});