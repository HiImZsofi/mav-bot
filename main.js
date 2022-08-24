/*$('#b1').click(function(){
>>>>>>> main
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


/*$( document ).ready(function() {
    $.ajax({
		type: "GET",
		url: "http://apiv2.oroszi.net/elvira/maps",
		dataType: "json",
		data: {
			train_number: "5568"
		},
		success: function( data ){
			alert( data.delay );
            console.log(data);
		}
	});
});*/

$( document ).ready(function() {
    for (let i = 1; i <= 40000; i++) {
        $.ajax({
            type: "GET",
            url: "http://apiv2.oroszi.net/elvira/maps",
            dataType: "json",
            data:{
                train_number: "55"+i
            },
        success: function(data){
            console.log(data[i].train_number+"\n"+data[i].delay);
        }
        })
    }
});