// Get the <div> element with id="curtain"
const curtainDiv = document.getElementById("curtain");
const button = document.getElementById("curtain-toggle");
const openLabel = document.getElementById("open");
const closeLabel = document.getElementById("close");

const track = document.getElementById("artwork-track");
const artworks = document.querySelectorAll(".artwork");

document.addEventListener("DOMContentLoaded", () => {
    let nextPercentage = 100;
    track.style.transform = `translateX(${nextPercentage}%)`;
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
  });


  const toggleCurtain = () => {
    if (curtainDiv.dataset.toggled === 'true') {
      // Curtain is currently open
  
      // Animate the position of the track and the artworks to the right of the viewport
      track.animate(
        {
          transform: 'translateX(100%)',
        },
        { duration: 600, fill: 'forwards' }
      ).addEventListener('finish', () => {
        // Update the state of the curtain after the animation finishes
        curtainDiv.dataset.toggled = 'false';
        button.setAttribute('aria-expanded', 'false');
        openLabel.style.display = 'block';
        closeLabel.style.display = 'none';
  
        // Move the button back up when the curtain is closed
        button.animate(
          {
            top: '17.5vh',
          },
          { duration: 500, easing: 'ease-in-out', fill: 'forwards' }
        );
      });
  
      artworks.forEach((artwork) => {
        artwork.animate(
          {
            objectPosition: '100% center',
          },
          { duration: 600, fill: 'forwards' }
        );
      });
    } else {
      // Curtain is currently closed
  
      // Animate the position of the track and the artworks to the left of the viewport
      track.animate(
        {
          transform: 'translateX(2.5%)',
        },
        { duration: 1200, fill: 'forwards' }
      );
  
      artworks.forEach((artwork) => {
        artwork.animate(
          {
            objectPosition: '100% center',
          },
          { duration: 1200, fill: 'forwards' }
        );
      });
  
      // Update the state of the curtain immediately
      curtainDiv.dataset.toggled = 'true';
      button.setAttribute('aria-expanded', 'true');
      openLabel.style.display = 'none';
      closeLabel.style.display = 'block';
  
      
      // Move the button down when the curtain is open
      button.animate(
        {
            top: '87.5vh',
        },
        { duration: 500, easing: 'ease-in-out', fill: 'forwards' }
      );
    }
  };
  
  


const handleOnDown = (e) => {
  if (e.touches) {
    track.dataset.mouseDownAt = e.touches[0].clientX;
  } else {
    track.dataset.mouseDownAt = e.clientX;
  }
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (curtainDiv.dataset.toggled === 'false') return;
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta =
    parseFloat(track.dataset.mouseDownAt) -
    (e.touches ? e.touches[0].clientX : e.clientX);
  const maxDelta = window.innerWidth;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 2.5), -62.5);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translateX(${nextPercentage}%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  artworks.forEach((artwork) => {
    artwork.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  });
};


/* Had to add extra lines for touch events */
window.addEventListener("mousedown", handleOnDown);
window.addEventListener("touchstart", handleOnDown);
window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", handleOnUp);
window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", handleOnMove);
