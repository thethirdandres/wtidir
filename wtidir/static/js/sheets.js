$(document).ready(function() {
    $('.create-employee-confirm').click(function() {
        setTimeout(function() {
            $('.create-employee-modal').modal('hide');
        }, 1500);
    })

    // $('.sheets-nav-item').click(function() {
    //     $(this).children('a').addClass('active');
    //     $(this).siblings().children('a').removeClass('active');
    // })
});

// $(function() {
//     // for bootstrap 3 use 'shown.bs.tab', for bootstrap 2 use 'shown' in the next line
//     $('a[role="tab"]').on('shown.bs.tab', function(e) {
//         // save the latest tab; use cookies if you like 'em better:
//         localStorage.setItem('lastTab', $(this).attr('href'));
//     });

//     // go to the latest tab, if it exists:
//     var lastTab = localStorage.getItem('lastTab');
//     if (lastTab) {
//         $('.sheets-navpills-header a[href="' + lastTab + '"]').tab('show');
//     }
// });

// Check if the sessionStorage object exists
if (sessionStorage) {
    $(function() {
        // Store data
        $('.sheets-nav-item').click(function() {
            // save the latest tab; use cookies if you like 'em better:
            sessionStorage.setItem("lastTab", $(this).attr('href'));
        });

        // Retrieve datavar 
        lastTab = sessionStorage.getItem('lastTab');
        if (lastTab) {
            $('.sheets-navpills-header a[href="' + lastTab + '"]').tab('show');
        }
        // alert("Hi, " + localStorage.getItem("first_name") + " " + sessionStorage.getItem("last_name"));
    })
} else {
    alert("Sorry, your browser do not support session storage.");
}