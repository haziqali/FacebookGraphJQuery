// main document ready function to check if dom is loaded fully or not
$(document).ready(function () {

    $('.loader').hide();
    $('#loading').hide();

    function showLoader() {
        $('.loader').show();
        $('#loading').show();
        $('#loginBtn').hide();
        setTimeout(redirect, 2000);

        function redirect() {
            $('.loader').hide();
            $('#loading').hide();
            window.location.href = "body.html"
        };
    }


    $("#loginBtn").on('click', showLoader);
});
