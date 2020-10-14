$(document).ready(function() {
    $('.repository-edit-button').click(function() {
        var currentTD = $(this).parents('tr').find('td:not(:last-child)');
        if ($(this).attr('src') == "../../static/img/repository-icons/edit.png") {
            $.each(currentTD, function() {
                $(this).prop('contentEditable', "true");
                console.log($(this).prop('contenteditable'));
            });
            $(this).attr("src", "../../static/img/repository-icons/edit-gray.png");
        } else {
            $.each(currentTD, function() {
                $(this).prop('contentEditable', "false");
                console.log($(this).prop('contenteditable'));
            });
            $(this).attr("src", "../../static/img/repository-icons/edit.png");
        }
        // $(this).attr("src") == "../../static/img/repository-icons/edit-gray.png" ? $(this).attr("src", "../../static/img/repository-icons/edit.png") : $(this).attr("src", "../../static/img/repository-icons/edit-gray.png");
        console.log("now: " + $(this).attr("src"));
    });
});