const track = document.getElementById("artwork-track");
const artworks = document.querySelectorAll(".artwork");

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage =
    (mouseDelta / maxDelta) * -100;
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

/* Add this code to animate the nextPercentage variable on page load */
document.addEventListener("DOMContentLoaded", () => {
  let nextPercentage = 100;
  const animateNextPercentage = () => {
    nextPercentage -= 1;
    if (nextPercentage >= 2.5) {
      track.style.transform = `translateX(${nextPercentage}%)`;
      artworks.forEach((artwork) => {
        artwork.style.objectPosition = `${100 + nextPercentage}% center`;
      });
      requestAnimationFrame(animateNextPercentage);
    }
  };
  requestAnimationFrame(animateNextPercentage);
});

/* Had to add extra lines for touch events */
window.addEventListener("mousedown", handleOnDown);
window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", (e) => handleOnUp(e.touches[0]));
window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
