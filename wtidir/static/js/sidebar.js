function openNav() {
    // document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("mySidebar").style.left = "0px";
}

function closeNav() {
    // document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.left = "-300px";
}

// $('#menu-button').click(function(e) {
//     e.stopPropagation();
//     openNav()
// });

// $('#hide-menu').click(function(e) {
//     e.stopPropagation();
// });

$('#mySidebar').click(function(e) {
    if (document.getElementById("mySidebar").style.width != "250px") {
        closeNav();
    }
});