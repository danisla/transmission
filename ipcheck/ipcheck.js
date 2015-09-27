var style = {
    "width": "auto",
    "height": "auto",
    "padding-top": "10px"
};
$('#toolbar').append('<div id="ipcheck"></div>');

var url = window.location.href+"/ipcheck";
var in_check = false;
var interval = 60;
var countdown = interval;
var curr_ip_str = "";
var timer = null;

function check(url) {
    if (in_check) return;

    in_check = true;
    var el = $('#ipcheck');
    el.text("Checking public IP...");
    el.css(style);
    $.get(url).done(function(response) {
        curr_ip_str = response.toString();
        el.text(curr_ip_str);
        el.css(style);
        in_check = false;
        if (timer == null) startTimer();
    });
   return
}

function startTimer() {
    timer = setInterval(function() {
        if (in_check) return;

        countdown--;
        if (countdown <= 0) {
            countdown = interval;
            check(url);
        } else {
            var el = $('#ipcheck');
            el.text(curr_ip_str + " (next check in "+countdown+"s)");
        }

    }, 1000);
}

// Do initial check.
check(url);
