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
        setTimeout(function() {
            $('.close-all-modal').modal('hide');
        }, 1200);
    })
});

    $('.repository-group-tab').click(function() {
        $(this).parents('nav').prev().find('.repository-user-add-button').addClass('d-none');
    })
    $('.repository-user-tab').click(function() {
        $(this).parents('nav').prev().find('.repository-user-add-button').removeClass('d-none');
    })
// ~ ~ ~ ~ ~ Area Page Eventlistener ~ ~ ~ ~ ~
$(".btn-add-area").click(function(){
    var AName = $('#area-name').val()
    var unBranchCommi = $('#area-branch-commi').val()
    var ASAPSvr = $('#area-server').val()
    var ASAPUsr = $('#area-user').val()
    var ASAPPwd = $('#area-password').val()
    var ASAPDB = $('#area-database').val()
    var ASAPDataSource = $('#area-datasource').val()

});
    if (AName==''){
        alert("Area Name is needed.")
        return;
    }else if(ASAPSvr==''){
        alert("Server Name is needed.")
        return;
    }else if(ASAPUsr==''){
        alert("Username Name is needed.")
        return;
    }else if(ASAPPwd==''){
        alert("Password is needed.")
        return;
    }else if(ASAPDB==''){
        alert("Database is needed.")
        return;
    }else if(ASAPDataSource==''){
        alert("Data Source is needed.")
        return;
    }else{
        $.ajax({
            url:"area_add",
            type:"POST",
            data:{AName:AName, unBranchCommi:unBranchCommi, ASAPSvr:ASAPSvr, ASAPUsr:ASAPUsr, ASAPPwd:ASAPPwd, ASAPDB:ASAPDB, ASAPDataSource:ASAPDataSource}
        })
    }
})
// * * * * * Area Page Eventlistener * * * * *