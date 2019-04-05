$(document).ready(function () {
  $.getJSON("./databas.json", function (data) {
    $.each(data.products, function (key, value) {
      //hämta alla produkter
      //lägg till produkterna med beskrivning,namn,pris
      $(".product-holder").append(`                   
            <div class="card">
            <img class="card-img-top img-shop" <img class="img-shop" src="${
              value.img
            }"  alt="${key} image">
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
  let items = 0;
  let cartIsUpToDate = false;

  let cartObject = {};
  //this should update the cartObject. Here I only hawto use the cart and the ui.
  function updateCart() {
    cartObject = JSON.parse(localStorage.getItem("cartObject"));
    let li = $("li");
    for (let i = 2; i < li.length; i++) {
      li[i].remove();
    }
    //uppdates the "fysical" cart
    $.each(cartObject, function (key, value) {
      $("#cart").append("<li>" + value.name);
    });
    //styles the fysical cart.
    $.each(cartObject, function (key, value) {
      $("li").attr("class", "list-group-item");
    });

    if (cartIsUpToDate === false) {
      //Counts all of the items ant the total price.
      $.each(cartObject, function (key, value) {
        items += value.amount;
        price += value.price;
      });
      cartIsUpToDate = true;
      //sets the items inside of the cart
      $("#items").html(items);
      $("#price").html(price);
    }
  }

  //set time out initated becose all variables need to be loaded before the script starts
  setTimeout(function () {
    //Gets the json object
    $.getJSON("./databas.json", function (data) {
      $.each(data.products, function (key, value) {
        $(`#${key}`).on("click", function () {
          //cartObject === null handles the situation where the cart has not yet been declared.
          if (cartObject === null) {
            cartObject = {};
          }
          if (this.id == key) {
            if (cartObject[key] === undefined) {
              cartObject[key] = {
                name: value.name,
                amount: 1,
                price: value.price,
                img: value.img
              };
              price += value.price;
              items++;
              $("#items").html(items);
              $("#price").html(price);
            } else {
              cartObject[key].amount += 1;
              cartObject[key].price += value.price;
              console.log(items);
              items++;
              price += value.price;
              $("#items").html(items);
              $("#price").html(price);
            }

            localStorage.setItem("cartObject", JSON.stringify(cartObject));
            updateCart();
          }
        });
      });

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