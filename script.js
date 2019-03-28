$(document).ready(function () {




    $.getJSON("./databas.json", function (data) {
            /* console.log(data.products) */
            $.each(data.products, function (key, value) { //hämta alla produkter
                //lägg till produkterna med beskrivning,namn,pris
                $('.product-holder').append(`                   
                <div class="card">
                <img class="card-img-top" <img src="${value.img}" id="${key}" alt="${key} image">
                <div class="card-body">
                    <h4 class="card-title">${key}</h4>
                    <p class="card-text">${value.price} kr</p>
                    <div id="${value.id}" class="fruitBtn btn btn-primary">Lägg till i varukorgen</div>
                    </div>
                    </div>`

                )
            });
        }


    );
    setTimeout(function () {
        // let buttons = document.getElementsByClassName("fruitBtn");
        let list = "";
        let price = 0;
        let items = 0;
        $.getJSON("./databas.json", function (data) {
            let cart = [];
            console.log(data.products.apple.id);
            $.each(data.products, function (key, value) {
                $(`#${value.id}`).on("click", function () {

                    if (this.id == value.id) {
                        cart.push(key, value);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        console.log(JSON.parse(localStorage.getItem("cart")));
                        list += "<li class = 'list-group-item' >" + key + "</li>";
                        items = cart.length / 2;
                        $("#items").html(items);
                        price += value.price;
                        $("#price").html(price);


                    }
                })



            })
        });
        let cartIsClicked = false;
        $("#shoppingCartImg").on("click", function () {
            if (cartIsClicked === false) {
                document.getElementById("aside").style = `
            transition: 1500ms;
            width: 85vw;
            height: 85vh;
            position: fixed;
            top: 7.5vh;
            left: 7.5vw;
            `;
                cartIsClicked = true;
                $("#cart").append(list);
            } else {

                document.getElementById("aside").style = `
            transition: 1500ms;
            width: 20 vw;
            height: 45 vh;
            position: fixed;
            top: 10 vh;
            left: 75 vw;
            `;
                cartIsClicked = false;
                $("#cart").html(`<li class="list-group-item">Items <span id="items">${items}</span></li>
                    <li class="list-group-item">Price <span id="price">${price}</span></li>`);
            }
        });

    }, 15)








})