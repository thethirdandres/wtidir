$("#init-create-employee-modal").click(function() {
    var idEmploGroup = $(this).closest('tr').find('#cb-emplo-group').children(':selected').attr('id')
    
    $('#cb-emplo-group').empty()

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

$("#btn-employee-add").click(function(){
    var ELastName = $('.txt-employee-lastname').val()
    var EFirstName = $('.txt-employee-firstname').val()
    var EMiddleName = $('.txt-employee-middlename').val()
    var EAlias = $('.txt-employee-alias').val()
    var ENumber = $('.txt-employee-idnumber').val()
    var EUsername = $('.txt-employee-username').val()
    var EPassword = $('.txt-employee-password').val()
    var idEmployeeGroup = $('#cb-emplo-group').find('option:selected').attr('id')
    var EGroup = $('#cb-emplo-group').find('option:selected').text()

    if ($('#txt-employee-password').val() == '') {
        alert("Fill all text field.")
        return
    }   

    TextBoxControl('Validate')
    
    $.ajax({
        url: "employee_add",
        type: "POST",
        data: { ELastName: ELastName, EFirstName: EFirstName, EMiddleName: EMiddleName, EAlias: EAlias,
                ENumber: ENumber, EUsername: EUsername, EPassword: EPassword, idEmployeeGroup: idEmployeeGroup, EGroup: EGroup }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])

            TextBoxControl('Clear')
            document.getElementById('textbox7').value = ''

        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".btn-employee-select-area", function(){
    console.log('testing select area')
})

$(document).on("click", ".btn-employee-change-pass-init", function(){
    console.log('testing change password')
})

$(document).on("click", ".btn-employee-update", function(){
    console.log('testing update')
})

$(document).on("click", ".btn-employee-deactivate", function(){
    console.log('testing deactivate')
})

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

    $('#prompt_confirmdeactivate').modal({backdrop: 'static', keyboard: false}, 'show')

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

function TextBoxControl(cmd) {
    var count = 1
    $('input[type=text]').each(function(){
        if ($(this).attr('id') == 'textbox' + count) {
            switch(cmd) {
                case 'Validate':
                    if ($(this).val() == '') {
                        alert("Fill all text field.")
                        return
                    }
                break;
                case 'Clear':                   
                    $(this).val('')
                break;
                default:
                
            }

            count = count + 1
        }
       
    })   
}