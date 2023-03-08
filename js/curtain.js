const isMobile=/Mobile/.test(navigator.userAgent),curtainDiv=document.getElementById("curtain"),button=document.getElementById("curtain-toggle"),openLabel=document.getElementById("open"),closeLabel=document.getElementById("close"),track=document.getElementById("artwork-track"),artworks=document.querySelectorAll(".artwork");document.addEventListener("DOMContentLoaded",()=>{let t=100;track.style.transform=`translateX(${t}%)`,document.body.style.overflowY="auto",document.body.style.overflowX="hidden"});const toggleCurtain=()=>{isMobile||("true"===curtainDiv.dataset.toggled?(track.animate({transform:"translateX(100%)"},{duration:600,fill:"forwards"}).addEventListener("finish",()=>{curtainDiv.dataset.toggled="false",button.setAttribute("aria-expanded","false"),openLabel.style.display="block",closeLabel.style.display="none",button.animate({top:"17.5vh"},{duration:500,easing:"ease-in-out",fill:"forwards"})}),artworks.forEach(t=>{t.animate({objectPosition:"100% center"},{duration:600,fill:"forwards"})})):(track.animate({transform:"translateX(2.5%)"},{duration:1200,fill:"forwards"}),artworks.forEach(t=>{t.animate({objectPosition:"100% center"},{duration:1200,fill:"forwards"})}),curtainDiv.dataset.toggled="true",button.setAttribute("aria-expanded","true"),openLabel.style.display="none",closeLabel.style.display="block",button.animate({top:"87.5vh"},{duration:500,easing:"ease-in-out",fill:"forwards"})))},handleOnDown=t=>{t.touches?track.dataset.mouseDownAt=t.touches[0].clientX:track.dataset.mouseDownAt=t.clientX},handleOnUp=()=>{track.dataset.mouseDownAt="0",track.dataset.prevPercentage=track.dataset.percentage},handleOnMove=t=>{if("false"===curtainDiv.dataset.toggled||"0"===track.dataset.mouseDownAt)return;let e=parseFloat(track.dataset.mouseDownAt)-(t.touches?t.touches[0].clientX:t.clientX),a=window.innerWidth,n=-(e/a*100),o=parseFloat(track.dataset.prevPercentage)+n,r=Math.max(Math.min(o,2.5),-70);track.dataset.percentage=r,track.animate({transform:`translateX(${r}%)`},{duration:1200,fill:"forwards"}),artworks.forEach(t=>{t.animate({objectPosition:`${100+r}% center`},{duration:1200,fill:"forwards"})})};window.addEventListener("mousedown",handleOnDown),window.addEventListener("touchstart",handleOnDown),window.addEventListener("mouseup",handleOnUp),window.addEventListener("touchend",handleOnUp),window.addEventListener("mousemove",handleOnMove),window.addEventListener("touchmove",handleOnMove);