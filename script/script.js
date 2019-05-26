$(document).ready(function () {
    let checkoutItems = []; // local store of products - without looking through html
    const priceProduct1 = "10.40"
    const priceProduct2 = "15.40"
    const priceProduct3 = "25.40"
    const priceProduct4 = "35.40"

    /*/ click function for first product */
    $('#addProduct1ToCart').click(function (event) {
        var textForContent = 'Nikon camera';
        var productId = "1"
        var newHTMLContent = createListItem(textForContent, "https://www.nikon.de/imported/images/web/EU/products/digital-cameras/dslr/hero_ppdd_updated/nikon_dslr_d810_black_front--original.png", priceProduct1, productId, 1);
        addToCartClick(productId, priceProduct1, newHTMLContent)
    });

    $('#addProduct2ToCart').click(function (event) {
        var textForContent = 'Nikon Flash';
        var productId = "2"
        var newHTMLContent = createListItem(textForContent, "https://www.nikon.de/tmp/EU/2419865273/3760176746/2327365364/27184057/1391280926/2780083465/688362553/957329130/3489939240.png", priceProduct2, productId, 1);
        addToCartClick(productId, priceProduct2, newHTMLContent)
    });
    $('#addProduct3ToCart').click(function (event) {
        var textForContent = 'Nikon Flash';
        var productId = "3"
        var newHTMLContent = createListItem(textForContent, "https://www.nikon.de/tmp/EU/2419865273/3760176746/2327365364/27184057/1391280926/2780083465/688362553/957329130/3489939240.png", priceProduct3, productId, 1);
        addToCartClick(productId, priceProduct3, newHTMLContent)
    });
    $('#addProduct4ToCart').click(function (event) {
        var textForContent = 'Nikon Flash';
        var productId = "4"
        var newHTMLContent = createListItem(textForContent, "https://www.nikon.de/tmp/EU/2419865273/3760176746/2327365364/27184057/1391280926/2780083465/688362553/957329130/3489939240.png", priceProduct4, productId, 1);
        addToCartClick(productId, priceProduct4, newHTMLContent)
    });

    function addToCartClick(productId, price, htmlContent) {
        var container = $('.js-add-content');
        var idFound = false;
        var amount = 1;


        checkoutItems.forEach(checkoutItem => {
            if (checkoutItem.id === productId) {
                idFound = true;
                amount = amount + 1;
            }
        });
        if (idFound) {
            checkoutItems = checkoutItems.concat([{ id: productId, price: price }]);
            const amountId = "#" + productId + "amount"
            $(amountId).text(amount);
        }

        else {
            container.append(htmlContent);
            checkoutItems = checkoutItems.concat([{ id: productId, price: price }]);
        }
        calculatePriceSum()
        $(".cart").fadeIn("fast");
    }

    $(document).on('click', '#listItem1 .plusButton1', function (event) {
        addToCheckout("1", priceProduct1)

    });
    $(document).on('click', '#listItem2 .plusButton2', function (event) {
        addToCheckout("2", priceProduct2)

    });
    $(document).on('click', '#listItem3 .plusButton3', function (event) {
        addToCheckout("3", priceProduct2)

    });
    $(document).on('click', '#listItem4 .plusButton4', function (event) {
        addToCheckout("4", priceProduct2)

    });
    $(document).on('click', '#listItem1 .minusButton1', function (event) {
        var productId = "1"
        removeFromCheckout(productId)
    });
    $(document).on('click', '#listItem2 .minusButton2', function (event) {
        var productId = "2"
        removeFromCheckout(productId)
    });
    $(document).on('click', '#listItem3 .minusButton3', function (event) {
        var productId = "3"
        removeFromCheckout(productId)
    });
    $(document).on('click', '#listItem4 .minusButton4', function (event) {
        var productId = "4"
        removeFromCheckout(productId)
    });

    function calculatePriceSum() {
        var sum = 0;
        checkoutItems.forEach(checkoutItem => {
            sum = sum + parseFloat(checkoutItem.price)
        })
        $(priceSum).text("Total Price: " + Math.round(sum * 100) / 100 + " chf");
        /* animation of total cost*/
        $(priceSum).addClass('addToCart');
        setTimeout(function () {
            $(priceSum).removeClass('addToCart');
        }, 1000);
    }

    function addToCheckout(productId, price) {
        const amountId = "#" + productId + "amount";
        var amount = $(amountId).text();
        intAmount = parseInt(amount);
        intAmount = intAmount + 1;
        $(amountId).text(intAmount);
        checkoutItems = checkoutItems.concat([{ id: productId, price: price }]);
        calculatePriceSum()
    }

    function removeFromCheckout(productId) {
        const amountId = "#" + productId + "amount";
        var amount = $(amountId).text();
        intAmount = parseInt(amount);
        if (intAmount > 1) {
            intAmount = intAmount - 1;
            $(amountId).text(intAmount);
            var newb = []
            var firstRemoved = false;
            for (var i = checkoutItems.length - 1; i >= 0; i--) {
                if (checkoutItems[i].id !== productId || firstRemoved) {
                    newb = newb.concat([checkoutItems[i]]);
                }
                else {
                    firstRemoved = true;
                }
            }
            checkoutItems = newb;
        }
        else {
            const itemToRemove = "#listItem" + productId
            var newb = []
            var firstRemoved = false;
            for (var i = checkoutItems.length - 1; i >= 0; i--) {
                if (checkoutItems[i].id !== productId || firstRemoved) {
                    newb = newb.concat([checkoutItems[i]]);
                }
                else {
                    firstRemoved = true;
                }
            }
            checkoutItems = newb;
            $(itemToRemove).remove()
        }
        calculatePriceSum()
    }

    // find way to put in product id
    function createListItem(text, imageSource, price, productId, amount) {
        const amountId = productId + "amount"
        const plusButtonClass = "plusButton" + productId;
        const minusButtonClass = "minusButton" + productId;
        const listItemId = "listItem" + productId;
        return `
        <li id=${listItemId}>
        <div class="shoppingLayout">
            <div>
                <img class="imgSizeList" src=${imageSource}> </img>
            </div>
    
            <div class="textSignsAmountWrap">
                <div>
                    <p class="descriptionStyle"> ${text} </p>
                </div>
                <div class="signsPriceAlign">
                    <div class="minusPlusAmount">
                        <button class="plusMinusStyle ${minusButtonClass}"> - </button>
                        <p class="amountStyle" id=${amountId}> ${amount} </p>
                        <button class="plusMinusStyle ${plusButtonClass}"> + </button>
                    </div>
    
    
                </div>
            </div>
            <div class="minusPlusAmount">
                <p class="descriptionStyle"> ${price} chf </p>
                <div></div>
            </div>
        </div>
        <hr>
    </li>
    `
    }

    (function () {

        $("#clickCart").on("click", function () {
            $(".cart").fadeToggle("fast");
        });

    })();

});