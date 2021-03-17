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
        $(this).parents('.delivery-section').find('.dc-add').removeClass('d-none')
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


    $('.done-edit-new-delivery').click(function() {
        setTimeout(() => {
            $(this).parents('.content').find('.delivery-list-card').removeClass('button-disable');
            $(this).parents('.content').find('.delivery-list-card').parents().next().addClass('d-none');
        }, 1500);
        $(this).addClass('button-disable').attr("disabled", true);
    })

    $('.cancel-edit-new-delivery').click(function() {
        $(this).parents('.content').find('.delivery-list-card').css('background-color', 'white').css('color', 'black');
        $(this).parents('.content').find('.dc-edit').addClass('d-none');
    })

    $('.sheets-edit-delivery-inputs').find("input, select").change(function() {
        $(this).parents('.modal-content').find('.done-edit-new-delivery').removeClass('button-disable').removeAttr('disabled');
    });

    $(".reset-fields").click(function() {
        // $(this).parents('.modal-header').next().find("input[type=text], textarea, select").val("");
        $(this).parents(".reset-fields-here").find("input[type=text], textarea, select").val("");
        $(this).parents(".reset-fields-here").find("input[type=checkbox]").prop('checked', false);
    });

    $(".sheets-dropdown-button").click(function() {
        if ($(".sheets-dropdown-container").style.display == 'none') {
            $(".sheets-dropdown-container").css('display', 'block');
            $(".sheets-dropdown-item").css('display', 'block');
        } else {
            $(".sheets-dropdown-container").css('display', 'none');
            $(".sheets-dropdown-item").css('display', 'none');
        }
    });

    // $("template-section input[type=radio]").click(function() {
    //     $(this).checked == true ? $(this).checked = false : $(this).checked = true;
    // })


    // Template > Edit Item Modal
    $(".edititem-selectall").click(function() {
        $('.edititem-list li input[type="checkbox"]').prop('checked', this.checked);
    })


    // *** NOTE TO ARCHIE: if na lock ang sheet, if mag change page ang user, ma unlock liwat. for current page lang gid ga lock ang ini nga function, kung mag change page, gadula ang state sang ISLOCKEDSHEETS.
    // try to find a way nga ma save ang state nga ISLOCKEDSHEETS biskan mag change ang page
    $(".sheets-lock").click(function() {
        if (localStorage.getItem('isLockedSheets') == "true") {
            localStorage.setItem('isLockedSheets', "false");
            $(".sheets-lock").parents('.sheets-navpills-header').next().find("button, select").prop('disabled', false);
            alert("notLocked");
        } else {
            localStorage.setItem('isLockedSheets', "true");
            $(".sheets-lock").parents('.sheets-navpills-header').next().find("button, select").prop('disabled', true);
            alert("Locked");
        }
    })

    // ini nga function same lang sa babaw nga event. Difference lang is: sa babaw if ma click ang lock button, manually i change niya ang state. 
    // diri ya sa function nga toggleSheetLock, na check ya lang ano ang isLockedSheets nga status, then gina disable/enable ang buttons accordingly (supposedly amo ni dapat gatabo pero refer to ***NOTE TO ARCHIE sa babaw)
    function toggleSheetLock() {
        if (localStorage.getItem('isLockedSheets') == "true") {
            $(".sheets-lock").parents('.sheets-navpills-header').next().find("button, select").prop('disabled', false);
            alert("notLocked");
        } else {
            $(".sheets-lock").parents('.sheets-navpills-header').next().find("button, select").prop('disabled', true);
            alert("Locked");
        }
    }
});

// function changeDiv() {
//     $('.login-div').removeClass('d-none');
//     $('.main').addClass('d-none');
// }