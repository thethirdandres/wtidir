sheets
// $('.sheets-nav-item').click(function() {
//     $(this).children('a').addClass('active');
//     $(this).siblings().children('a').removeClass('active');
// })

$(document).ready(function() {
    $('.delivery-table-documents').children('tbody').find('tr').click(function() {
        var showTable = $('.delivery-table-documents-content');
        // showTable.children('tbody').find('tr').detach();
        // var row = showTable.insertRow(0);
        // var itemCell = row.insertCell(0);
        // var quantityCell = row.insertCell(1);
        // var unitCell = row.insertCell(2);

        // itemCell.innerHTML = "BBQ Sauce";
        // quantityCell.innerHTML = "5000";
        // unitCell.innerHTML = "bot";
    });

    $('.add-new-delivery-button').click(function() {
        $(this).attr('disabled', true).addClass('button-disable');
        $(this).parents('.delivery-section').find('dc-add').removeClass('d-none')
        $(this).parents('.delivery-section').find('.dc-edit').addClass('d-none');


        $(this).siblings('.delivery-list-card').css('background-color', 'white').css('color', 'black');

    });

    $('.done-add-new-delivery').click(function() {
        setTimeout(() => {
            $(this).parents('.content').find('.add-new-delivery-button').attr('disabled', false).removeClass('button-disable');
            $(this).parents('.content').find('.add-new-delivery-button').parents().next().addClass('d-none');
        }, 1500);
    })
    $('.cancel-add-new-delivery').click(function() {
        $(this).parents('.content').find('.add-new-delivery-button').attr('disabled', false).removeClass('button-disable');
        $(this).parents('.content').find('.add-new-delivery-button').parents().next().addClass('d-none');
    })

    $('.clickable-list').children('button').click(function() {
        $(this).css('background-color', '#AF0700').css('color', 'white');
        $(this).siblings().css('background-color', 'white').css('color', 'black');
    })

    $('.delivery-clickable-list').children('.delivery-list-card').click(function() {
        $(this).css('background-color', '#AF0700').css('color', 'white');
        $(this).siblings('.delivery-list-card').css('background-color', 'white').css('color', 'black');
        $(this).parents('.delivery-section').find('.dc-edit').removeClass('d-none');

        $(this).parents('.delivery-section').find('.dc-add').addClass('d-none');
        $(this).parents('.content').find('.add-new-delivery-button').attr('disabled', false).removeClass('button-disable');
    })


    // $('.done-edit-new-delivery').click(function() {
    //     setTimeout(() => {
    //         $(this).parents('.content').find('.delivery-list-card').removeClass('button-disable');
    //         $(this).parents('.content').find('.delivery-list-card').parents().next().addClass('d-none');
    //     }, 1500);
    // })

    $('.cancel-edit-new-delivery').click(function() {
        $(this).parents('.content').find('.delivery-list-card').css('background-color', 'white').css('color', 'black');
        $(this).parents('.content').find('.dc-edit').addClass('d-none');
    })

    $('.sheets-edit-delivery-inputs').find('input').change(function(){
        $(this).parents('.modal-content').find('.done-edit-new-delivery').removeClass('button-disable').removeAttr('disabled');
     });
});