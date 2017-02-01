
var main_interval;
var lora_byte_stream=[];
var i,j;


// WebSocket Part
$(document).ready(function(){

			var ws = new WebSocket('ws://beta.giotty.com:15674/ws');
    		var client = Stomp.over(ws);

    		var on_connect = function() {

    			id = client.subscribe("/exchange/logs/*.*", function(message){
				

    				data = JSON.parse(message.body);
    				console.log( data );

    				// flash receive LED
    				led1.on();
					setTimeout(function(){ led1.off(); }, 500); 
					// start countdown for UI
					clearInterval( main_interval );
					clock_ticks = 30;
					main_interval = setInterval( function(){ updateClockTicks() } , 1000);


					// build lora byte array
					for (i=0,j=0;i<data.f_payload_deciphered.length;i+=2,j++) {
							lora_byte_stream[j] = parseInt(data.f_payload_deciphered.substring(i,i+2), 16); 
					}

					
					
					console.log( lora_byte_stream );
					if (lora_byte_stream[0] == 0x01 ) {
						var temperature;

						
						temperature = lora_byte_stream[1] << 8;
						temperature = temperature + lora_byte_stream[2];
					
						temp_scale.setValue(temperature/100 ); 

						$("#box_temperature").html( temperature/100);
						console.log( temperature/100 );


					}

				

				});

				console.log( id );

    		}

    		var on_error =  function() {
    		    console.log('error');
    		};

    		client.connect(auth_token, '', on_connect, on_error, 'user_'+user_id);


});