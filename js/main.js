//////////////////////////variables
//nav
var navButton

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
    navButon = document.getElementById("nav-button")
    navButton.addEventListener("click", toggleNavigation)

    //cursor
    cursorTrail = document.getElementById("cursor-trail");

    //home slideshow
    homeSlides = document.querySelectorAll("[data-component='home-slides']")
    console.log(homeSlides);
    if (homeSlides) homeSlides.forEach(initHomeSlides);
})

document.addEventListener("mousemove", function(event){
    trackCursor(event);
});

////////////////////navigation
function toggleNavigation(event){
    console.log(event);
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
    cursorTrail.style.left = event.pageX + "px";
    cursorTrail.style.top = event.pageY + "px";
    //makeTrail();
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

function makeTrail(){
    if (!cursorTrail) return;
    if (extendedTrail.length == 0){
        let el = cursorTrail;
        //el.id = "cursor-trail-1";
        //document.body.append(el);
        extendedTrail.push(el.id);
    }
}

//////////////home slideshow
function initHomeSlides(slideshow){
    let slides = document.querySelectorAll(`#${slideshow.id} .home-slide`);
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