//variables

var cursorTrail;
var extendedTrail = [];

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
    setTimeout(()=>{
    cursorTrail.style.left = event.pageX + "px";
    cursorTrail.style.top = event.pageY + "px";
    makeTrail();
    }, 200);
}

function makeTrail(){
    if (!cursorTrail) return;
    if (extendedTrail.length == 0){
        console.log('yo')
        let el = cursorTrail;
        //el.id = "cursor-trail-1";
        //document.body.append(el);
        extendedTrail.push(el.id);
    }
}
