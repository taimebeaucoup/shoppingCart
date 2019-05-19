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
            if(checkoutItem.id === productId){
                idFound = true;
                amount = amount + 1;
            }
        });
        if(idFound){
            checkoutItems = checkoutItems.concat([{id: productId, price: "10.40"}]);   
            const amountId = "#"+ productId + "amount" 
            $(amountId).text(amount);
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
    $(document).on('click', '#btn-list .plusButton1', function(event){ 
        console.log('add toseds cart' + event + event.target);
         const amountId = "#"+ "1" + "amount" ;
         var amount = $(amountId).text();
         intAmount=parseInt(amount);
         intAmount = intAmount + 1;
         $(amountId).text(intAmount);
         checkoutItems = checkoutItems.concat([{id: "1", price: "10.40"}]);   

   });
   $(document).on('click', '#btn-list .plusButton2', function(event){ 
    console.log('add toseds cart' + event + event.target);
     const amountId = "#"+ "2" + "amount" ;
     var amount = $(amountId).text();
     intAmount=parseInt(amount);
     intAmount = intAmount + 1;
     $(amountId).text(intAmount);
     checkoutItems = checkoutItems.concat([{id: "2", price: "10.40"}]);   

});


  // Function to create content HTML string
  function createListItem(text, imageSource, price, productId, amount) {
      const amountId = productId + "amount"
      const plusButtonClass = "plusButton" + productId;
    return `
    <li id= "btn-list">
    <img src= ${imageSource}> </img>
    <p> ${text} </p>
    <button> - </button>
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