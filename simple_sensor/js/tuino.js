
var main_interval;

// WebSocket Part

$(document).ready(function(){

			var ws = new WebSocket('ws://beta.giotty.com:15674/ws');
    		var client = Stomp.over(ws);

    		var on_connect = function() {

                // listen on queue for sensor_id data
    			id = client.subscribe("/exchange/logs/*."+sensor_id, function(message){

    				data = JSON.parse(message.body);
    				console.log( data );

    				// flash receive LED
    				led1.on();
					setTimeout(function(){ led1.off(); }, 500); 
					// start countdown for UI
					clearInterval( main_interval );
					clock_ticks = initial_clock_ticks;
					main_interval = setInterval( function(){ updateClockTicks() } , 1000);


					lora_data = parseInt(data.f_payload_deciphered, 16);
					console.log( lora_data );
					if ( data.f_payload_deciphered == 0x01)
						led_light.on();
					else
						led_light.off();
				});

    		}

    		var on_error =  function() {
    		    console.log('error');
    		};

    		client.connect(auth_token, '', on_connect, on_error, 'user_'+user_id);

});