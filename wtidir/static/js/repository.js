$(document).ready(function() {
    $('.repository-edit-button').click(function() {
        var currentTD = $(this).parents('tr').find('td:not(:last-child)');
        $.each(currentTD, function() {
            $(this).children('input').attr('readonly', false);
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
            if(response['error']==false){
                console.log(response['Message'])
                
                var html_data="<tr id='"+response['idArea']+"'><td><input name='AName' type='text' class='form-control' value='"+response['AName']+"' readonly /></td><td><input name='unBranchCommi' type='text' class='form-control' value='"+response['unBranchCommi']+"' readonly /></td><td><input name='ASAPSvr' type='text' class='form-control' value='"+response['ASAPSvr']+"' readonly /></td><td><input name='ASAPUsr' type='text' class='form-control' value='"+response['ASAPUsr']+"' readonly /></td><td><input name='ASAPPwd' type='text' class='form-control' value='"+response['ASAPPwd']+"' readonly /></td><td><input name='ASAPDB' type='text' class='form-control' value='"+response['ASAPDB']+"' readonly /></td><td><input name='ASAPDataSource' type='text' class='form-control' value='"+response['ASAPDataSource']+"' readonly /></td></tr>"
                $(html_data).prependTo(".table-area > tbody") 
            }else{
                console.log(response['Message']) 
            }
        })
    }
})

$(document).on("click",".btn-deactivate-area",function(){
    // $('div.dialog-deactivation-title').text('testing')
    var idArea = $(this).closest('tr').attr('id')
    var AName = $(this).closest('tr').find('.td-area-AName').val()

    $('#dialog-hidden-id').text(idArea)
    $('#dialog-deactivation-title').text('Deactivate Area?')
    $('#dialog-deactivation-description').text('You are about to deactivate '+ AName +'. this action cannot be undone. Continue?')
    
    $('#btn-deactivate').removeClass('btn-deactivate').addClass('btn-deactivate-dialog')   
    // console.log('1st click '+idArea)

})

$(document).on("click",".btn-deactivate-dialog",function(){
    var idArea = $('#dialog-hidden-id').text()
    // console.log('2nd click '+idArea)

    $.ajax({
        url:"area_delete",
        type:'POST',
        data:{idArea:idArea}
    }).done(function(response){
        if(response['error']==false){
            console.log(response['Message'])      
        }else{
            console.log(response['Message']) 
        }
    })

    // $(this).closest('tr').remove()
    $('table#table_area tr#'+idArea).closest('tr').remove()
    $(".modal-fade").modal("hide");
    $(".modal-backdrop").remove();
    // $('#prompt_confirmdeactivate').modal('toggle');
    // console.log('testing')
})
// * * * * * Area Page Eventlistener * * * * *