$(document).ready(function() {
    $('.repository-edit-button').click(function() {
        var currentTD = $(this).parents('tr').find('td:not(:last-child)');
        $.each(currentTD, function() {
            $(this).prop('contentEditable', "true");
        });
        $(this).addClass('d-none');
        $(this).parents('a').next().removeClass('d-none');
        console.log("1");
    });

    $('.repository-edit-gray-button').click(function() {
        var currentTD = $(this).parents('tr').find('td:not(:last-child)');
        $.each(currentTD, function() {
            $(this).prop('contentEditable', "false");
        });
        $(this).addClass('d-none');
        $(this).prev().find('img').removeClass('d-none');
        console.log("2");
    });


    // For Branch (Repository)
    if ($(this).hasClass('in-branch')) {
        document.getElementById("repo-edit-quota-button").style.display === "block" ? document.getElementById("repo-edit-quota-button").style.display = "none" : document.getElementById("repo-edit-quota-button").style.display = "block";
    }

    // $(this).attr("src") == "../../static/img/repository-icons/edit-gray.png" ? $(this).attr("src", "../../static/img/repository-icons/edit.png") : $(this).attr("src", "../../static/img/repository-icons/edit-gray.png");
});