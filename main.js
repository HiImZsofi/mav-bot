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