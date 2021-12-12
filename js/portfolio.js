//////////////////////////variables
var images = [];
var lastColumns = null;
var lightBoxGalleryName = null;
//urls and alts tb received from backend in future
var paintings = [
    "sketch-theoforclare.jpg",
    "Acrylic-ReconnectToBasics.jpg",
    "Acrylic-AgentOrangeJuice.jpg",
    "MixedMediaCollage-ArtistTradingCards.jpg",
    "Acrylic-Conventions.jpg",
    "Acrylic-OrangeSmiles.jpg",
    "Acrylic-ApplePlanet.jpg",
    "Acrylic-Stereotyping.jpg",
    "Acrylic-SunFlower.jpg",
    "Acrylic-Vulnerability.jpg",
    "Acrylic-Bear.jpg",
    "Acrylic-Glutony.jpg",
    "Acrylic-OrangeBuggie.jpg",
    "Acrylic-MartinistoSpace.jpg",
    "Acrylic-MadeFromWheels.jpg",
    "Acrylic-Thirsty.jpg",
    "Pencil-Punk.jpg",
    "Gouache-PushingDaisies.jpg",
    "Acrylic-Flamingo.jpg",    
    "acrylic-chocolate-bunny.jpg",
    "acrylic-snake-dove.jpg",
    "acrylic-snake-lamb.jpg",
    "acrylic-snake-soccer.jpg",
    "Acrylic-Theo.jpg",
    "Acrylic-Skye.jpg",
]

var watercolorPencil = [
    "watercolor-brain.jpg",
    "watercolor-flower.jpg",
    "watercolor-hair.jpg",
    "Watercolor-Portrait.jpg",
    "Watercolor-SelfPortrait.jpg",
    "Pencil-KingFishers.jpg",
    "watercolor-hands-blue.jpg",
    "watercolor-hands-pink.jpg",
    "Pencil-BeetFarms.jpg",
    "Pencil-Agave.jpg",
    "Pencil-Home.jpg",
    "watercolor-horse-lost.jpg",
    "pencil-hawk.jpg",
    "Pencil-FungalFriends.jpg",
    "Pencil-KatrinBerndt.jpg",
    "Pencil-IrishTreasure.jpg",
    "Watercolor-NatureisWise.jpg",
    "Watercolor-FearShark.jpg",
    "Watercolor-FearSpider.jpg",
    "Watercolor-FearClown.jpg",
    "Watercolor-Antelope.jpg",
]

var blackAndWhite = [
    "watercolor-fester.jpg",
    "Watercolor-Caterpillar.jpg",
    "Pencil-VitruvianReverseCentaur.jpg",
    "Sketch-Poem.jpg",
    "Sketch-Bear.jpg",
    "Sketch-Camouflage.jpg",
    "Sketch-gecko.jpg",
    "Sketch-lizard.jpg",
    "Sketch-hummingbird.jpg",
    "Sketch-flow.jpg",
    "Sketch-stemandBud.jpg",
    "Sketch-Potato.jpg",
    "Sketch-DogNash.jpg",
    "pencil-charlie.jpg",
    "watercolor-matriarchy.jpg",
    "Sketch-Snow.jpg",
    "Sketch-Penelope.jpg",
    "Sketch-DogDobby.jpg",
]

//reminder for digital
///moths

//////////////////////////listeners
document.addEventListener('DOMContentLoaded', function(event) {
    //to be updated by page
    let location = document.location.href;
    if (location.includes("pencil")){
        lightBoxGalleryName = "gallery2";
        images = makeJSON(watercolorPencil);
    }
    else if (location.includes("graphite")){
        lightBoxGalleryName = "gallery3";
        images = makeJSON(blackAndWhite);
    }
    else if (location.includes("paintings")){
        lightBoxGalleryName = "gallery1";
        images = makeJSON(paintings);
    }

    insertColumns();
});

//moving to jquery implementation
window.onresize = function() {
    insertColumns();
};

//////////////////////////functions
function insertColumns(){
    var currentColumns = calculateColumns();
    if (currentColumns == lastColumns) return;
    lastColumns = currentColumns;
    var step = Math.floor(images.length/currentColumns);
    var mod = images.length % currentColumns;
    var nextImgToBeAdded = 0;
    $("#portfolio").empty()
    for (let i = 0; i < currentColumns; i++){
        let colSize = step;
        if (mod > 0){
            colSize += 1;
            mod -= 1;
        }
        createColumnHTML(nextImgToBeAdded, nextImgToBeAdded + colSize - 1, i);
        nextImgToBeAdded += colSize;
    }
}

function createColumnHTML(startingInt, endingInt, colNumber){
    var id = 'flex-col-'+colNumber;
    var flexCol = `<div class="flex-column" id="${id}"></div>`
    $("#portfolio").append(flexCol)
    for (let j = startingInt; j <= endingInt; j++){
        $(`#${id}`).append(createATag(images[j]));
    }
}

function createATag(imgJSON){
    return `<a  class="flex-a" href='${imgJSON.bigPath}' data-lightbox='${lightBoxGalleryName}'><img id='myImg' class="flex-img" src='${imgJSON.smallPath}' alt='${imgJSON.name}'></a>`
}

function calculateColumns(){
    var windowWidth = window.innerWidth;
    var columns;
    if (windowWidth <= 450) columns = 1;
    else if (windowWidth <= 750) columns = 2;
    else if (windowWidth <= 1050) columns = 3;
    else columns = 4;
    return columns;
}

function makeJSON(imgArray){
    var jsonArray = [];
    imgArray.forEach(imgName=>{
        let entry = {
            name: makeImgAlt(imgName),
            smallPath: makeImgPath(imgName, false),
            bigPath: makeImgPath(imgName, true)
        }
        jsonArray.push(entry);
    })
    return jsonArray;
}

function makeImgPath(fileName, big){
    const smallPath = "images/portfolio/big/";
    const bigPath = "images/portfolio/big/";
    return (big) ? bigPath + fileName : smallPath + fileName;
}

function makeImgAlt(fileName){
    var uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    fileName = fileName.split(".")[0];
    fileName = fileName.replace(/-/g, ' ');
    fileName = fileName.replace(/_/g, ' ');
    var newName = fileName[0];
    for (let i = 1; i < fileName.length; i++){
        if (fileName[i-1] == " "){
            newName += fileName[i];
        }
        else if (uppercase.includes(fileName[i])){
            newName += " " + fileName[i];
        }
        else{
            newName += fileName[i];
        }
    }
    return newName;
}
