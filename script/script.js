$(document).ready(function () {

    $('#fadeButton').click(function (event) {
        console.log('Fade out that div! 👻');
        console.log('event.target: ', event.target);
    });

    $('#addProduct1ToCart').click(function (event) {
        console.log('add to cart');
        var container = $('.js-add-content');
        var textForContent = 'This can contain more than just one element';

        var newHTMLContent = createListItem(textForContent);
        
        console.log('newHTMLContent: ', newHTMLContent);
        
        // And add the newly created HTML string as the last part of our container
        container.append(newHTMLContent);
        console.log(container);
    });

    $('#addProduct2ToCart').click(function (event) {
        console.log('add to cart');
        
    });

  // Function to create content HTML string
  function createListItem(text) {
    return `
    <li>${text}</li>
    `
  }



});