// $('.sheets-nav-item').click(function() {
//     $(this).children('a').addClass('active');
//     $(this).siblings().children('a').removeClass('active');
// })

$(document).ready(function() {
    $('.delivery-table-documents').children('tbody').find('tr').click(function() {
        var showTable = $('.delivery-table-documents-content');
        // var row = showTable.insertRow(0);
        // var cell1 = row.insertCell(0);
        // var cell2 = row.insertCell(1);
        // cell1.innerHTML = "NEW CELL1";
        // cell2.innerHTML = "NEW CELL2";

        // showTable.children('tbody').find('tr').detach();
        var row = showTable.insertRow(0);
        var itemCell = row.insertCell(0);
        var quantityCell = row.insertCell(1);
        var unitCell = row.insertCell(2);

        itemCell.innerHTML = "BBQ Sauce";
        quantityCell.innerHTML = "5000";
        unitCell.innerHTML = "bot";
    });
});