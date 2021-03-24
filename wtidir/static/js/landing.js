$(document).ready(function() {
    $('.login-button').click(function() {
        alert("This is it");
        $(this).parents('.login-div').siblings('.main').removeClass('d-none');
        $(this).parents('.login-div').addClass('d-none');        
        console.log("wahahhaa");
    });
});