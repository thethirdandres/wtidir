$(document).ready(function() {
    $('.login-button').click(function() {
        $(this).parents('.login-div').addClass('d-none');
        $(this).parents('.login-div').siblings('.main').removeClass('d-none');
        console.log("wahahhaa");
    });
});