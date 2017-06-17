$(document).ready( function() {
    window.seedVersion = "0.8.0";
    initCore();

    // Enable FastClick
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);

    $(window).resize( function() {
        setFontSize();
    });
});

var counter = 0,
    random = 1;

function initCore() {
    // Functions will load when application launches
    // console.log("Seed Version: " + window.seedVersion);
    validateUser();
    changeState();
    selOption();
    setFontSize();
}

// Dynamically set font-size based on viewport width
function setFontSize() {
    var viewWidth = $("body").width()
        fontSize = viewWidth*0.015;
    if (fontSize >= 12 && fontSize <= 15) {
        var lineHeight = fontSize*10.6
        $("body").css({"font-size":fontSize,"line-height":lineHeight+"%"});
    }
    console.log(fontSize);
}

// Validate subject name and redirect if user found
function validateUser() {
    var rawURL = window.location.href,
        baseURL = rawURL.split("validate?");
    $("#subject").change( function() {
        var sub = $(this).val();
        window.location.href = baseURL[0]+"validate?subject="+sub;
    });
    if ($("#subject").hasClass("error")) {
        var param = baseURL[1].split("subject=");
        $("#subject").attr("placeholder","").val(param[1]);
        $(".warning").css("visibility","visible");
    } else {
        $("#subject").attr("placeholder","Enter your subject ID")
    }
}

function changeState() {
    $("#play").click( function() {
        $(this).toggleClass("icon-play icon-pause");
    });
}

function setQuestion(user,song) {
    function numRandom(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    $("#jquery_jplayer_1").jPlayer("pause");
    $.post("/qevent",{'uID': user,'sID': song}, function(data) {
        window.uID = user;
        window.qID = data.id;
        $("#question").css({"z-index":"99","display":"block"});
        $("#question > .label").html(data.question);
        $("#option1").html(data.option1);
        $("#option2").html(data.option2);
        $("#play").toggleClass("icon-play icon-pause");
    });
	random = numRandom(2,4);
    console.log(random);
}

function selOption() {
    $(".opt").click( function() {
        var answer = $(this).attr("name");
        $("#question").css({"z-index":"-99","display":"none"});
        $("#question > .label").html("");
        $.post("/aevent",{'uID': window.uID,'qID': window.qID,'answer': answer}, function(data) {});
    });
}
