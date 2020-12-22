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
        $(this).parents().next().removeClass('d-none')
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
});