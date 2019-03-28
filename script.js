$(document).ready(function(){




$.getJSON("./databas.json", function (data) {
        console.log(data.products.apple)
    }


);



})