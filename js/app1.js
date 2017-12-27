
$(document).ready(function () {
    
    $('.loader').hide();
    
    var token = 'EAACEdEose0cBAEJeJhiWzrGO3Xsf2TIap2vhVw9mjG4JniaRqnZAJnM5ZArooqZBWlKuMy6CbqVpoZCPLGf5lZCKkG2HiTgAZAvnA4gTADd0ZCzns95wcTZBO4tPDnIc1RoLnmLigyjXsqskYU6gg0Dv1ZCTjx22RVCxLtpEALdMR1Gqvo8vZB0OZCbuK1gwiRGe1UlOA4CccayxQZDZD';

    var facebookFields = ['id,name,education,email,birthday,hometown,gender,location, sports'];

    $.ajax('https://graph.facebook.com/me?fields=' + facebookFields + '&access_token=' + token, {

        success: function (response) { //function to populate profile information on page load
            jQuery.each(response, function (i, v) {
                console.log("Following fields were successfully fetched from facebook: " + i);
                if (typeof v !== "object" && v !== undefined) {
                    $('#' + i).text(v);
                } else {
                    if (i === "hometown" && v !== undefined) {
                        $('#' + i).text(v.name);
                    }
                    if (i === "location" && v !== undefined) {
                        $('#' + i).text(v.name);
                    }
                    if (i === "education" && v !== undefined) {
                        if (typeof v === "object" && v[0] !== undefined) {
                            $('#highSchool').text(v[0].school.name);
                            if (v[2] !== undefined) {
                                $('#college').text(v[2].school.name)
                            };
                        } else {
                            $('#highSchool').text(v.school.name);
                        }
                    }
                    if (i === "sports" && v!== undefined) {
                        if (typeof v === "object" && v[0]!== undefined) {
                            $('#' + i).text(v[0].name);
                        } else {
                            $('#' + i).text(v.name);
                        }
                    }
                }
            });
        },
        error: function (request, errorType, errorMessage) { //error handling
            console.log(errorMessage);
            document.write('<body style = background-color:red;> <h2 style = text-align:center;padding-top:20vmin;>' + errorType +
                errorMessage + '! <br>Please get a new access token for facebook!' + '</h2></body>');
        },
        beforeSend: function () { // before this function is called, show loader
            $('.loader').show();
            $('#mainContent').hide();
            $('#loading').show();
        },
        complete: function () { //hide loader after function is called
            $('.loader').hide();
            $('#loading').hide();
            $('#mainContent').show();

        }


    });


    $.ajax('https://graph.facebook.com/me/feed?access_token=' + token, { //get news feed on page load

        success: function (response) {
            var txt = "<p class=lead>News feed</p>";
            jQuery.each(response, function (i, v) {
                jQuery.each(v, function (index, value) {
                    if (typeof value.story !== "undefined") {
                        txt += "<p>" + value.story + "</p>"; //store all news feed in a variable
                    }
                })
            });

            document.getElementById("newsFeed").innerHTML = txt; //fetch element from id and populate with above variable
        },
        error: function (request, errorType, errorMessage) { //error handling
            console.log(errorMessage);
            console.log(errorType);
        },
        beforeSend: function () { // before this function is called, show loader
            $('.loader').show();
            $('#loading').show();
        },
        complete: function () { //hide loader after function is called
            $('.loader').hide();
            $('#loading').hide();

        } //
    });
});
