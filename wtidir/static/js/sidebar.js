function openNav() {
    document.getElementById("mySidebar").style.left = "0px";
}

function closeNav() {
    document.getElementById("mySidebar").style.left = "-300px";
}

$(document).ready(function() {
    $('.sidebar-dropdown-button').click(function() {
        var currentDropdown = $(this).next();
        if (currentDropdown.hasClass('d-none')) {
            currentDropdown.addClass('d-block').removeClass('d-none');
        } else {
            currentDropdown.addClass('d-none').removeClass('d-block');
        }
        $('.sidebar-dropdown-container').not(currentDropdown).addClass('d-none').removeClass('d-block');

    });
});