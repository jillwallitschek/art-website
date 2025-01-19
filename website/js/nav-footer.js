//////////////////////////variables
//nav
var navButton;
var expandedNav;
var showNavigation = false;
var emailClipboardSuccess;

//////////////////////////listeners
document.addEventListener('DOMContentLoaded', function() {
    //nav
   $("#nav-holder").load("nav.html", (success)=>{
        navButton = document.getElementById("nav-button");
        if (navButton) navButton.addEventListener("click", toggleNavigation);
        var navLiList = document.querySelectorAll("ul#real-nav li")
        navLiList.forEach((li)=>{
            li.addEventListener("click", navToURL);
            updateNavLiCSS(li);
        });
        var mailIcon = document.getElementById("mail-icon");
        if (mailIcon) mailIcon.addEventListener("click", copyEmailToClipboard);
   });
   //footer
    $("#footer-holder").load("footer.html", (success)=>{
        //tba
    });
});

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