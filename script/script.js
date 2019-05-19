$(document).ready(function () {
    let checkoutItems = [];

    $('#fadeButton').click(function (event) {
        console.log('Fade out that div! 👻');
        console.log('event.target: ', event.target);
    });

    $('#addProduct1ToCart').click(function (event) {
        var productId = "1";
        console.log('add to cart');
        var container = $('.js-add-content');
        var textForContent = 'This can contain more than just one element';
        var idFound = false;
        var amount = 1;
        var newHTMLContent = createListItem(textForContent, "https://www.nikon.de/imported/images/web/EU/products/digital-cameras/dslr/hero_ppdd_updated/nikon_dslr_d810_black_front--original.png", "10.40", productId, amount);


        checkoutItems.forEach(checkoutItem => {
            if (checkoutItem.id === productId) {
                idFound = true;
                amount = amount + 1;
            }
        });
        if (idFound) {
            checkoutItems = checkoutItems.concat([{ id: productId, price: "10.40" }]);
            const amountId = "#" + productId + "amount"
            $(amountId).text(amount);
        }

        else {
            container.append(newHTMLContent);
            checkoutItems = checkoutItems.concat([{ id: productId, price: "10.40" }]);
        }
        calculatePriceSum()
        console.log(checkoutItems);
    });

    $('#addProduct2ToCart').click(function (event) {
        console.log('add to cart');

    });

    // try and find currently clicked product id (list element or button element), without hard code - nicer code!
    $(document).on('click', '#listItem1 .plusButton1', function (event) {
        addToCheckout("1")

    });
    $(document).on('click', '#listItem2 .plusButton2', function (event) {
        addToCheckout("2")

    });
    $(document).on('click', '#listItem1 .minusButton1', function (event) {
        var productId = "1" 
        removeFromCheckout(productId)
    });

    function calculatePriceSum()
    {
        var sum = 0;
        checkoutItems.forEach(checkoutItem => {
            sum = sum + parseFloat( checkoutItem.price)
        })
        $(priceSum).text(sum);
    }

    function addToCheckout(productId )
    {
        const amountId = "#" + productId + "amount";
        var amount = $(amountId).text();
        intAmount = parseInt(amount);
        intAmount = intAmount + 1;
        $(amountId).text(intAmount);
        checkoutItems = checkoutItems.concat([{ id: productId, price: "10.40" }]);
        calculatePriceSum()
    }

    function removeFromCheckout(productId)
    {
        const amountId = "#" + productId + "amount";
        var amount = $(amountId).text();
        intAmount = parseInt(amount);
        if (intAmount > 1) {
            intAmount = intAmount - 1;
            $(amountId).text(intAmount);
            var newb = []
            var firstRemoved = false;
            for(var i = checkoutItems.length - 1; i >= 0; i--) {
                 if(checkoutItems[i].id !== productId || firstRemoved) {
                    newb = newb.concat([checkoutItems[i]]);
                }
                else{
                    firstRemoved = true;
                }
            }
            checkoutItems = newb;
        }
        else{
            const itemToRemove = "#listItem" + productId
            let newCheckoutItems = [];
        checkoutItems.forEach(checkoutItem => {
            if (checkoutItem.id !== productId || firstRemoved) {
                newCheckoutItems.concat([checkoutItem])
            }
        });
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
    <img src= ${imageSource}> </img>
    <p> ${text} </p>
    <button class= ${minusButtonClass} > - </button>
    <p id = ${amountId}> ${amount} </p>
    <button class= ${plusButtonClass} > + </button>
    <p> ${price} chf </p>
    </li>
    `
    }
    $('#plusButton').click(function (event) {
        console.log(event);
        console.log(event.target);

    });



});