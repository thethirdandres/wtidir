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

            var html_data = "<tr id='"+response['idEmployee']+"'>"
                                + "<td><input type='text' class='form-control td-employee-lastname' value='"+response['ELastName']+"' readonly /></td>"
                                + "<td><input type='text' class='form-control td-employee-firstname' value='"+response['EFirstName']+"' readonly /></td>"
                                + "<td><input type='text' class='form-control td-employee-middlename' value='"+response['EMiddleName']+"' readonly /></td>"
                                + "<td><input type='text' class='form-control td-employee-alias' value='"+response['EAlias']+"' readonly /></td>"
                                + "<td><input type='text' class='form-control td-employee-enumber' value='"+response['ENumber']+"' readonly /></td>"
                                + "<td>"
                                    + "<select class='form-control td-employee-egroup' disabled>"
                                        + "<option id='"+response['idEmployeeGroup']+"'  selected>"+response['EGroup']+"</option>"
                                    + "</select>"
                                + "</td>"
                                + "<td class='d-flex td-au-actions'>"
                                    + "<a class='mr-2' data-toggle='modal' data-target='#modal_selectarea'><img src='../../static/img/repository-icons/selectarea.png' data-toggle='tooltip' data-placement='top' title='Select Area' class='btn-select-area'></a>"
                                    + "<a class='mr-2' data-toggle='modal' data-target='#modal_changepassword'><img src='../../static/img/repository-icons/changepassword.png' data-toggle='tooltip' data-placement='top' title='Change Password' class='btn-change-pass-init'></a>"
                                    + "<a><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button btn-employee-update-init'></a>"
                                    + "<input type='image' src='../../static/img/repository-icons/edit-gray.png'  data-toggle='modal' data-target='#prompt_doneedituser' class='repository-edit-gray-button d-none btn-employee-update'>"
                                    + "<a><img src='../../static/img/repository-icons/deactivate.png' data-toggle='tooltip' data-placement='top' title='Deactivate' class='btn-employee-deactivate'></a>"
                                + "</td>"
                            + "</tr>"

            $(html_data).prependTo("#table-employee-account > tbody")
        } else {
            console.log(response["Message"])
        }
    })  
})

$(document).on("click", ".btn-employee-select-area", function(){
    // console.log('testing select area')
})

$(document).on("click", ".btn-employee-update-init", function(){
    var idEmploGroup = $(this).closest('tr').find('.td-employee-egroup').children(':selected').attr('id')

    $.ajax({
        url:"employee_group_list",
        type:"GET"
    }).done(function(response){
        response['emplogroups'].forEach(account_group)       

        function account_group(item){
            if (idEmploGroup != item['idEmployeeGroup']) {
                var html_data="<option id='"+item['idEmployeeGroup']+"'>"+item['EGName']+"</option>"        
                $('tbody tr').first().find('.td-employee-egroup').append(html_data)
            }
        }
    })
})

$(document).on("click", ".btn-employee-update", function(){
    var idEmployee = $(this).closest('tr').attr('id')
    var ELastName = $(this).closest('tr').find('.td-employee-lastname').val()
    var EFirstName = $(this).closest('tr').find('.td-employee-firstname').val()
    var EMiddleName = $(this).closest('tr').find('.td-employee-middlename').val()
    var EAlias = $(this).closest('tr').find('.td-employee-alias').val()
    var ENumber = $(this).closest('tr').find('.td-employee-enumber').val()
    var idEmployeeGroup = $(this).closest('tr').find('.td-employee-egroup').find('option:selected').attr('id')
    var EGroup = $(this).closest('tr').find('.td-employee-egroup').find('option:selected').text()

    $.ajax({
        url: "employee_update",
        type: "POST",
        data: {idEmployee: idEmployee, ELastName: ELastName, EFirstName: EFirstName, EMiddleName: EMiddleName, EAlias: EAlias,
            ENumber: ENumber, idEmployeeGroup: idEmployeeGroup, EGroup: EGroup }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".btn-employee-deactivate", function(){
    var idEmployee = $(this).closest('tr').attr('id')
    var EmployeeName = $(this).closest('tr').find('.td-employee-lastname').val() + ', ' + $(this).closest('tr').find('.td-employee-firstname').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idEmployee)
    $('#dialog-deactivation-title').text('Deactivate Employee Account?')
    $('#dialog-deactivation-description').text('You are about to deactivate Employee Account Name ' + EmployeeName + '. This action cannot be undone afterwards. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('deactivate-employee-account')
})

$(document).on("click", ".deactivate-employee-account", function(){
    var idEmployee = $('#dialog-hidden-id').text()

    $.ajax({
        url: "employee_deactivate",
        type: "POST",
        data: { idEmployee: idEmployee }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })

    $('table#table-employee-account tr#' + idEmployee).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
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