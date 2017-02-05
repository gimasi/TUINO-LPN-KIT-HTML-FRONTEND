

var main_interval;
var lora_byte_stream=[];
var i,j;


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


					// clear flashing light interval
					clearInterval( interval_main_light );
				
					// build lora byte array
					for (i=0,j=0;i<data.f_payload_deciphered.length;i+=2,j++) {
							lora_byte_stream[j] = parseInt(data.f_payload_deciphered.substring(i,i+2), 16); 
					}

					
					
					console.log( lora_byte_stream );
					if (lora_byte_stream[0] == 0x02 ) {
						var temperature;

						// read sensor temperature
						temperature = lora_byte_stream[1] << 8;
						temperature = temperature + lora_byte_stream[2];
					
						temp_scale.setValue(temperature/100 ); 

						console.log( temperature  );

						// read thermostat temperature
						temperature = lora_byte_stream[5] << 8;
						temperature = temperature + lora_byte_stream[6];
				
						if ( temperature == 0 )
							$("#box_temperature").html( "--");
						else
							$("#box_temperature").html( temperature/100);

						console.log( temperature  );


						if ( lora_byte_stream[3] == 0x01 )
							led_light.value = 1;
						else
							led_light.value = 0;
							

						if ( lora_byte_stream[4] == 0x01 )
							sw1.value = 1;
						else
							sw1.value = 0;


					}

				

				});

    		}

    		var on_error =  function() {
    		    console.log('error');
    		};

    		client.connect(auth_token, '', on_connect, on_error, 'user_'+user_id);

});