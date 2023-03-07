document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.header-right li a');
    var art = document.querySelectorAll('.grid-item')
    var header = document.querySelector('header');
    var body = document.querySelector('body');
  
    // Fade in the header and body elements
    setTimeout(function() {
      header.style.backgroundColor = '#000000';
      body.style.transition = 'opacity 1s ease-out';
      body.style.opacity = '1';
    }, 500); // delay for 0.5 seconds (500 milliseconds)
  
    // Add click event listener to each link
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function(event) {
        event.preventDefault(); // prevent the default link behavior
        header.style.backgroundColor = '#FFFFFF'; // set the header background color to white
        body.style.opacity = '0';
        setTimeout(function() {
          window.location.href = event.target.href; // navigate to the link's href after a delay
        }, 1000); // delay for 1 second (1000 milliseconds)
      });
    }

    for (var i = 0; i < art.length; i++) {
      art[i].addEventListener('click', function(event) {
        header.style.backgroundColor = '#FFFFFF'; // set the header background color to white
        body.style.opacity = '0';
        setTimeout(function() {
          window.location.href = event.target.closest('.grid-item').getAttribute('data-page'); // navigate to the link's href after a delay
        }, 1000); // delay for 1 second (1000 milliseconds)
      });
    }
  });
  