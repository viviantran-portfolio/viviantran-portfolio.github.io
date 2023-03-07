document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.header-right li a');
  const art = document.querySelectorAll('.grid-item');
  const logoLink = document.querySelector('.header-left a');
  const leftLinks = document.querySelectorAll('.left a');
  const header = document.querySelector('header');
  const altheader = document.querySelector('.alt-header');
  const body = document.querySelector('body');
  const isMobile = /Mobile/.test(navigator.userAgent);

  function fadeOutAndNavigate(path) {
    body.style.opacity = '0';
    setTimeout(function() {
      navigateToPage(path);
    }, 1000);
  }

  function navigateToPage(path) {
    window.location.pathname = path;
  }

  if (!isMobile) {
    const artworks = document.querySelectorAll('.artwork');

    artworks.forEach((artwork) => {
      artwork.addEventListener('click', () => {
        header.style.backgroundColor = 'white';
        fadeOutAndNavigate(artwork.getAttribute('data-page'));
      });
    });
  }

  body.style.opacity = '0';
  body.style.overflow = 'auto';

  if (location.pathname === '/index.html' || location.pathname === '/') {
    setTimeout(function() {
      header.style.backgroundColor = 'black';
      body.style.opacity = '1';
    }, 100);
  } else {
    setTimeout(function() {
      if (altheader != null) {
        altheader.classList.add('black');
      }
      body.style.opacity = '1';
      body.style.backgroundColor = 'white';
    }, 100);
  }

  if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
    window.location.reload();
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = new URL(event.target.href);

      if (url.hash === '') {
        event.preventDefault();

        if (location.pathname === '/index.html' || location.pathname === '/') {
          header.style.backgroundColor = 'white';
        } else {
          if (altheader != null) {
            altheader.classList.remove('black');
          }
        }

        fadeOutAndNavigate(url.pathname);
      }
    });
  });

  logoLink.addEventListener('click', (event) => {
    event.preventDefault();
    if (altheader != null) {
      altheader.classList.add('black');
    }
    fadeOutAndNavigate(new URL(logoLink.href).pathname);
  });

  leftLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.target.id !== 'off-site') {
        const url = new URL(event.target.href);

        if (url.hash === '') {
          event.preventDefault();
          if (altheader != null) {
            altheader.classList.remove('black');
          }
          fadeOutAndNavigate(url.pathname);
        }
      }
    });
  });

  art.forEach((item) => {
    item.addEventListener('click', (event) => {
      header.style.backgroundColor = '#FFFFFF';
      fadeOutAndNavigate(event.target.closest('.grid-item').getAttribute('data-page'));
    });
  });

  window.addEventListener('popstate', (event) => {
    if (event.state) {
      navigateToPage(event.state.page);
    }
  });
});
