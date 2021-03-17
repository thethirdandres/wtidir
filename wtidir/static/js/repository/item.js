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

    if (PGPriority == '') { PGPriority = 0 }
   
    $.ajax({
        url: "Item_group_add",
        type: "POST",
        data: { PGName: PGName, idProductType: idProductType, PTName: PTName, idShortageType: idShortageType, STName: STName, PGPriority: PGPriority }
    }).done(function(response) {
        if (response["error"] == false) {
            
            var html_data = "<tr id='"+response['idProductGroup']+"'>"
                                + "<td><input type='text' class='form-control td-item-group-name' value='"+ response['PGName']+"' readonly /></td>"
                                + "<td>"
                                    + "<select class='form-control td-item-group-type' disabled>"
                                        + "<option id='"+response['idProductType']+"' selected>"+ response['PTName']+"</option>"
                                    + "</select>"
                                + "</td>"
                                + "<td>"
                                    + "<select class='form-control td-item-group-shortage-type' disabled>"
                                        + "<option id='"+response['idShortageType']+"' selected>"+response['STName']+"</option>"
                                    + "</select>"
                                + "</td>"
                                + "<td><input type='number' class='form-control td-item-group-priority' value='"+response['PGPriority']+"' readonly /></td>"
                                + "<td>"
                                    + "<a class='mr-2'><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button init-item-group-update'></a>"
                                    + "<input type='image' src='../../static/img/repository-icons/edit-gray.png' data-toggle='modal' data-target='#prompt_doneedititemgroup' class='repository-edit-gray-button d-none mr-2 ml-n3 update-item-group'>"
                                    + "<a><img src='../../static/img/repository-icons/deactivate.png'data-toggle='tooltip' data-placement='top' title='Deactivate' class='btn-deactivate-group-item'></a>"
                                + "</td>"
                            + "</tr>"
            $(html_data).prependTo("#table-item-group > tbody")
        }

        console.log(response["Message"])
    })
})

$("#btn-add-product-item").click(function(){
    var item_name = $('#item-name').val()
    var item_unit = $('#item-unit').val()
    var item_pieceperpack = $('#item-pieceperpack').val()
    var item_sapcode = $('#item-sapcode').val()
    var id_item_unit = $('#item-unit').find('option:selected').attr('id')
    var item_unit = $('#item-unit').find('option:selected').text()
    var id_item_group = $('#dropdown-item-group').find('option:selected').attr('id')
    var item_group = $('#dropdown-item-group').find('option:selected').text()
    
    $.ajax({
        url: "item_add",
        type: "POST",
        data: { item_name: item_name, item_pieceperpack: item_pieceperpack, item_sapcode: item_sapcode, id_item_unit: id_item_unit,
            item_unit: item_unit, id_item_group: id_item_group, item_group: item_group }
    }).done(function(response) {
        if (response["error"] == false) {
            var html_data = "<tr id='"+response['idProductItem']+"'>"
                                + "<td><input type='text' class='form-control td-item-name' value='"+response['PIName']+"' readonly /></td>"
                                + "<td>"
                                    + "<select class='form-control td-cb-item-uom' disabled>"
                                        + "<option id='"+response['idProductUOM']+"' selected>"+response['PUOMName']+"</option>"
                                    + "</select>"                  
                                + "</td>"
                                + "<td><input type='text' class='form-control td-item-pipack' value='"+response['PIPack']+"' readonly /></td>"
                                + "<td><input type='text' class='form-control td-item-sapcode' value='"+response['PISAPCode']+"' readonly /></td>"
                                + "<td>"
                                    + "<a class='mr-2'><img src='../../static/img/repository-icons/edit.png' data-toggle='tooltip' data-placement='top' title='Edit' class='repository-edit-button init-update-item'></a>"
                                    + "<input type='image' src='../../static/img/repository-icons/edit-gray.png' data-toggle='modal' data-target='#prompt_doneedititem' class='repository-edit-gray-button d-none mr-2 ml-n3 update-item'>"
                                    + "<a class='mr-2' data-toggle='modal' data-target='#modal_updateconversion'><img src='../../static/img/repository-icons/updateconversion.png' data-toggle='tooltip' data-placement='top' title='Update Conversion'></a>"
                                    + "<a><img src='../../static/img/repository-icons/deactivate.png'data-toggle='tooltip' data-placement='top' title='Deactivate'  class='product-item-deactivate'></a>"
                                + "</td>"
                            + "</tr>"
            $(html_data).prependTo("#tbl-product-item > tbody")
        } 
       
        console.log(response["Message"])
    })
})

$(document).on("click", ".product-item-deactivate", function(){
    var idProductItem = $(this).closest('tr').attr('id')
    var PIName = $(this).closest('tr').find('.td-item-name').val()

    $('#prompt_confirmdeactivate').modal('show')

    $('#dialog-hidden-id').text(idProductItem)
    $('#dialog-deactivation-title').text('Deactivate Product Item?')
    $('#dialog-deactivation-description').text('You are about to deactivate Product Item Name ' + PIName + '. This action cannot be undone afterwards. Continue?')

    $('#btn-deactivate').removeClass('btn-deactivate').addClass('deactivate-product-item')
})

$(document).on("click", ".deactivate-product-item", function(){
    var idProductItem = $('#dialog-hidden-id').text()

    $.ajax({
        url: "Item_deactivate",
        type: "POST",
        data: { idProductItem: idProductItem }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })

    $('table#tbl-product-item tr#' + idProductItem).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
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
    var idProductGroup = $('#dialog-hidden-id').text()

    $.ajax({
        url: "Item_group_deactivate",
        type: "POST",
        data: { idProductGroup: idProductGroup }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })

    $('table#table-item-group tr#' + idProductGroup).closest('tr').remove()
    $(".modal-fade").modal("hide")
    $(".modal-backdrop").remove()
})

$(document).on("click", ".update-item-group", function(){
    var idProductGroup = $(this).closest('tr').attr('id')
    var PGName = $(this).closest('tr').find('.td-item-group-name').val()
    var idProductType = $(this).closest('tr').find('.td-item-group-type').find('option:selected').attr('id')
    var PTName = $(this).closest('tr').find('.td-item-group-type').find('option:selected').text()
    var idShortageType = $(this).closest('tr').find('.td-item-group-shortage-type').find('option:selected').attr('id')
    var STName = $(this).closest('tr').find('.td-item-group-shortage-type').find('option:selected').text()
    var PGPriority = $(this).closest('tr').find('.td-item-group-priority').val()

    $.ajax({
        url: "Item_group_update",
        type: "POST",
        data: {idProductGroup: idProductGroup, PGName: PGName, idProductType: idProductType, PTName: PTName, idShortageType: idShortageType, STName: STName, PGPriority: PGPriority}
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })
})

$(document).on("click", ".init-item-group-update", function(){
    var idProductType = $(this).closest('tr').find('.td-item-group-type').find('option:selected').attr('id')

    $.ajax({
        url:"item_group_init",
        type:"GET"
    }).done(function(response){
        response['producttypes'].forEach(item_group_types)  
        
        function item_group_types(item){
            
            if (idProductType != item['idProductType']) {             
                var html_data = "<option id='"+item['idProductType']+"'>"+ item['PTName']+"</option>"                    
                $('tbody tr').closest('tr').find('.td-item-group-type').append(html_data)
            }
        }
    })
})

$(document).on("click", ".init-update-item", function(){
    var idProductUOM = $(this).closest('tr').find('.td-cb-item-uom').find('option:selected').attr('id')
  
    $.ajax({
        url:"item_add_init",
        type:"GET"
    }).done(function(response){
        response['PUOMS'].forEach(product_item)  
        
        function product_item(item){
            
            if (idProductUOM != item['idProductUOM']) {             
                var html_data = "<option id='"+item['idProductUOM']+"'>"+ item['PUOMName']+"</option>"                    
                $('tbody tr').closest('tr').find('.td-cb-item-uom').append(html_data)
            }
        }
    })
})

$('#btn-modal-item-group-init').click(function(){
    $("#dropdown-item-group").empty()

    $.ajax({
        url:"item_add_init",
        type:"GET"
    }).done(function(response){
        response['productgroups'].forEach(item_group)  
        
        function item_group(item){                     
            var html_data = "<option id='"+item['idProductGroup']+"'>"+ item['PGName']+"</option>"                    
            $('#dropdown-item-group').append(html_data)          
        }
    })
})

$(document).on("click", ".update-item", function(){
    var idProductItem = $(this).closest('tr').attr('id')
    var PIName = $(this).closest('tr').find('.td-item-name').val()
    var idProductUOM = $(this).closest('tr').find('.td-cb-item-uom').find('option:selected').attr('id')
    var PUOMName = $(this).closest('tr').find('.td-cb-item-uom').find('option:selected').text()
    // var idProductGroup = $(this).closest('tr').find('.td-cb-item-uom').find('option:selected').attr('id')
    // var PGName = $(this).closest('tr').find('.td-cb-item-uom').find('option:selected').text() 
    var PIPack = $(this).closest('tr').find('.td-item-pipack').val()
    var PISAPCode = $(this).closest('tr').find('.td-item-sapcode').val()
    
    $.ajax({
        url: "Item_update",
        type: "POST",
        data: {idProductItem: idProductItem, PIName: PIName, idProductUOM: idProductUOM, PUOMName: PUOMName, PIPack: PIPack, PISAPCode: PISAPCode }
    }).done(function(response) {
        if (response["error"] == false) {
            console.log(response["Message"])
        } else {
            console.log(response["Message"])
        }
    })
})