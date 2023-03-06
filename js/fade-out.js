document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.header-right li a');
  var logoLink = document.querySelector('.header-left a');
  var leftLinks = document.querySelectorAll('.left a');
  var header = document.querySelector('.alt-header');
  var body = document.querySelector('body');

  body.style.opacity = '0';
  body.style.overflow = 'auto';

  // Fade in the header and body elements
  setTimeout(function() {
    header.classList.add('black');
    body.style.opacity = '1';
    body.style.backgroundColor = 'white';
  }, 100);

  // Add click event listener to each link
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
      if (event.target.href.indexOf('#') === -1){
        event.preventDefault(); // prevent the default link behavior
        header.classList.remove('black'); // add the "black" class to the header element
        body.style.opacity = '0';
        setTimeout(function() {
          window.location.href = event.target.href; // navigate to the link's href after a delay
        }, 2000);
      }
    });
  }

    // Add click event listener to logo link
    logoLink.addEventListener('click', function(event) {
      event.preventDefault(); // prevent the default link behavior
      header.classList.add('black'); // add the "black" class to the header element
      body.style.opacity = '0';
      setTimeout(function() {
        window.location.href = logoLink.href; // navigate to the link's href after a delay
      }, 2000);
    });

    // Add click event listener to each link in the left column
  for (var j = 0; j < leftLinks.length; j++) {
    leftLinks[j].addEventListener('click', function(event) {
      console.log(event.target.id)
      if ( event.target.id !== 'off-site' && event.target.href.indexOf('#') === -1){
        event.preventDefault(); // prevent the default link behavior
        header.classList.remove('black'); // add the "black" class to the header element
        body.style.opacity = '0';
        setTimeout(function() {
          window.location.href = event.target.href; // navigate to the link's href after a delay
        }, 2000);
      }
    });
  }
});
