    var socket = io('http://localhost:3000');
    socket.on('error', function (reason){
        console.error('Unable to connect Socket.IO', reason);
    });
    socket.on('connect', function (){
        console.info('Connected');
    });
    socket.on("event", function (data){
        console.log(data);
		
		
	    var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
	
	    // Add some text to the new cells:
        cell1.innerHTML = data.groupName;
        cell2.innerHTML = data.evenType;
   
 
	
    });