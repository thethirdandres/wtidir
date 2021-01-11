$(document).ready(function() {
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

$(document).on("click",".repository-edit-button",function(){
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
})

$(document).on("click",".repository-edit-gray-button",function(){
    var currentTD = $(this).parents('tr').find('td:not(:last-child)');
    $.each(currentTD, function() {
        $(this).children('input').attr('readonly', true);
        $(this).children('select').attr('disabled', true);
    })
    $(this).addClass('d-none');
    $(this).prev().children('img').removeClass('d-none');

    // For Branch (Repository)
    if ($(this).hasClass('in-branch')) {
        $(".repo-edit-quota-button").addClass('d-none');
    }
});

// ~ ~ ~ ~ ~ User Page Eventlistener ~ ~ ~ ~ ~

// Group
$("#btn-add-user-group").click(function(){
    var AGName  = $('#AGName').val()

    if (AGName=='') {
        alert("Group Name is needed.")
        return;
    }else{
        $.ajax({
            url:"user_group_add",
            type:"POST",
            data:{AGName:AGName}
        }).done(function(response){
            if(response["error"]==false){
                console.log(response["Message"])
                
                var html_data="<tr id='"+response['idAccountGroup']+"'><td class='unit-input'><input type='text' class='form-control td-AG-AGName' value='"+response['AGName']+"' readonly /></td><td><a class='mr-2'><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button'></a><input type='image' src='../../static/img/repository-icons/edit-gray.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-gray-button d-none mr-2 ml-n3 account-group-update'><a><img src='../../static/img/repository-icons/deactivate.png'data-toggle='tooltip' data-placement='top' title='Deactivate' class='account-group-deactive'></a></td></tr> "
                $(html_data).prependTo(".table-account-group > tbody") 
            }else{
                console.log(response["Message"]) 
            }
        })
    }
})

$(document).on("click",".account-group-update",function(){
    $.ajax({
        url:"user_group_update",
        type:"POST",
        data:{idAccountGroup : $(this).closest('tr').attr('id'), AGName  : $(this).closest('tr').find('.td-AG-AGName').val()}
    }).done(function(response){
        if(response["error"]==false){
            console.log(response["Message"])      
        }else{
            console.log(response["Message"]) 
        }
    })
})

$('.confirm-all-modal').click(function() {
    $('.close-all-modal').modal('hide');
    var alert = $(this).parents(".content").find(".alert");
    alert.removeClass("d-none");

    setTimeout(function() {
        alert.addClass("d-none");
    }, 3000);

    $('.repository-group-tab').click(function() {
        $(this).parents('nav').prev().find('.repository-user-add-button').addClass('d-none');
    })
    $('.repository-user-tab').click(function() {
        $(this).parents('nav').prev().find('.repository-user-add-button').removeClass('d-none');
    })
});

$(document).on("click",".account-group-deactive",function(){
    var idAccountGroup = $(this).closest('tr').attr('id')
    var AGName  = $(this).closest('tr').find('.td-AG-AGName').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idAccountGroup)
    $('#dialog-deactivation-title').text('Deactivate Account Group?')
    $('#dialog-deactivation-description').text('You are about to deactivate '+ AGName +'. this action cannot be undone. Continue?')
    
    $('#btn-deactivate').removeClass('btn-deactivate').addClass('btn-deactivate-AccountGroup')   
})

$(document).on("click",".btn-deactivate-AccountGroup",function(){
    var idAccountGroup = $('#dialog-hidden-id').text()
    $.ajax({
        url:"user_group_deactivate",
        type:"POST",
        data:{idAccountGroup: idAccountGroup}
    }).done(function(response){
        if(response["error"]==false){
            console.log(response["Message"])      
        }else{
            console.log(response["Message"]) 
        }
    })

    $('table#table_account_group tr#'+idAccountGroup).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})
// * * * * * User Page Eventlistener * * * * *
// ~ ~ ~ ~ ~ Area Page Eventlistener ~ ~ ~ ~ ~
$(".btn-add-area").click(function(){
    var AName = $('#area-name').val()
    var unBranchCommi = $('#area-branch-commi').val()
    var ASAPSvr = $('#area-server').val()
    var ASAPUsr = $('#area-user').val()
    var ASAPPwd = $('#area-password').val()
    var ASAPDB = $('#area-database').val()
    var ASAPDataSource = $('#area-datasource').val()


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
        }).done(function(response){
            if(response["error"]==false){
                console.log(response["Message"])
                
                var html_data="<tr id='"+response['idArea']+"'><td><input name='AName' type='text' class='form-control td-area-AName' value='"+response['AName']+"' readonly /></td><td><input name='unBranchCommi' type='text' class='form-control td-area-unBranchCommi' value='"+response['unBranchCommi']+"' readonly /></td><td><input name='ASAPSvr' type='text' class='form-control td-area-ASAPSvr' value='"+response['ASAPSvr']+"' readonly /></td><td><input name='ASAPUsr' type='text' class='form-control td-area-ASAPUsr' value='"+response['ASAPUsr']+"' readonly /></td><td><input name='ASAPPwd' type='text' class='form-control td-area-ASAPPwd' value='"+response['ASAPPwd']+"' readonly /></td><td><input name='ASAPDB' type='text' class='form-control td-area-ASAPDB' value='"+response['ASAPDB']+"' readonly /></td><td><input name='ASAPDataSource' type='text' class='form-control td-area-ASAPDataSource' value='"+response['ASAPDataSource']+"' readonly /></td><td class='d-flex'><a class='mr-2'><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button'></a><input type='image' src='../../static/img/repository-icons/edit-gray.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-gray-button d-none mr-2 ml-n3 btn-area-update'><a><img src='../../static/img/repository-icons/deactivate.png'data-toggle='tooltip' data-placement='top' title='Deactivate' class='area-deactivate'></a></td></tr>"
                $(html_data).prependTo(".table-area > tbody") 
            }else{
                console.log(response["Message"]) 
            }
        })
    }
})

$(document).on("click",".area-deactivate",function(){
    var idArea = $(this).closest('tr').attr('id')
    var AName = $(this).closest('tr').find('.td-area-AName').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idArea)
    $('#dialog-deactivation-title').text('Deactivate Area?')
    $('#dialog-deactivation-description').text('You are about to deactivate '+ AName +'. this action cannot be undone. Continue?')
    
    $('#btn-deactivate').removeClass('btn-deactivate').addClass('btn-deactivate-area')   
})

$(document).on("click",".btn-deactivate-area",function(){
    var idArea = $('#dialog-hidden-id').text()

    $.ajax({
        url:"area_delete",
        type:"POST",
        data:{idArea:idArea}
    }).done(function(response){
        if(response["error"]==false){
            console.log(response["Message"])      
        }else{
            console.log(response["Message"]) 
        }
    })

    $('table#table_area tr#'+idArea).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})

$(document).on("click",".btn-area-update",function(){
    var idArea = $(this).closest('tr').attr('id')
    var AName = $(this).closest('tr').find('.td-area-AName').val()
    var ASAPSvr = $(this).closest('tr').find('.td-area-ASAPSvr').val()
    var ASAPDB = $(this).closest('tr').find('.td-area-ASAPDB').val()
    var ASAPUsr = $(this).closest('tr').find('.td-area-ASAPUsr').val()
    var ASAPPwd = $(this).closest('tr').find('.td-area-ASAPPwd').val()
    var ASAPDataSource = $(this).closest('tr').find('.td-area-ASAPDataSource').val()

    $.ajax({
        url:"area_update",
        type:"POST",
        data:{idArea:idArea, AName:AName, ASAPSvr:ASAPSvr, ASAPDB:ASAPDB, ASAPUsr:ASAPUsr, ASAPPwd:ASAPPwd, ASAPDataSource:ASAPDataSource}
    }).done(function(response){
        if(response["error"]==false){
            console.log(response["Message"])      
        }else{
            console.log(response["Message"]) 
        }
    })
})
// * * * * * Area Page Eventlistener * * * * *
// ~ ~ ~ ~ ~ Branch Page Eventlistener ~ ~ ~ ~ ~
$("#btn-branch-add").click(function(){
    var BName = $('#branch-name').val()
    var AName  = $('#branch-area').val()
    var TICName = $('#branch-template').val()
    var TPBName  = $('#branch-BOM').val()
    var BSAPCode   = $('#branch-sapcode').val()
    var BType = $('#branch-type').val()
    var BDescription = $('#branch-desc').val()

    if (BName == "") {
        alert("Branch Name is needed.")
        return;
    } else if (AName == null) {
        alert("Area is needed.")
        return;
    } else if (TICName == null) {
        alert("Template is needed.")
        return;
    } else if (TPBName == null) {
        alert("BOM is needed.")
        return;
    } else if (BType == null) {
        alert("Type is needed.")
        return;
    } else {
        $.ajax({
            url:"branch_add",
            type:"POST",
            data:{BName:BName}    
        })
    }
})
// * * * * * Branch Page Eventlistener * * * * *