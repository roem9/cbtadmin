$("#dataAjax").hide();

// place this within dom ready function
function showpanel() {
    $("#skeleton").hide();
    $("#dataAjax").show();

    $('.Count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
 }

 // use setTimeout() to execute
 setTimeout(showpanel, 1000)