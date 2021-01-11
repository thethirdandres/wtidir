$(document).ready(function() {
    $('.repository-edit-button').click(function() {
        var currentTD = $(this).parents('tr').find('td:not(:last-child)');
        $.each(currentTD, function() {
            $(this).children('input').attr('readonly', false);
            $(this).children('select').attr('disabled', false);
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
            $(this).children('select').attr('disabled', true);

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
        $('.close-all-modal').modal('hide');
        var alert = $(this).parents(".content").find(".alert");
        alert.removeClass("d-none");

        setTimeout(function() {
            alert.addClass("d-none");
        }, 3000);

    })

    $('.repository-group-tab').click(function() {
        $(this).parents('nav').prev().find('.repository-user-add-button').addClass('d-none');
    })
    $('.repository-user-tab').click(function() {
        $(this).parents('nav').prev().find('.repository-user-add-button').removeClass('d-none');
    })

});