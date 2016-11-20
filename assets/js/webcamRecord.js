$(function() {
    	Webcam.attach( '#container' )
    });

    Webcam.on('live', function(){
    	var intervalID = setInterval(function() {
        	take_snapshot();
    	}, 3000);
    	setTimeout(function() {
        	clearInterval(intervalID);
    	}, 3000);
	});

    var analyze = function(data_url) {
        
        var params = {
            // Request parameters
            // Empty parameters
        };
      	
        $.ajax({
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c52339aa40b14a439016260018edec3d");
            },
            type: "POST",
            // Request body
            data: '{"url": ' + data_url + '}',
            processData: false
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    }

    function take_snapshot() {
        Webcam.snap( function(data_uri) {
        	
        	Webcam.upload( data_uri, 'myscript.php');
        	data_url = "https://portalstoragewuprod2.azureedge.net/emotion/recognition2.jpg";
        	analyze(data_uri);
        });
    }