$(document).ready(function () {
    $.getJSON("./databas.json", function (data) {

        $.each(data.products, function (key, value) {
            //hämta alla produkter
            //lägg till produkterna med beskrivning,namn,pris
            $(".product-holder").append(`                   
            <div class="card">
            <img class="card-img-top" <img src="${value.img}"  alt="${key} image">
                <div class="card-body">
                <h4 class="card-title">${key}</h4>
                <p class="card-text">${value.price} kr</p>
                <div id="${key}" class="fruitBtn btn btn-primary">Lägg till i varukorgen</div>
                </div>
                </div>`);
        });
    });

    let list = "";
    let price = 0;
    let item = 0;
    let cartObject = {
        empty: "empty",
        amount: 0,
    };


    //this should update the cartObject. Here I only hawto use the cart and the ui.
    function updateCart() {

        let localCart = JSON.parse(localStorage.getItem("cartObject"));

        let li = $("li");
        for (let i = 2; i < li.length; i++) {
            li[i].remove()
        }
        //uppdates the "fysical" cart
        $.each(localCart, function (key, value) {
            console.log(value.name);
            $("#cart").append("<li>" + value.name);
        });
        //styles the fysical cart.
        $.each(localCart, function (key, value) {

            $("li").attr("class", "list-group-item");
        });

    }

    //set time out initated becose all variables need to be loaded before the script starts
    setTimeout(function () {
        //Gets the json object
        $.getJSON("./databas.json", function (data) {

            $.each(data.products, function (key, value) {

                $(`#${key}`).on("click", function () {

                    console.log(cartObject[key] === undefined);
                    if (this.id == key) {
                        if (cartObject[key] === undefined) {
                            cartObject[key] = {
                                name: value.name,
                                amount: 1
                            }
                        } else {
                            cartObject[key].amount += 1;
                        }
                        console.log(cartObject);


                        // cartObject += JSON.parse(localStorage.getItem("cartObject"));
                        localStorage.setItem("cartObject", JSON.stringify(cartObject));
                        updateCart();
                    }
                });
            });
            if (cartObject.empty === "empty") {
                cartObject = {};
            } else {
                cartObject = localStorage.getItem("cartObject");
            }

            updateCart();
        });

        //onlick for the shoping cart, sets all of the values.
        let cartIsClicked = false;
        $("#shoppingCartImg").on("click", function () {
            if (cartIsClicked === false) {
                document.getElementById("aside").style = `
            transition: 1500ms;
            width: 85vw;
            height: 85vh;
            position: absolute;
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
                setTimeout(function () {
                    let listOfFruits = document.getElementsByClassName("list-fruits");
                    for (let i = 0; i < listOfFruits.length; i++) {
                        listOfFruits[i].style.display = "none";
                    }
                }, 1500);
            }
        });
    }, 15);

});