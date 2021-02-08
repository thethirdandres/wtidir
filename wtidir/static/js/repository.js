$(document).ready(function() {
    // For Branch (Repository)
    // if ($(this).hasClass('in-branch')) {
    //     $(".repo-edit-quota-button").style.display === "block" ? document.getElementById("repo-edit-quota-button").style.display = "none" : document.getElementById("repo-edit-quota-button").style.display = "block";
    // }

    $('.confirm-all-modal').click(function() {
        setTimeout(function() {
            $('.close-all-modal').modal('hide');
        }, 1200);
    })


    // $(".selectarea-checkbox-list").find("input[type=checkbox]").click(function() {
    //     if ($(this).is(':checked')) {
    //         // alert("hahaha");
    //         $('.selectarea-select-button').attr('disabled', false).removeClass('button-disable');
    //     } else {
    //         $('.selectarea-select-button').attr('disabled', true).addClass('button-disable');
    //     }
    // })

    // var checkBoxes = $('.selectarea-checkbox-list').find('input[type=checkbox]');
    // checkBoxes.change(function() {
    //     $('.selectarea-select-button').prop('disabled', checkBoxes.filter(':checked').length < 1);
    //     if (checkBoxes.filter(':checked').length > 0) {
    //         $('.selectarea-select-button').removeClass('button-disable');
    //     } else {
    //         $('.selectarea-select-button').addClass('button-disable');
    //     }
    // });
    // checkBoxes.change(); // or add disabled="true" in the HTML

});

$(document).on("click", ".selectarea-checkbox-list", function(){
    var checkBoxes = $(this).find('input[type=checkbox]')

    $('.selectarea-select-button').prop('disabled', checkBoxes.filter(':checked').length < 1)
    if (checkBoxes.filter(':checked').length > 0) {
        $('.selectarea-select-button').removeClass('button-disable')
    } else {
        $('.selectarea-select-button').addClass('button-disable')
    }
})

$(document).on("click", ".repository-edit-button", function() {
    var currentTD = $(this).parents('tr').find('td:not(:last-child)');
    $.each(currentTD, function() {
        $(this).children('input').attr('readonly', false);
        $(this).children('select').attr('disabled', false);
        // // For Branch (Repository)
        // if ($(this).parents('tr').find('.repository-edit-button').hasClass('in-branch')) {
        //     $(this).parents('tr').find('.repo-edit-quota-button').removeClass('d-none');
        // }
    });
    $(this).addClass('d-none');
    $(this).parents('a').next().removeClass('d-none');

    // For Branch (Repository)
    if ($(this).hasClass('in-branch')) {
        $(this).parents().siblings(".repo-edit-quota-button").removeClass('d-none');
    }

})

$(document).on("click", ".repository-edit-gray-button", function() {
    var currentTD = $(this).parents('tr').find('td:not(:last-child)');
    $.each(currentTD, function() {
        $(this).children('input').attr('readonly', true);
        $(this).children('select').attr('disabled', true);

    })
    $(this).addClass('d-none');
    $(this).prev().children('img').removeClass('d-none');

    // For Branch (Repository)
    if ($(this).hasClass('in-branch')) {
        $(this).siblings('#repo-edit-quota-button').addClass('d-none');
    }
});



$('.confirm-all-modal').click(function() {
    if ($(this).hasClass('prompt_confirmcreateuser')) {
        $('.close-all-modal').modal('hide');
        var alert = $(this).parents(".content").find(".alert_confirmcreateuser");
        alert.removeClass("d-none");

            if($(this)) {}; //remove if not used;
        setTimeout(function() {
            alert.addClass("d-none");
        }, 3000);
    } else if ($(this).hasClass("button-red")) {
        setTimeout(function() {
            $('.close-all-modal').modal('hide');
        }, 3000);
    } else if ($('#AGName').val() !== "" &&
        ($('#area-server').val() !== "" &&
            $('#area-name').val() !== "" &&
            $('#area-user').val() !== "" &&
            $('#area-password').val() !== "" &&
            $('#area-database').val() !== "" &&
            $('#area-datasource').val() !== "")) {
        $('.close-all-modal').modal('hide');
        var alert = $(this).parents(".content").find(".alert");
        alert.removeClass("d-none");

        setTimeout(function() {
            alert.addClass("d-none");
        }, 3000);
    }
});


$('.repository-group-tab').click(function() {
    $(this).parents('nav').prev().find('.repository-user-add-button').addClass('d-none');
})

$('.repository-user-tab').click(function() {
    $(this).parents('nav').prev().find('.repository-user-add-button').removeClass('d-none');
})

    ///////////////////////// end of Andres' JQueries //////////////////////////////

    // ~ ~ ~ ~ ~ User Page Eventlistener ~ ~ ~ ~ ~

//User Account
$("#btn-open-createuser-modal").click(function() {

    $('#account-group').empty()
    $('#area-list').empty()

    $.ajax({
        url: "user_group_list",
        type: "GET"
    }).done(function(response) {
        response['AccountGroups'].forEach(account_group)
        response['areas'].forEach(areas)

        function account_group(item) {
            $('#account-group').append($('<option></option>').val(item['idAccountGroup']).html(item['AGName']))
        }

        function areas(item) {
            var html_data = "<li><label for='cb" + item['AName'] + "'><input type='checkbox' class='form-check-input' id='" + item['idArea'] + "' value='" + item['AName'] + "'>" + item['AName'] + "</label></li>"
                // $('#area-list').append($('<li></li>').val(item['idArea']).html(item['AName']))
            $('#area-list').append(html_data)
        }
    })
})

$(document).on("click",".load-account-group", function(){
    var idgroupaccount = $(this).closest('tr').find('.account-group-new-add-html').children(':selected').attr('id')
    var groupname = $(this).closest('tr').find('.account-group-new-add-html').find('option:selected').text()
    console.log(idgroupaccount)
    $('.account-group-new-add-html').empty()

    var html_data="<option selected selected id='"+idgroupaccount+"'>"+groupname+"</option>"
    $('.account-group-new-add-html').append(html_data)

    $.ajax({
        url:"user_group_list",
        type:"GET"
    }).done(function(response){
        response['AccountGroups'].forEach(account_group)
        function account_group(item){

            if (idgroupaccount != item['idAccountGroup']) {
                var html_data="<option selected id='"+item['idAccountGroup']+"'>"+item['AGName']+"</option>"        
               $('.account-group-new-add-html').append(html_data)
            }

        }
    })

})

$(document).on("click", ".btn-user-account-update", function(){
    var id = $(this).closest('tr').attr('id') 
    var lastname = $(this).closest('tr').find('.td-au-lastname').val()
    var firstname = $(this).closest('tr').find('.td-au-firstname').val()
    var middlename = $(this).closest('tr').find('.td-au-middlename').val()
    var username = $(this).closest('tr').find('.td-au-username').val()
    var emailaddress = $(this).closest('tr').find('.td-au-emailaddress').val()
    var idgroupaccount = $(this).closest('tr').find('.user-html-account-group').children(':selected').attr('id')
    var groupname = $(this).closest('tr').find('.user-html-account-group').find('option:selected').text()
    
    $.ajax({
        url: "user_account_update",
        type: "POST",
        data: {id:id, lastname:lastname, firstname:firstname, middlename:middlename, username:username, emailaddress:emailaddress,idgroupaccount:idgroupaccount, groupname:groupname}
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".btn-user-select-area", function(){
    var id = $(this).closest('tr').attr('id')
    $('#user-hidden-id').text(id)

    $('#area-list').empty()

    $.ajax({
        url:"user_account_area_access_init",
        type:"POST",
        data:{iduser:id}
    }).done(function(response){
        response['areas'].forEach(function(area){
            var html_data="<li><label for='cb"+area['AName']+"'><input type='checkbox' class='form-check-input "+area['idArea']+"' id='"+area['idArea']+"' name='cb' value='"+area['AName']+"'>"+area['AName']+"</label></li>"
            $('#area-list').append(html_data)
        })

        $("input[type=checkbox]").each(function(){
            user_area_access($(this).attr('id'))           
        })

        function user_area_access(idArea){
            response['useraccounts'].forEach(function(useraccess){

                if (idArea ==  useraccess['idArea']) {
                    // console.log('area id: '+useraccess['Status'])
                    if (useraccess['Status']) {
                        $("." + useraccess['idArea']).prop('checked', true)
                    }
                }
            })
        }
    })

})

$('#btn-user-account-area-submit').click(function(){
    var id = $('#user-hidden-id').text()

    $("input[type=checkbox]").each(function(){

        if ($('.' + $(this).attr('id')).is(":checked")) {
            $.ajax({
                url: "user_account_area",
                type: "POST",
                data: {iduser:id, idarea:$(this).attr('id'), namearea:$(this).val(), status:1}
            }).done(function(response) {
                if (response["error"] == false) {
                    console.log(response["Message"])
        
                } else {
                    console.log(response["Message"])
                }
            })
        }else{
            $.ajax({
                url: "user_account_area",
                type: "POST",
                data: {iduser:id, idarea:$(this).attr('id'), namearea:$(this).val(), status:0}
            }).done(function(response) {
                if (response["error"] == false) {
                    console.log(response["Message"])
        
                } else {
                    console.log(response["Message"])
                }
            })
        }
        
    })

    $('#prompt_doneselectarea').modal('show')

    setTimeout(function() {
        $('#prompt_doneselectarea').modal('hide')
    }, 1000);

    setTimeout(function() {
        $('#modal_selectarea').modal('hide')
    }, 1200);
})

$('#btn-change-pass-auth').click(function(){
    // console.log($("#new-password").val())
    if ($("#new-password").val() == '') {
        alert("Password is needed.")
        return;
    } else if ($("#verify-password").val() == '') {
        alert("Vefify Password is needed.")
        return;
    }else{
        if ($("#new-password").val() != $("#verify-password").val()) {
            alert("Verify Password does not match with the Password")
            return;
        } else {
            $('#prompt_confirmchangepassword').modal('show')
        }
    }
})

$('.btn-user-change-pass-init').click(function(){
    var id = $(this).closest('tr').attr('id')
    // console.log(id)
    $('#user-hidden-id').text(id)
})

$('#btn-change-pass').click(function(){
    var id = $('#user-hidden-id').text()
    var newpassword = $("#new-password").val()

    $.ajax({
        url: "user_account_change_password",
        type: "POST",
        data: {id:id, newpassword:newpassword}
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])

        } else {
            console.log(response["Message"])
        }
    })

    $('#prompt_donechangepassword').modal('show')

    setTimeout(function() {
        $('#prompt_donechangepassword').modal('hide')
    }, 1000);
    
    setTimeout(function() {
        $('#prompt_confirmchangepassword').modal('hide')
    }, 1200);

    setTimeout(function() {
        $('#modal_changepassword').modal('hide')

        document.getElementById("new-password").value=""
        document.getElementById("verify-password").value=""

        $(".modal-fade").modal("hide")
        $(".modal-backdrop").remove()
    }, 2300);

})

$('#btn-change-pass-cancel').click(function(){
    $('#prompt_confirmchangepassword').modal('hide')
})

$('#btn-init-createuser-auth').click(function(){
    if ($("#username").val() == '') {
        alert("Username is needed.")
        return;
    } else if ($("#lastname").val() == '') {
        alert("Last Name is needed.")
        return;
    } else if ($("#firstname").val() == '') {
        alert("First Name is needed.")
        return;
    } else if ($("#middlename").val() == '') {
        alert("Middle Name is needed.")
        return;
    } else if ($("#emailaddress").val() == '') {
        alert("Email Address is needed.")
        return;
    } else if ($("#password").val() == '') {
        alert("Password is needed.")
        return;
    } else if ($("#verifypassword").val() == '') {
        alert("Vefify Password is needed.")
        return;
    }else{
        if ($("#password").val() != $("#verifypassword").val()) {
            alert("Verify Password does not match with the Password")
            return;
        } else {
            $('#prompt_confirmcreateuser').modal('show')
        }
    }
})

$('#create-account-prompt-cancel').click(function(){
    $('#prompt_confirmcreateuser').modal('hide')
})

$("#user-account-create").click(function(){
    var username=$("#username").val()
    var lastname=$("#lastname").val()
    var firstname=$("#firstname").val()
    var middlename=$("#middlename").val()
    var emailaddress=$("#emailaddress").val()
    var password=$("#password").val()
    var idgroup=$("#account-group").children(':selected').attr('value')
    var groupname=$("#account-group").find('option:selected').text()

    $.ajax({
        url: "user_account_add",
        type: "POST",
        data: {username:username, lastname:lastname, firstname:firstname, middlename:middlename, emailaddress:emailaddress, password:password, idgroup:idgroup, groupname:groupname}
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])

            var html_data = " <tr id='"+response['idAccountUser']+"'><td><input type='text' class='form-control td-au-lastname' value='"+response['AULastName']+"' readonly /></td><td><input type='text' class='form-control td-au-firstname' value='"+response['AUFirstName']+"' readonly /></td><td><input type='text' class='form-control td-au-middlename' value='"+response['AUMiddleName']+"' readonly /></td><td><input type='text' class='form-control td-au-username' value='"+response['AUUserName']+"' readonly /></td><td><input type='text' class='form-control td-au-emailaddress' value='"+response['AUEmail']+"' readonly /></td><td><select class='form-control user-html-account-group account-group-new-add-html' disabled><option selected disabled id='"+response['idAccountGroup']+"'>"+response['AGName']+"</option></select></td><td><input type='text' class='form-control td-au-status' value='Active' disabled/></td><td class='d-flex td-au-actions'> <a class='mr-2' data-toggle='modal' data-target='#modal_selectarea'><img src='../../static/img/repository-icons/selectarea.png' data-toggle='tooltip' data-placement='top' title='Select Area' class='btn-user-select-area'></a><a class='mr-2' data-toggle='modal' data-target='#modal_changepassword'><img src='../../static/img/repository-icons/changepassword.png' data-toggle='tooltip' data-placement='top' title='Change Password' class='btn-user-change-pass-init'></a><a class=''><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button load-account-group'></a><input type='image' src='../../static/img/repository-icons/edit-gray.png'  data-toggle='modal' data-target='#prompt_doneedituser' class='repository-edit-gray-button d-none btn-user-account-update'><a><img src='../../static/img/repository-icons/deactivate.png' data-toggle='tooltip' data-placement='top' title='Deactivate' class='btn-user-account-deactivate'></a></td></tr>"
            $(html_data).prependTo("#table-user-account> tbody")

            setTimeout(function() {
                $('#prompt_confirmcreateuser').modal('hide')
            }, 100);

            setTimeout(function() { 
                $('#modal_createuser').modal('hide')

                document.getElementById("username").value=""
                document.getElementById("lastname").value=""
                document.getElementById("firstname").value=""
                document.getElementById("middlename").value=""
                document.getElementById("emailaddress").value=""
                document.getElementById("password").value=""
                document.getElementById("verifypassword").value=""

                $(".modal-fade").modal("hide")
                $(".modal-backdrop").remove()
            }, 300);

        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".btn-user-account-deactivate", function() {

    var id = $(this).closest('tr').attr('id')
    var username = $(this).closest('tr').find('.td-au-username').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(id)
    $('#dialog-deactivation-title').text('Deactivating User Account. . . ')
    $('#dialog-deactivation-description').text('You are about to deactivate ' + username + '. this action cannot be undone. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('btn-deactivate-UserAccount')
})

$(document).on("click", ".btn-deactivate-UserAccount", function() {
    var id = $('#dialog-hidden-id').text()

    $.ajax({
        url: "user_account_deactivate",
        type: "POST",
        data: { id:id }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])

        } else {
            console.log(response["Message"])
        }
    })

    $('table#table-user-account tr#' + id).closest('tr').find('.td-au-actions').remove()
    $('table#table-user-account tr#' + id).closest('tr').find('.td-au-status').val('Deactivated')
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})

// Group
$("#btn-add-user-group").click(function() {
    var AGName = $('#AGName').val()

    if (AGName == '') {
        alert("Group Name is needed.")
        return;
    } else {
        $.ajax({
            url: "user_group_add",
            type: "POST",
            data: { AGName: AGName }
        }).done(function(response) {
            if (response["error"] == false) {
                console.log(response["Message"])

                var html_data = "<tr id='" + response['idAccountGroup'] + "'><td class='unit-input'><input type='text' class='form-control td-AG-AGName' value='" + response['AGName'] + "' readonly /></td><td><a class='mr-2'><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button'></a><input type='image' src='../../static/img/repository-icons/edit-gray.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-gray-button d-none mr-2 ml-n3 account-group-update'><a><img src='../../static/img/repository-icons/deactivate.png'data-toggle='tooltip' data-placement='top' title='Deactivate' class='account-group-deactive'></a></td></tr> "
                $(html_data).prependTo(".table-account-group > tbody")
            } else {
                console.log(response["Message"])
            }
        })
    }
})

$(document).on("click", ".account-group-update", function() {
    $.ajax({
        url: "user_group_update",
        type: "POST",
        data: { idAccountGroup: $(this).closest('tr').attr('id'), AGName: $(this).closest('tr').find('.td-AG-AGName').val() }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".account-group-deactive", function() {
    var idAccountGroup = $(this).closest('tr').attr('id')
    var AGName = $(this).closest('tr').find('.td-AG-AGName').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idAccountGroup)
    $('#dialog-deactivation-title').text('Deactivate Account Group?')
    $('#dialog-deactivation-description').text('You are about to deactivate ' + AGName + '. this action cannot be undone. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('btn-deactivate-AccountGroup')
})

$(document).on("click", ".btn-deactivate-AccountGroup", function() {
    var idAccountGroup = $('#dialog-hidden-id').text()
    $.ajax({
        url: "user_group_deactivate",
        type: "POST",
        data: { idAccountGroup: idAccountGroup }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })

    $('table#table_account_group tr#' + idAccountGroup).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})
    // * * * * * User Page Eventlistener * * * * *
    // ~ ~ ~ ~ ~ Area Page Eventlistener ~ ~ ~ ~ ~
$(".btn-add-area").click(function() {
    var AName = $('#area-name').val()
    var unBranchCommi = $('#area-branch-commi').val()
    var ASAPSvr = $('#area-server').val()
    var ASAPUsr = $('#area-user').val()
    var ASAPPwd = $('#area-password').val()
    var ASAPDB = $('#area-database').val()
    var ASAPDataSource = $('#area-datasource').val()


    if (AName == '') {
        alert("Area Name is needed.")
        return;
    } else if (unBranchCommi == null) { //Andres added this condition 1/12/21
        alert("Commi Branch is needed.")
        return;
    } else if (ASAPSvr == '') {
        alert("Server Name is needed.")
        return;
    } else if (ASAPUsr == '') {
        alert("Username Name is needed.")
        return;
    } else if (ASAPPwd == '') {
        alert("Password is needed.")
        return;
    } else if (ASAPDB == '') {
        alert("Database is needed.")
        return;
    } else if (ASAPDataSource == '') {
        alert("Data Source is needed.")
        return;
    } else {
        $.ajax({
            url: "area_add",
            type: "POST",
            data: { AName: AName, unBranchCommi: unBranchCommi, ASAPSvr: ASAPSvr, ASAPUsr: ASAPUsr, ASAPPwd: ASAPPwd, ASAPDB: ASAPDB, ASAPDataSource: ASAPDataSource }
        }).done(function(response) {
            if (response["error"] == false) {
                console.log(response["Message"])

                var html_data = "<tr id='" + response['idArea'] + "'><td><input name='AName' type='text' class='form-control td-area-AName' value='" + response['AName'] + "' readonly /></td><td><input name='unBranchCommi' type='text' class='form-control td-area-unBranchCommi' value='" + response['unBranchCommi'] + "' readonly /></td><td><input name='ASAPSvr' type='text' class='form-control td-area-ASAPSvr' value='" + response['ASAPSvr'] + "' readonly /></td><td><input name='ASAPUsr' type='text' class='form-control td-area-ASAPUsr' value='" + response['ASAPUsr'] + "' readonly /></td><td><input name='ASAPPwd' type='text' class='form-control td-area-ASAPPwd' value='" + response['ASAPPwd'] + "' readonly /></td><td><input name='ASAPDB' type='text' class='form-control td-area-ASAPDB' value='" + response['ASAPDB'] + "' readonly /></td><td><input name='ASAPDataSource' type='text' class='form-control td-area-ASAPDataSource' value='" + response['ASAPDataSource'] + "' readonly /></td><td class='d-flex'><a class='mr-2'><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button'></a><input type='image' src='../../static/img/repository-icons/edit-gray.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-gray-button d-none mr-2 ml-n3 btn-area-update'><a><img src='../../static/img/repository-icons/deactivate.png'data-toggle='tooltip' data-placement='top' title='Deactivate' class='area-deactivate'></a></td></tr>"
                $(html_data).prependTo(".table-area > tbody")
            } else {
                console.log(response["Message"])
            }
        })
    }
})

$(document).on("click", ".area-deactivate", function() {
    var idArea = $(this).closest('tr').attr('id')
    var AName = $(this).closest('tr').find('.td-area-AName').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idArea)
    $('#dialog-deactivation-title').text('Deactivate Area?')
    $('#dialog-deactivation-description').text('You are about to deactivate ' + AName + '. this action cannot be undone. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('btn-deactivate-area')
})

$(document).on("click", ".btn-deactivate-area", function() {
    var idArea = $('#dialog-hidden-id').text()

    $.ajax({
        url: "area_delete",
        type: "POST",
        data: { idArea: idArea }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })

    $('table#table_area tr#' + idArea).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})

$(document).on("click", ".btn-area-update", function() {
        var idArea = $(this).closest('tr').attr('id')
        var AName = $(this).closest('tr').find('.td-area-AName').val()
        var ASAPSvr = $(this).closest('tr').find('.td-area-ASAPSvr').val()
        var ASAPDB = $(this).closest('tr').find('.td-area-ASAPDB').val()
        var ASAPUsr = $(this).closest('tr').find('.td-area-ASAPUsr').val()
        var ASAPPwd = $(this).closest('tr').find('.td-area-ASAPPwd').val()
        var ASAPDataSource = $(this).closest('tr').find('.td-area-ASAPDataSource').val()

        $.ajax({
            url: "area_update",
            type: "POST",
            data: { idArea: idArea, AName: AName, ASAPSvr: ASAPSvr, ASAPDB: ASAPDB, ASAPUsr: ASAPUsr, ASAPPwd: ASAPPwd, ASAPDataSource: ASAPDataSource }
        }).done(function(response) {
            if (response["error"] == false) {
                console.log(response["Message"])
            } else {
                console.log(response["Message"])
            }
        })
    })
    // * * * * * Area Page Eventlistener * * * * *
    // ~ ~ ~ ~ ~ Branch Page Eventlistener ~ ~ ~ ~ ~
$("#btn-branch-add").click(function() {
    var BName = $('#branch-name').val()
    var idArea = $("#branch-area option:selected").attr("id")
    var AName = $('#branch-area').val()
    var TICName = $('#branch-template').val()
    var TPBName = $('#branch-BOM').val()
    var BSAPCode = $('#branch-sapcode').val()
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
            url: "branch_add",
            type: "POST",
            data: { BName: BName, idArea: idArea, AName: AName, TICName: TICName, TPBName: TPBName, BSAPCode: BSAPCode, BType: BType, BDescription: BDescription }
        }).done(function(response) {
            if (response["error"] == false) {
                console.log(response["Message"])

                var html_data = "<tr id='"+response['idBranch']+"'><td><input type='text' class='form-control td-branch-name' value='"+response['BName']+"' readonly /></td><td><select class='form-control td-branch-area' disabled><option>"+response['AName']+"</option></select></td><td><select class='form-control td-branch-TICName' disabled><option selected>"+response['TICName']+"</option></select></td><td><select class='form-control td-branch-TPBName' disabled><option selected>"+response['TPBName']+"</option></select></td><td><input type='text' class='form-control td-branch-BSAPCode' value='"+response['BSAPCode']+"' readonly /></td><td><select class='form-control td-branch-Btype' disabled><option selected>"+response['BType']+"</option></select></td><td><input type='text' class='form-control td-branch-BDesc' value='"+response['BDescription']+"' readonly /></td><td class='d-flex'><a class='mr-2'><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button in-branch'></a><input type='image' src='../../static/img/repository-icons/edit-gray.png' data-toggle='modal' data-target='#prompt_doneeditbranch' title='Edit' class='repository-edit-gray-button in-branch d-none mr-2 ml-n3 btn-update-branch'><a class='mr-2'><img src='../../static/img/repository-icons/delete.png' data-toggle='tooltip' data-placement='top' title='Deactivate' class='deactivate-branch'></a></td></tr>"
                $(html_data).prependTo("#table-branch > tbody")
            } else {
                console.log(response["Message"])
            }
        })
    }
})

$(document).on("click", ".btn-update-branch", function() {
    var idBranch = $(this).closest('tr').attr('id') 
    var branchName=$(this).closest('tr').find(".td-branch-name").val()
    var branchArea=$(this).closest('tr').find(".td-branch-area").find('option:selected').text()
    var branchTICName=$(this).closest('tr').find(".td-branch-TICName").find('option:selected').text()
    var branchTPBName=$(this).closest('tr').find(".td-branch-TPBName").find('option:selected').text()
    var branchBSAPCode=$(this).closest('tr').find(".td-branch-BSAPCode").val()
    var branchBtype=$(this).closest('tr').find(".td-branch-Btype").find('option:selected').text()
    var branchBDesc=$(this).closest('tr').find(".td-branch-BDesc").val()
 
    $.ajax({
        url: "branch_update",
        type: "POST",
        data: {idBranch:idBranch, branchName: branchName, branchArea:branchArea, branchTICName:branchTICName, 
                branchTPBName:branchTPBName, branchBSAPCode:branchBSAPCode, branchBtype:branchBtype, branchBDesc:branchBDesc}
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".deactivate-branch", function() {
    var idBranch = $(this).closest('tr').attr('id')
    var branchName = $(this).closest('tr').find('.td-branch-name').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idBranch)
    $('#dialog-deactivation-title').text('Deactivate Branch?')
    $('#dialog-deactivation-description').text('You are about to deactivate branch ' + branchName + '. This action cannot be undone afterwards. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('btn-deactivate-branch')
})

$(document).on("click", ".btn-deactivate-branch", function() {
    var idBranch = $('#dialog-hidden-id').text()

    $.ajax({
        url: "branch_deactivate",
        type: "POST",
        data: { idBranch: idBranch }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })

    $('table#table-branch tr#' + idBranch).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})
    // * * * * * Branch Page Eventlistener * * * * *
    // ~ ~ ~ ~ ~ Employee Page Eventlistener ~ ~ ~ ~ ~
// Group
$("#btn-create-emplo-group").click(function() {
    var emploGroupName = $('#emplo-group-name').val()
    var emploGroupCredential = $("#credential-level").find('option:selected').text()
    
    if (emploGroupName == '') {
        alert("Employee Group Name is needed.")
        return;
    }

    $.ajax({
        url: "employee_group_add",
        type: "POST",
        data: { emploGroupName: emploGroupName, emploGroupCredential: emploGroupCredential }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])

            var html_data = "<tr id='"+response['idEmployeeGroup']+"'><td><input type='text' class='form-control td-emplo-group-name' value='"+response['EGName']+"' readonly /></td><td> <select class='form-control td-emplo-group-credential' disabled><option selected disabled>"+response['EGLevel']+"</option><option>1</option><option>2</option><option>3</option><option>4</option></select></td><td class='w-25'><a class='mr-2'><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button'></a><input type='image' src='../../static/img/repository-icons/edit-gray.png' class='repository-edit-gray-button d-none mr-2 ml-n3 btn-emplo-group-update'><a><img src='../../static/img/repository-icons/deactivate.png'data-toggle='tooltip' data-placement='top' title='Deactivate' class='btn-emplo-group-deactive'></a></td></tr>"
            $(html_data).prependTo("#table-emplo-group > tbody")
        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".btn-emplo-group-deactive", function(){
    var idEmploGroup = $(this).closest('tr').attr('id')
    var emploGroupName = $(this).closest('tr').find('.td-emplo-group-name').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idEmploGroup)
    $('#dialog-deactivation-title').text('Deactivate Employee Group?')
    $('#dialog-deactivation-description').text('You are about to deactivate Employee Group Name ' + emploGroupName + '. This action cannot be undone afterwards. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('deactivate-emplo-group')
})

$(document).on("click", ".btn-emplo-group-update", function(){
    var idEmploGroup = $(this).closest('tr').attr('id')
    var emploGroupName = $(this).closest('tr').find('.td-emplo-group-name').val()
    var emploGroupCredential = $(this).closest('tr').find('.td-emplo-group-credential').find('option:selected').text()
  
    $.ajax({
        url: "employee_group_update",
        type: "POST",
        data: {idEmploGroup: idEmploGroup, emploGroupName: emploGroupName, emploGroupCredential: emploGroupCredential}
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".deactivate-emplo-group", function(){
    var idEmploGroup = $('#dialog-hidden-id').text()

    $.ajax({
        url: "employee_group_deactivate",
        type: "POST",
        data: { idEmploGroup: idEmploGroup }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })

    $('table#table-emplo-group tr#' + idEmploGroup).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})
// Employee
$("#btn-add-new-emplo").click(function() {
    var idEmploGroup = $(this).closest('tr').find('#cb-emplo-group').children(':selected').attr('id')
    // var groupname = $(this).closest('tr').find('.account-group-new-add-html').find('option:selected').text()
    // console.log(idgroupaccount)
    $('#cb-emplo-group').empty()

    // var html_data="<option selected selected id='"+idgroupaccount+"'>"+groupname+"</option>"
    // $('.account-group-new-add-html').append(html_data)

    $.ajax({
        url:"employee_group_list",
        type:"GET"
    }).done(function(response){
        response['emplogroups'].forEach(account_group)
        function account_group(item){

            if (idEmploGroup != item['idEmployeeGroup']) {
                var html_data="<option selected id='"+item['idEmployeeGroup']+"'>"+item['EGName']+"</option>"        
               $('#cb-emplo-group').append(html_data)
            }

        }
    })
})
    // * * * * * Employee Page Eventlistener * * * * *
    // ~ ~ ~ ~ ~ UOM Page Eventlistener ~ ~ ~ ~ ~
$("#btn-new-uom").click(function() {
    var PUOMName = $('#txt-puom-name').val()
    
    if (PUOMName == '') {
        alert("Product UOM Name is needed.")
        return;
    }

    $.ajax({
        url: "ProductUOM_add",
        type: "POST",
        data: { PUOMName: PUOMName }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])

            var html_data = "<tr id='"+response['idProductUOM']+"'><td class='unit-input'><input type='text' class='form-control td-product-uom-name' value='"+response['PUOMName']+"' readonly /></td><td><a><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button'></a><input type='image' src='../../static/img/repository-icons/edit-gray.png' data-toggle='modal' data-target='#prompt_doneedituom' class='repository-edit-gray-button d-none btn-product-uom-update'><a><img src='../../static/img/repository-icons/deactivate.png'data-toggle='tooltip' data-placement='top' title='Deactivate' class='btn-product-uom-deactivate'></a></td></tr>"
            $(html_data).prependTo("#tbl-product-uom > tbody")
        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".btn-product-uom-deactivate", function(){
    var idPUOM = $(this).closest('tr').attr('id')
    var PUOMName = $(this).closest('tr').find('.td-product-uom-name').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idPUOM)
    $('#dialog-deactivation-title').text('Deactivate Product UOM?')
    $('#dialog-deactivation-description').text('You are about to deactivate Product UOM Name ' + PUOMName + '. This action cannot be undone afterwards. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('deactivate-product-uom')
})

$(document).on("click", ".deactivate-product-uom", function(){
    var idPUOM = $('#dialog-hidden-id').text()

    $.ajax({
        url: "ProductUOM_deactivate",
        type: "POST",
        data: { idPUOM: idPUOM }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })

    $('table#tbl-product-uom tr#' + idPUOM).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})

$(document).on("click", ".btn-product-uom-update", function(){
    var idPUOM = $(this).closest('tr').attr('id')
    var PUOMName = $(this).closest('tr').find('.td-product-uom-name').val()

    $.ajax({
        url: "ProductUOM_update",
        type: "POST",
        data: { idPUOM: idPUOM, PUOMName: PUOMName }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })
})
    // * * * * * UOM Page Eventlistener * * * * *