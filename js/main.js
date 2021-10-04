//variables

var cursorTrail;
var extendedTrail = [];
var lastMouseCoord = [0,0];
var cursorTrailDelay = 200;

//listeners

document.addEventListener('DOMContentLoaded', function() {
    cursorTrail = document.getElementById("cursor-trail");
    
})

document.addEventListener("mousemove", function(event){
    trackCursor(event);
});

//cursors

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
