$(document).ready(function () {




    $.getJSON("./databas.json", function (data) {
            /* console.log(data.products) */
            $.each(data.products, function (key, value) {      //hämta alla produkter
                                                                //lägg till produkterna med beskrivning,namn,pris
                $('.product-holder').append(`                   
             <div class="card" style="width:200px;height:300px">
                <img class="card-img-top" <img src="${value.img}" id="${key}" alt="${key} image">
                <div class="card-body">
                    <h4 class="card-title">${key}</h4>
                    <p class="card-text">${value.price} kr</p>
                    <a href="#" class="btn btn-primary">Lägg till i varukorgen</a>
                  </div>
                </div>`

                )
            });
        }

    );



})

