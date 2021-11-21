//////////////////////////variables
//nav
var navButton;
var expandedNav;
var showNavigation = false;
var emailClipboardSuccess;

//cursor
var cursorTrail;
var extendedTrail = [];
var lastMouseCoord = [0,0];
var cursorTrailDelay = 200;

//slideshow
var homeSlides;
var homeSlidesTimer;

//////////////////////////listeners
document.addEventListener('DOMContentLoaded', function() {
    //nav
    navButton = document.getElementById("nav-button");
    if (navButton) navButton.addEventListener("click", toggleNavigation);
    var navLiList = document.querySelectorAll("ul#real-nav li")
    navLiList.forEach((li)=>{
        li.addEventListener("click", navToURL);
        updateNavLiCSS(li);
    });
    var mailIcon = document.getElementById("mail-icon");
    if (mailIcon) mailIcon.addEventListener("click", copyEmailToClipboard);

    //cursor
    cursorTrail = document.getElementById("cursor-trail");

    //home slideshow
    homeSlides = document.querySelectorAll("[data-component='home-slides']")
    if (homeSlides) homeSlides.forEach(initHomeSlides);
})

document.addEventListener("mousemove", function(event){
    trackCursor(event);
});

////////////////////navigation
function navToURL(event){
    let id = event.target?.id;
    if (!id) return;
    if (id == "home") window.location.href = "index.html";
    else if (id == "paintings") window.location.href = "paintings.html";
    else if (id == "pencil") window.location.href = "pencil.html";
    else if (id == "graphite") window.location.href = "graphite.html";
    else if (id == "websites") window.location.href = "websites.html";
    toggleNavigation(event);
}

function toggleNavigation(event){
    if (!event) return;
    if (!expandedNav) expandedNav = document.getElementById("expanded-nav");
    if (showNavigation){
        expandedNav.classList.add('nav-hide');
        setTimeout(()=>{
            expandedNav.classList.remove('expanded-nav');
        }, 200);
        showNavigation = false;
    }
    else{
        expandedNav.classList.remove('nav-hide');
        expandedNav.classList.add('expanded-nav');
        showNavigation = true;
    }
}

function updateNavLiCSS(li){
    let id = li.id;
    if (!id) return;
    if (id == "home") id = "index"
    let location = document.location.href;
    if (location.includes(id)) addSelectedClass(li);
    else removeSelectedClass(li)
}

function addSelectedClass(el){
    el.classList.add("selected");
}

function removeSelectedClass(el){
    el.classList.remove("selected");
}

async function copyEmailToClipboard(event){
    try {
        const blob = new Blob(['jillwallitschek@gmail.com'], {type: 'text/plain'});
        const email = new ClipboardItem({'text/plain': blob});
        await navigator.clipboard.write([email]).then(()=>{
            showCopyEmailSuccess(event);
        })
    }
    catch(error){
        if (!emailClipboardSuccess) emailClipboardSuccess = document.getElementById("email-clipboard-success");
        emailClipboardSuccess.textContent = "jillwallitschek@gmail.com";
        if (!emailClipboardSuccess.classList.contains("hide")) return;
        emailClipboardSuccess.classList.remove("hide");
        setTimeout(()=>{
            emailClipboardSuccess.classList.add("hide")
        }, 7000)
    }
}

function showCopyEmailSuccess(event){
    if (!emailClipboardSuccess) emailClipboardSuccess = document.getElementById("email-clipboard-success");
    if (!emailClipboardSuccess.classList.contains("hide")) return;
    emailClipboardSuccess.classList.remove("hide");
    setTimeout(()=>{
        emailClipboardSuccess.classList.add("hide")
    }, 200)
}

//////////////////////cursors
function trackCursor(event){
    if (!cursorTrail) return;
    lastMouseCoord[0] = event.pageX;
    lastMouseCoord[1] = event.pageY;
    if (!cursorTrail.classList.contains("cursor-animation")){
        cursorTrail.classList.add("cursor-animation");
        cursorTrail.classList.remove("hide");
    }
    if (event.target.nodeName == "A" || event.target.classList.contains("hover-selection") || event.target.classList.contains("link")){
        if (!cursorTrail.classList.contains("hide")) setTimeout(()=>{cursorTrail.classList.add("hide");}, cursorTrailDelay);
        return;
    }
    else{
        if (cursorTrail.classList.contains("hide")){
            cursorTrail.classList.remove("hide");
        }
    }
    setTimeout(()=>{
        if (cursorTrail.classList.contains('opacity-0')){
            cursorTrail.classList.remove('opacity-0')
        }
        cursorTrail.style.left = event.pageX + "px";
        cursorTrail.style.top = event.pageY + "px";
    }, cursorTrailDelay);
    removeAnimationOnStationary(event);
}

function removeAnimationOnStationary(event){
    setTimeout(()=>{
        if (event.pageX == lastMouseCoord[0] && event.pageY == lastMouseCoord[1]){
            cursorTrail.classList.remove("cursor-animation");
            cursorTrail.classList.add("hide");
        }
    }, cursorTrailDelay);
}

//////////////home slideshow
function initHomeSlides(slideshow){
    let slides = document.querySelectorAll(`#${slideshow.id} .home-slide`);
    if (!slides) return;
    //for css animation: opacity chng start = 100 - delay/time*100; animation duration = time
    var i = 0, time = 6000, delay = 1000; 
    slides[i].classList.add('active')
    setTimeout(()=>{slides[i].classList.add('slide-fade')},delay);
    homeSlidesTimer = setInterval(()=>{
        var perviousSlide = i;
        i++;
        if (i === slides.length) i = 0;
        if (!slides[perviousSlide] || !slides[i]) return
        setTimeout(()=>{
            slides[perviousSlide].classList.remove('active');
            slides[perviousSlide].classList.remove('slide-fade')
            slides[i].classList.add('slide-fade')
        }, delay)
        slides[i].classList.add('active');
    }, time)
}