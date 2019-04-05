$(document).ready(function() {
  $.getJSON("./databas.json", function(data) {
    $.each(data.products, function(key, value) {
      //hämta alla produkter
      //lägg till produkterna med beskrivning,namn,pris
      $(".product-holder").append(`                   
            <div class="card">
            <img class="card-img-top img-shop" <img class="img-shop" src="${
              value.img
            }"  alt="${key} image">
            <div class="card-body">
            <h4 class="card-title">${value.name}</h4>
            <p class="card-text">${value.price} kr</p>
            <div id="${key}" class="fruitBtn btn btn-primary">Lägg till i varukorgen</div>
            </div>
            </div>`);
    });
  });
  let visableCart = "";
  let list = "";
  let price = 0;
  let items = 0;
  let cartIsUpToDate = false;
  let cartIsClicked = false;

  let cartObject = {};
  //this should update the cartObject. Here I only hawto use the cart and the ui.
  function updateCart() {
    //visabel cart items is used to show and hide the items in the cart.
    cartObject = JSON.parse(localStorage.getItem("cartObject"));
    let li = $("li");
    for (let i = 2; i < li.length; i++) {
      li[i].remove();
    }
    //uppdates the "fysical" cart

    $.each(cartObject, function(key, value) {
      $("#cart").append(
        "<li> <div>" +
          value.name +
          `<span id='times${key}'> times: ${value.amount} </span>` +
          `<span class="minus" id='minus${key}'>-</span> <span class="plus" id='plus${key}'>+</span> </div>`
      );
    });
    //styles the fysical cart.
    $.each(cartObject, function(key, value) {
      $("li").attr("class", "list-group-item");
    });

    if (cartIsUpToDate === false) {
      //Counts all of the items ant the total price.
      $.each(cartObject, function(key, value) {
        items += value.amount;
        price += value.price;
      });
      cartIsUpToDate = true;
      //sets the items inside of the cart
      $("#items").html(items);
      $("#price").html(price + " kr");
    }
    visableCart = document.getElementsByClassName("list-group-item");
    if (cartIsClicked === false) {
      for (let i = 2; i < visableCart.length; i++) {
        visableCart[i].style.display = "none";
      }
    }
  }

  //set time out initated becose all variables need to be loaded before the script starts
  setTimeout(function() {
    //Gets the json object
    $.getJSON("./databas.json", function(data) {
      $.each(data.products, function(key, value) {
        $(`#${key}`).on("click", function() {
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
              $("#price").html(price + " kr");
            } else {
              cartObject[key].amount += 1;
              cartObject[key].price += value.price;
              console.log(items);
              items++;
              price += value.price;
              $("#items").html(items);
              $("#price").html(price + " kr");
            }

            localStorage.setItem("cartObject", JSON.stringify(cartObject));
            updateCart();
          }
        });
      });

      updateCart();
    });
    //onlick for the shoping cart, sets all of the values.
    $("#shoppingCartImg").on("click", function() {
      //Here the onlick for plus and minus is created.
      let plusBtns = document.getElementsByClassName("plus");

      $.each(plusBtns, function(key, value) {
        $(value).on("click", function() {
          let that = this;
          $.each(cartObject, function(cartKey, cartValue) {
            if (that.id == "plus" + cartKey) {
              cartValue.amount++;
              document.getElementById("times" + cartKey).innerHTML =
                " times: " + cartObject[cartKey].amount;
            }

            localStorage.setItem("cartObject", JSON.stringify(cartObject));
          });
        });
      });

      //Minus knappen

      let minusBtns = document.getElementsByClassName("minus");
      $.each(minusBtns, function(key, value) {
        $(value).on("click", function() {
          let that = this;
          $.each(cartObject, function(cartKey, cartValue) {
            if (that.id == "minus" + cartKey) {
              if (cartValue.amount > 0) {
                cartValue.amount--;
                document.getElementById("times" + cartKey).innerHTML =
                  " times: " + cartObject[cartKey].amount;
              }
            }

            localStorage.setItem("cartObject", JSON.stringify(cartObject));
          });
        });
      });

      if (cartIsClicked === false) {
        cartIsClicked = true;
        document.getElementById("aside").style = `
            transition: 1500ms;
            width: 85vw;
            height: 85vh;
            position: absolute;
            top: 7.5vh;
            left: 7.5vw;
            `;
        //makes the cart visable
        if (cartIsClicked === true) {
          setTimeout(function() {
            for (let i = 2; i < visableCart.length; i++) {
              visableCart[i].style.display = "block";
            }
          }, 1500);
        }
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
        // visableCart.style = "transition: 1500ms;";

        setTimeout(function() {
          for (let i = 2; i < visableCart.length; i++) {
            visableCart[i].style.display = "none";
          }

          cartIsClicked = false;
        }, 1000);
      }
    });
  }, 15);
});
