function openNav() {
    // document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("mySidebar").style.left = "0px";
}

function closeNav() {
    // document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.left = "-300px";
}


/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("sidebar-dropdown-button");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}