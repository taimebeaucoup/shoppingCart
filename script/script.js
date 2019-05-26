$(document).ready(function () {
    let checkoutItems = []; // local store of products - without looking through html
    const priceProduct1 = "10.40"
    const priceProduct2 = "15.40"

    /*/ click function for first product */
    $('#addProduct1ToCart').click(function (event) {
        var productId = "1";
        var container = $('.js-add-content');
        var textForContent = 'Nikon cam :) ';
        var idFound = false;
        var amount = 1;
        var newHTMLContent = createListItem(textForContent, "https://www.nikon.de/imported/images/web/EU/products/digital-cameras/dslr/hero_ppdd_updated/nikon_dslr_d810_black_front--original.png", priceProduct1, productId, amount);

        /* check if item is already in checkout*/
        checkoutItems.forEach(checkoutItem => {
            if (checkoutItem.id === productId) {
                idFound = true;
                amount = amount + 1;
            }
        });
        if (idFound) {
            checkoutItems = checkoutItems.concat([{ id: productId, price: priceProduct1}]);
            const amountId = "#" + productId + "amount"
            $(amountId).text(amount);
        }

        else {
            container.append(newHTMLContent);
            checkoutItems = checkoutItems.concat([{ id: productId, price: priceProduct1 }]);
        }
        calculatePriceSum()
        $(".cart").fadeIn("fast");

    });

    $('#addProduct2ToCart').click(function (event) {
                var productId = "2";
        var container = $('.js-add-content');
        var textForContent = 'Nice Camera';
        var idFound = false;
        var amount = 1;
        var newHTMLContent = createListItem(textForContent, "https://i2.cdscdn.com/pdt2/6/2/3/1/700x700/nik4020684229623/rw/nikon-speedlight-sb-500-flash-amovible-a-griffe-24.jpg", priceProduct2, productId, amount);


        checkoutItems.forEach(checkoutItem => {
            if (checkoutItem.id === productId) {
                idFound = true;
                amount = amount + 1;
            }
        });
        if (idFound) {
            checkoutItems = checkoutItems.concat([{ id: productId, price: priceProduct2 }]);
            const amountId = "#" + productId + "amount"
            $(amountId).text(amount);
        }

        else {
            container.append(newHTMLContent);
            checkoutItems = checkoutItems.concat([{ id: productId, price: priceProduct2 }]);
        }
        calculatePriceSum()
        $(".cart").fadeIn("fast");

    });

    $(document).on('click', '#listItem1 .plusButton1', function (event) {
        addToCheckout("1", priceProduct1)

    });
    $(document).on('click', '#listItem2 .plusButton2', function (event) {
        addToCheckout("2", priceProduct2)

    });
    $(document).on('click', '#listItem3 .plusButton3', function (event) {
        addToCheckout("3", priceProduct2)

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

    function calculatePriceSum() {
        var sum = 0;
        checkoutItems.forEach(checkoutItem => {
            sum = sum + parseFloat(checkoutItem.price)
        })
        $(priceSum).text("Total Price: "+ Math.round(sum * 100) / 100+ " chf");
        /* animation of total cost*/
        $(priceSum).addClass('addToCart');
        setTimeout(function(){
        $(priceSum).removeClass('addToCart');
        },1000);
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
    <li id= ${listItemId}> 
<div class="shoppingLayout">
    <div>
        <img class="imgSizeList" src= ${imageSource}> </img>
    </div>

    <div class="textSignsAmountWrap">
    <div>
        <p class= "descriptionStyle"> ${text} </p>
    </div>
        <div class="signsPriceAlign">
            <div class="minusPlusAmount">
                <button class= "plusMinusStyle ${minusButtonClass}" > - </button>
                <p class="amountStyle" id = ${amountId}> ${amount} </p>
                <button  class= "plusMinusStyle ${plusButtonClass}"> + </button>
            </div>


        </div>
    </div>
    <div class="minusPlusAmount" >
    <p class= "descriptionStyle"> ${price} chf </p>
    <div></div>
    </div>
</div>    
    </li>
    `
    }

    (function () {

        $("#clickCart").on("click", function () {
            $(".cart").fadeToggle("fast");
        });

    })();

});