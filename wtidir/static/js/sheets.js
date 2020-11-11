// $(document).ready(function() {
//     $('.sheets-nav-item').click(function(e) {
//         $(this).children('a').removeClass('active');
//         $(e).find('a').addClass('active');
//     });
// });

// if (typeof(Storage) !== "undefined") {
//     // Code for localStorage/sessionStorage.
//     $(document).ready(function() {
//         $('.sheets-nav-item').on('show.bs.tab', function(e) {
//             localStorage.setItem('activeTab', $(e.target).attr('href'));
//         });
//         var activeTab = localStorage.getItem('activeTab');
//         if (activeTab) {
//             $('#myTab a[href="' + activeTab + '"]').tab('show');
//         }
//     });
// } else {
//     // Sorry! No Web Storage support..
//     console.log("NO CHANGE IN TAB HIGHLIGHT DURING TAB CHANGE!")
// }