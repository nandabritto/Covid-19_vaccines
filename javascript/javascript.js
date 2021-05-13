var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load", function () {
    showSlides(slideIndex);
    myTimer = setInterval(function () {
        plusSlides(1)
    }, 4000);

    //COMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    slideshowContainer = document.getElementsByClassName('slideshow-inner')[0];

    //UNCOMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    // slideshowContainer = document.getElementsByClassName('slideshow-container')[0];

    slideshowContainer.addEventListener('mouseenter', pause)
    slideshowContainer.addEventListener('mouseleave', resume)
})

// NEXT AND PREVIOUS CONTROL
function plusSlides(n) {
    clearInterval(myTimer);
    if (n < 0) {
        showSlides(slideIndex -= 1);
    } else {
        showSlides(slideIndex += 1);
    }

    //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME

    if (n === -1) {
        myTimer = setInterval(function () {
            plusSlides(n + 2)
        }, 4000);
    } else {
        myTimer = setInterval(function () {
            plusSlides(n + 1)
        }, 4000);
    }
}

//Controls the current slide and resets interval if needed
function currentSlide(n) {
    clearInterval(myTimer);
    myTimer = setInterval(function () {
        plusSlides(n + 1)
    }, 4000);
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

pause = () => {
    clearInterval(myTimer);
}

resume = () => {
    clearInterval(myTimer);
    myTimer = setInterval(function () {
        plusSlides(slideIndex)
    }, 4000);
}



// web sharing detection
document.addEventListener('DOMContentLoaded', () => {
  
  'use strict';
  
  // get page information
  const 
    html = document.documentElement,
    canonical = document.querySelector('link[rel=canonical]'),
    desc = document.getElementsByName('description'),
    pageInfo = {
      url: canonical ? canonical.href : location.href,
      title: document.title || '',
      text: desc.length ? desc[0].content : ''
    };
  
   // Web Share API support?
  if (navigator.share) html.classList.add('webshareapi');
  
  // social sharing enabled
  html.classList.add('social');

  // click event
  document.body.addEventListener('click', (e) => {
    
    // on share button?
    let t = e.target.closest('A');
    if (!t || !t.closest('.share')) return;
    
    // cancel link
    e.preventDefault();
    
    // Web Share API
    if (t.hash === '#webshare') {
      
      navigator.share(pageInfo);
      return;
  
    }
    
    // social media link
    let popup, newUrl = urlParse(t.href, pageInfo);
    
    // open popup
    if (t.protocol.startsWith('http')) {
      
      let
        sw = screen.availWidth || 1024,
        sh = screen.availHeight || 700,
        pw = Math.min(600, (sw - 40)),
        ph = Math.min(600, (sh - 40)),
        px = Math.floor((sw - pw) / 2),
        py = Math.floor((sh - ph) / 2);

      popup = window.open(
        newUrl,
        'social',
        `width=${pw},height=${ph},left=${px},top=${py},\
        location=0,menubar=0,toolbar=0,personalbar=0,status=0,scrollbars=1,resizable=1`
      );
    }
    
    if (popup) popup.focus();
    else location.href = newUrl;
    
  });
  
  
  // URL template parser
  function urlParse(str, token) {
    
    for (let t in token) {
      str = str.replace(new RegExp('\\$\\{' + t + '\\}', 'g'), encodeURIComponent(token[t]));
    }
    return str;
    
  }
  
});

