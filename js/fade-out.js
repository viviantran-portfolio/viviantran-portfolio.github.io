document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('.header-right li a');
  var art = document.querySelectorAll('.grid-item');
  var logoLink = document.querySelector('.header-left a');
  var leftLinks = document.querySelectorAll('.left a');
  var header = document.querySelector('header');
  var altheader = document.querySelector('.alt-header');
  var body = document.querySelector('body');

  body.style.opacity = '0';
  body.style.overflow = 'auto';

  if (location.pathname === "/index.html") {
    // Fade in the header and body elements
    setTimeout(function() {
      header.style.backgroundColor = 'black';
      body.style.opacity = '1';
    }, 100); // delay for 0.1 seconds (100 milliseconds)
  } else {
    // Fade in the header and body elements
    setTimeout(function() {
      altheader.classList.add('black');
      body.style.opacity = '1';
      body.style.backgroundColor = 'white';
    }, 100);
  }

  if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
    window.location.reload();
  }
  

  // Add click event listener to each link
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
      if (event.target.href.indexOf('#') === -1){
        event.preventDefault(); // prevent the default link behavior
        
        if (location.pathname === "/index.html"){
          header.style.backgroundColor = 'white'; // add the "black" class to the header element
        } else {
          altheader.classList.remove('black'); // add the "black" class to the header element
        }

        body.style.opacity = '0';
        setTimeout(function() {
          var url = new URL(event.target.href);
          var path = url.pathname;
          history.pushState({ page: path }, '', path);
          navigateToPage(path);
        }, 1000);
      }
    });
  }

  // Add click event listener to logo link
  logoLink.addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior
    altheader.classList.add('black'); // add the "black" class to the header element
    body.style.opacity = '0';
    setTimeout(function() {
      var url = new URL(logoLink.href);
      var path = url.pathname;
      history.pushState({ page: path }, '', path);
      navigateToPage(path);
    }, 1000);
  });

  // Add click event listener to each link in the left column
  for (var j = 0; j < leftLinks.length; j++) {
    leftLinks[j].addEventListener('click', function(event) {
      if ( event.target.id !== 'off-site' && event.target.href.indexOf('#') === -1){
        event.preventDefault(); // prevent the default link behavior
        altheader.classList.remove('black'); // add the "black" class to the header element
        body.style.opacity = '0';
        setTimeout(function() {
          var url = new URL(event.target.href);
          var path = url.pathname;
          history.pushState({ page: path }, '', path);
          navigateToPage(path);
        }, 1000);
      }
    });
  }

  // Add click event listener to each art item
  for (var i = 0; i < art.length; i++) {
    art[i].addEventListener('click', function(event) {
      header.style.backgroundColor = '#FFFFFF'; // set the header background color to white
      body.style.opacity = '0'; // fade out the body
      setTimeout(function() {
        var path = event.target.closest('.grid-item').getAttribute('data-page');
        history.pushState({ page: path }, '', path);
        navigateToPage(path);
      }, 1000); // delay for 1 second (1000 milliseconds)
    });
  }
  
  // Listen for the popstate event to trigger specific code when the user navigates back to a previous state
  window.addEventListener('popstate', function(event) {
    if (event.state) {
      // Code to execute when the user navigates back to a previous state
      navigateToPage(event.state.page);
    }
  });

    // Function to navigate to the specified page
    function navigateToPage(path) {
      // Use window.location.pathname to navigate to the specified page
      console.log(path)

      window.location.pathname = path;
    }
});
