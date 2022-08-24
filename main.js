$('#b1').click(function(){
    console.log("clicked");
	$.ajax({
		type: "GET",
		url: "http://apiv2.oroszi.net/elvira",
		dataType: "json",
		data: {
			from: "budapest",
			to: "miskolc"
		},
		success: function( data ){
			alert( data.route );
            console.log(data);
		}
	});

});

function delays() {
		for (let i = 1; i <= 40000; i++) {
	        $.ajax({
	            type: "GET",
	            url: "http://apiv2.oroszi.net/elvira/maps",
	            dataType: "json",
	            data:{
	            },
	        success: function(data){
				if(data[i]!==undefined){ 
					console.log(data[i].train_number+"\n"+data[i].delay);
				}
				}
	        })
	    }
	}


// try{
// $( document ).ready(function() {
//     for (let i = 1; i <= 40000; i++) {
//         $.ajax({
//             type: "GET",
//             url: "http://apiv2.oroszi.net/elvira/maps",
//             dataType: "json",
//             data:{
//                 train_number: "55"+i
//             },
//         success: function(data){
//             console.log(data[i].train_number+"\n"+data[i].delay);
//         }
//         })
//     }
// })
// }
// catch{

// }


