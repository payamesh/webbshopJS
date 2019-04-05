
$(document).ready(function () {
    (function () {
        'use strict';
        window.addEventListener('load', function () {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.stopPropagation();
                    }
                    event.preventDefault();
                    form.classList.add('was-validated');
                    $(this).hide(2000)
                    $('.submitDone').show(2000);

                }, false);
            });
        }, false);
    }
    )();
    let cartObject = {};
    let totalprice= 0;
    cartObject = JSON.parse(localStorage.getItem('cartObject'));
    
    $.getJSON("./databas.json", function (data) {
        
        $.each(cartObject, function (key, value) {
            // data.products[key].name
            
            
            
            let productTotalPrice= data.products[key].price * cartObject[key].amount

            totalprice += productTotalPrice;
            $(".bought-products").append(`                   
            <div class="card-checkout">
            <img class="card-img-top img-order" <img src="${data.products[key].img}"  alt="${data.products[key]} image">
                <div class="card-body">
                <h4 class="card-title">${data.products[key].name}</h4>
                <p class="card-text">${data.products[key].price}kr/st</p>
                <p class="card-text">Antal: ${cartObject[key].amount} </p>
                <p class="card-text">Totalt: ${productTotalPrice} kr </p>
                
                </div>
                </div>`);
                
            })

            $('#totalPrice').append(`Total price: ${totalprice} kr`);
            
        });

})
