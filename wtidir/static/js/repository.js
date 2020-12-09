$(document).ready(function() {
    $('.repository-edit-button').click(function() {
        var currentTD = $(this).parents('tr').find('td:not(:last-child)');
        $.each(currentTD, function() {
            $(this).children('input').attr('readonly', false);
            console.log('hi');
        });
        $(this).addClass('d-none');
        $(this).parents('a').next().removeClass('d-none');


        // For Branch (Repository)
        if ($(this).hasClass('in-branch')) {
            $(".repo-edit-quota-button").removeClass('d-none');
        }
    });

    $('.repository-edit-gray-button').click(function() {
        var currentTD = $(this).parents('tr').find('td:not(:last-child)');
        $.each(currentTD, function() {
            $(this).children('input').attr('readonly', true);

        });
        $(this).addClass('d-none');
        $(this).prev().children('img').removeClass('d-none');

        // For Branch (Repository)
        if ($(this).hasClass('in-branch')) {
            $(".repo-edit-quota-button").addClass('d-none');
        }
    });
    // For Branch (Repository)
    if ($(this).hasClass('in-branch')) {
        document.getElementById("repo-edit-quota-button").style.display === "block" ? document.getElementById("repo-edit-quota-button").style.display = "none" : document.getElementById("repo-edit-quota-button").style.display = "block";
    }




    $('.confirm-all-modal').click(function() {
        setTimeout(function() {
            $('.close-all-modal').modal('hide');
        }, 1200);
    })

    


});