$("#btn-item-group-add").click(function(){
    var PGName = $('#item-group-name').val()
    var idProductType = $('#item-group-type').find('option:selected').attr('id')
    var PTName = $('#item-group-type').find('option:selected').text()
    var idShortageType = $('#item-group-shortage-type').find('option:selected').attr('id')
    var STName = $('#item-group-shortage-type').find('option:selected').text()
    var PGPriority = $('#item-group-priority').val()

    if (STName == 'Shortage Type') { 
        STName = "" 
        idShortageType = 0
    }
   
    $.ajax({
        url: "Item_add",
        type: "POST",
        data: { PGName: PGName, idProductType: idProductType, PTName: PTName, idShortageType: idShortageType, STName: STName, PGPriority: PGPriority }
    }).done(function(response) {
        if (response["error"] == false) {

        }

        console.log(response["Message"])
    })
})

$(document).on("click", ".btn-deactivate-group-item", function(){
    var idProductGroup = $(this).closest('tr').attr('id')
    var PGName = $(this).closest('tr').find('.td-item-group-name').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idProductGroup)
    $('#dialog-deactivation-title').text('Deactivate Item Group?')
    $('#dialog-deactivation-description').text('You are about to deactivate Item Group Name ' + PGName + '. This action cannot be undone afterwards. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('deactivate-item-group')
})

$(document).on("click", ".deactivate-item-group", function(){
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