$( document ).ready(function() {

    $.ajax({
   
        url: "http://localhost:3000/sortUser",
        type: "get",
        success: function(data){
            console.log(data);
            $("#t").append("<thead><th>User</th><th>Score</th></thead>");
            $.each(data, function(key,value){
                console.log(value.username+"--->"+value.score);
                $("#t").append("<tr><td>"+value.username+"</td><td>"+value.score+"</td></tr>")
            });
            
        }
    });



});