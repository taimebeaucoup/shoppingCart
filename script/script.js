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
        var newHTMLContent = createListItem(textForContent, "https://www.nikon.de/imported/images/web/EU/products/digital-cameras/dslr/hero_ppdd_updated/nikon_dslr_d810_black_front--original.png", "10.40", "2");
        

        checkoutItems.forEach(checkoutItem => {
            if(checkoutItem.id === productId){
                idFound = true;
            }
        });
        if(idFound){
            checkoutItems = checkoutItems.concat([{id: productId, price: "10.40"}]);   
        }

        else{
            container.append(newHTMLContent);
            checkoutItems = checkoutItems.concat([{id: productId, price: "10.40"}]);
        }

        console.log(checkoutItems);
    });

    $('#addProduct2ToCart').click(function (event) {
        console.log('add to cart');
        
    });

  // Function to create content HTML string
  function createListItem(text, imageSource, price, amount) {
    return `
    <li>
    <img src= ${imageSource}> </img>
    <p> ${text} </p>
    <button> - </button>
    <p> ${amount} </p>
    <button> + </button>
    <p> ${price} chf </p>
    </li>
    `
  }



});