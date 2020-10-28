$(document).ready(function() {
    $('.repository-edit-button').click(function() {
        var currentTD = $(this).parents('tr').find('td:not(:last-child)');
        if ($(this).attr('src') == "../../static/img/repository-icons/edit.png") {
            $.each(currentTD, function() {
                $(this).prop('contentEditable', "true");
            });
        } else {
            $.each(currentTD, function() {
                $(this).prop('contentEditable', "false");
            });
        }

        if ($(this).hasClass('in-branch')) {
            console.log(document.getElementById("repo-edit-quota-button").style.display);
            document.getElementById("repo-edit-quota-button").style.display === "block" ? document.getElementById("repo-edit-quota-button").style.display = "none" : document.getElementById("repo-edit-quota-button").style.display = "block";
            console.log("changed");
        }

        $(this).attr("src") == "../../static/img/repository-icons/edit-gray.png" ? $(this).attr("src", "../../static/img/repository-icons/edit.png") : $(this).attr("src", "../../static/img/repository-icons/edit-gray.png");
    });
});