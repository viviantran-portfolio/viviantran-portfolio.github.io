document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.header-right li a');
  var logoLink = document.querySelector('.header-left a');
  var header = document.querySelector('.alt-header');
  var body = document.querySelector('body');

  // Fade in the header and body elements
  setTimeout(function() {
    header.classList.add('black');
    body.style.opacity = '1';
  }, 100); // delay for 0.5 seconds (500 milliseconds)

  // Add click event listener to each link
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
      if (event.target.href.indexOf('#') === -1){
        event.preventDefault(); // prevent the default link behavior
        header.classList.remove('black'); // add the "black" class to the header element
        body.style.opacity = '0';
        setTimeout(function() {
          window.location.href = event.target.href; // navigate to the link's href after a delay
        }, 1000); // delay for 1 second (1000 milliseconds)
      }
    });
  }

    // Add click event listener to logo link
    logoLink.addEventListener('click', function(event) {
      event.preventDefault(); // prevent the default link behavior
      header.classList.add('black'); // add the "black" class to the header element
      body.style.opacity = '0';
      setTimeout(function() {
        window.location.href = "../index.html"; // navigate to the link's href after a delay
      }, 2000); // delay for 1 second (1000 milliseconds)
    });
});
