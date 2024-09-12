var $scanlines = $('.scanlines');
$scanlines
    .first().show();

myAudio = new Audio('assets/audio/background.wav');
portal = new Audio('assets/audio/portal-bit.mp3');
lemon = new Audio('assets/audio/lemon.mp3');
clocks = new Audio('assets/audio/clocks.mp3');
dadAudio = new Audio('assets/audio/dearly-beloved.mp3');
dadAudio.volume = 0.4;
lemon.volume = 0.4;
clocks.volume = 0.4;
portal.volume = 0.4;
mario = new Audio('assets/audio/mario.mp3');
mario.volume = 0.4;
myAudio.volume = 0.4;
myAudio.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);

$(document).keydown(function (evt) {
    $('#input input').focus();
    var keycode = evt.keyCode;
    var valid =
        (keycode > 47 && keycode < 58) || // number keys
        keycode == 32 || keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91) || // letter keys
        (keycode > 95 && keycode < 112) || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223) || // [\]' (in order)
        keycode == 8;
    if (evt.keyCode == 32) {
        //spacebar
        document.getElementById('space-audio').play();
    } else if (evt.keyCode == 13) {
        //enter
        document.getElementById('enter-audio').play();
    } else if (valid) {
        var num = Math.floor(Math.random() * 3) + 1
        document.getElementById('audio' + num).play();
    }
});
var loadingBar = '<div style="width: 100%;overflow:hidden;"><div id="input"><span id="typewriter" class="loading-font text hide-loader" data-text="████████████████████████████████████████████████████████████████████████████"></span></div></div>';

function stopAudio() {
    lemon.pause();
    lemon.currentTime = 0;
    mario.pause();
    mario.currentTime = 0;
    clocks.pause();
    clocks.currentTime = 0;
    portal.pause();
    portal.currentTime = 0;
    dadAudio.pause();
    dadAudio.currentTime = 0;
}

function clear(all = false) {
    newInput(true);
    $('.text:not(.on-type)').parent(':not(body)').hide();
    $('.directory').parent(':not(#input)').hide();
    $('.project').parent().parent().hide();
    $('.entry').parent().parent().hide();
    $('table').parent().hide();
    $('body > p').hide();
    $('.lists-div').hide();
    $('.text.on-type').hide();
    $('.command-list').hide();
    inputPress();
    if (all) {
        $('.archive').remove();
        $('#input').empty();
    }
}
let processInterval;

function runProcessing() {
    $('#date').click();
    document.getElementById('loading-dots-sound').loop = true;
    $('body').one("click", function () {
        document.getElementById('loading-dots-sound').play();
    });
    var ind = 1;
    var add = true;
    processInterval = setInterval(function () {
        $('.processing span').removeClass('active');
        $('.processing span:nth-child(' + ind + ')').addClass('active');
        if (add && ind == 17)
            add = false;
        else if (!add && ind == 1)
            add = true;
        if (!add)
            ind--;
        else
            ind++;
    }, 30);
}
var hours, minutes, seconds, url, d = new Date(),
    username = "",
    counter = 0,
    error = !1,
    current = "",
    subject = "",
    body = "",
    nameInput = document.getElementById("name-input");
(function ($) {
    setTimeout(function () {
        $('.start').after('<div class="archive"><span id="date"></span></div><span id="typewriter" class="text on-type" data-text="Hi! My name is Dean. I\'m a Front End Developer at <a href=&quot;http://americaneagle.com&quot; target=&quot;_blank&quot;>Americaneagle.com</a>. Before we begin, what\'s your name?"></span>');
        typeWriter(document.getElementById("typewriter").dataset.text, 0);
    }, 3000);
    runProcessing();
    setTimeout(function () {
        var interval = setInterval(function () {
            if ($('#typewriter').length && $('#typewriter').html()) {
                clearInterval(processInterval);
                $('.processing').hide();
                document.getElementById('loading-dots-sound').pause();
            }
            if ($('#typewriter').length && $('#typewriter').html() == 'Hi! My name is Dean. I\'m a Front End Developer at <a href="http://americaneagle.com" target="_blank">Americaneagle.com</a>. Before we begin, what\'s your name?') {
                $('.no-blink').removeClass('no-blink');
                $('#first-directory').show();
                $('#name-input').focus();
                myAudio.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
                myAudio.play();
                clearInterval(interval);
                setInterval(function () {
                    if (!$('#input input').is(':focus'))
                        $('#input input').focus();
                }, 1000);
            }
        }, 400);
    });
    inputPress();
})(jQuery);

function inputPress() {
    $("input").keypress(function (e) {
        $('.hide-blink.new').hide();
    });
    $("input").keyup(function (e) {
        if ($(this).val() != '')
            $('.hide-blink.new').hide();
        else
            $('.hide-blink.new').show();
    });
}


function nameResponse() {
    myAudio.play();
    $('#name-input').prop('readonly', true);
    document.getElementById("typewriter").removeAttribute("id"), (t = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="Well, ' + nameInput.value + ", I'm glad you're here! How can I help you today? (Hint: Try typing <span class='highlight'>bio</span>, <span class='highlight'>portfolio</span>, <span class='highlight'>resume</span>, <span class='highlight'>contact</span>, <span class='highlight'>clear</span>, <span class='highlight'>switch</span>, or <span class='highlight'>help</span>)\"></span></div>");
    var e = 10 * nameInput.value.length;
    t.removeAttribute("id");
    var t = document.getElementById("input");
    typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
        newInput()
    }, 3000)
}

function valid() {
    if (document.getElementById("typewriter"))
        document.getElementById("typewriter").removeAttribute("id");
    var e = document.getElementById("input");
    //loading code
    if (document.getElementById("current-p").value)
        if ("bio" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
            document.getElementById('loading-sound').play();
            e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
                $('.hide-loader').hide();
                document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input" style="max-width: 660px;"><span id="typewriter" class="text" data-text="My name is Dean Schulz, and I am currently a Front End Developer at <a href=&quot;https://www.americaneagle.com/&quot; target=&quot;_blank&quot;>AmericanEagle.com</a>. I previously worked as a full stack Web Application Developer at <a href=&quot;http://csm.cc&quot; target=&quot;_blank&quot;>Creative Sites Media</a> and am a recent grad at Illinois State with a Bachelors in CS. Past stints: Lab assistant, program debugger, and virtual reality application developer at Illinois State Deparment of Information Technology, Freelance App Developer, and Intern at Redbird Productions(athletic broadcasting). I was a finalist in the 2017 MAD Contest (ISU Statefarm sponsored Application Development contest) and received first in the 2018 MAD Contest. While attending ISU, I was apart of App Development club, Game Developement club, and Christian Students at ISU."></span></div>'), e.removeAttribute("id");
                var e = document.getElementById("input");
                typeWriter(document.getElementById("typewriter").dataset.text, 0)
            }, 1100), setTimeout(function () {
                newInput()
            }, 10000);
        } else if ("resume" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            $('.hide-loader').hide();
            loadResume();
        }, 1e3), setTimeout(function () {
            (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="That\'s what I\'ve been up to! Type another command for more."></span></div>'), e.removeAttribute("id");
            var e = document.getElementById("input");
            typeWriter(document.getElementById("typewriter").dataset.text, 0)
        }, 4500), setTimeout(function () {
            newInput()
        }, 5500)
    } else if ("matrix" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        clear(true);
        setTimeout(function () {
            console.log(e);
            e.insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="loading-font text hide-loader" data-text="Wake up, ' + nameInput.value + '..."></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0),
                setTimeout(function () {
                    $('.hide-loader').hide();
                    clear(true);
                    setTimeout(function () {
                        e.insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="loading-font text hide-loader" data-text="The Matrix has you..."></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0);
                        setTimeout(function () {
                            $('.hide-loader').hide();
                            clear(true);
                            setTimeout(function () {
                                e.insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="loading-font text hide-loader" data-text="Follow the white rabbit."></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0);
                                setTimeout(function () {
                                    $('.hide-loader').hide();
                                    clear(true);
                                    setTimeout(function () {
                                        e.insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="loading-font text hide-loader" data-text="Knock, knock, ' + nameInput.value + '."></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0);
                                        setTimeout(function () {
                                            document.getElementById('knocks-sound').play();
                                        }, 900);
                                        setTimeout(function () {
                                            $('.hide-loader').hide();
                                            clear(true);
                                            setTimeout(function () {
                                                var e = document.getElementById("input");
                                                newInput(true);
                                            }, 1000);
                                        }, 2000);
                                    }, 500);
                                }, 2000);
                            }, 1500);
                        }, 3000);
                    }, 1500);
                }, 4000);
        }, 1000);

    } else if ("portfolio" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            current = "clips"
            //open portfolio
            var e = new XMLHttpRequest;
            e.onreadystatechange = function () {
                4 == this.readyState && 200 == this.status && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
            }, e.open("GET", "/digital-portfolio.txt?t=" + Math.random(), !0), e.send()
            $('.hide-loader').hide();
            setTimeout(function () {
                var e;
                (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="That\'s my work! Type another command to see more."></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0)
            }, 1000), setTimeout(function () {
                newInput();
            }, 2e3);
        }, 1100);
    } else if ("contact" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", "<div id=\"input\"><span id='typewriter' class='loading-font text hide-loader' data-text='████████████████████████████████████████████████████████████████████████████'></span><span id=\"typewriter\" class=\"text\" data-text=\"<a href='https://www.linkedin.com/in/dean-schulz/' target='blank'>LinkedIn</a> / <a href='mailto:schulzdean4@gmail.com' target='blank'>Email</a> / <a href='https://www.facebook.com/deanschulz4' target='blank'>Facebook</a> / <a href='https://www.instagram.com/deans4/' target='blank'>Instagram</a>\"></span></div>"), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            $('.hide-loader').hide();
            document.getElementById("typewriter").removeAttribute("id");
            var e = document.getElementById("input");
            e.insertAdjacentHTML("afterend", '<div id="input"></div>'),
                e.removeAttribute("id"), current = "contact",
                typeWriter(document.getElementById("typewriter").dataset.text, 0)
        }, 1200), setTimeout(function () {
            newInput()
        }, 3800)
    } else if ("switch" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            $('.hide-loader').hide();
            document.getElementById("typewriter").removeAttribute("id");
            var e = document.getElementById("input");
        }, 1200), setTimeout(function () {
            window.open('http://schulzdean.com/', '_blank');
            newInput()
        }, 3800)
    } else if ("portal" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            $('.hide-loader').hide();
            document.getElementById("typewriter").removeAttribute("id");
            var e = document.getElementById("input");
        }, 1200), setTimeout(function () {
            stopAudio();
            portal.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            portal.play();
            document.getElementById("turret").classList.add('playing');
            document.getElementById("mario").classList.remove('playing');
            document.getElementById("clocks").classList.remove('playing');
            newInput()
        }, 3800)
    } else if ("lemon" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            $('.hide-loader').hide();
            document.getElementById("typewriter").removeAttribute("id");
            var e = document.getElementById("input");
        }, 1200), setTimeout(function () {
            stopAudio();
            lemon.play();
            document.getElementById("clocks").classList.remove('playing');
            document.getElementById("mario").classList.remove('playing');
            document.getElementById("turret").classList.remove('playing');
            newInput()
        }, 3800)
    } else if ("mario" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            $('.hide-loader').hide();
            document.getElementById("typewriter").removeAttribute("id");
            var e = document.getElementById("input");
        }, 1200), setTimeout(function () {
            stopAudio();
            mario.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            mario.play();
            document.getElementById("clocks").classList.remove('playing');
            document.getElementById("turret").classList.remove('playing');
            document.getElementById("mario").classList.add('playing');
            newInput()
        }, 3800)
    } else if ("clocks" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            $('.hide-loader').hide();
            document.getElementById("typewriter").removeAttribute("id");
            var e = document.getElementById("input");
        }, 1200), setTimeout(function () {
            stopAudio();
            clocks.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            clocks.play();
            document.getElementById("clocks").classList.add('playing');
            document.getElementById("turret").classList.remove('playing');
            document.getElementById("mario").classList.remove('playing');
            newInput()
        }, 3800)
    } else if ("pause" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            $('.hide-loader').hide();
            document.getElementById("typewriter").removeAttribute("id");
            var e = document.getElementById("input");
        }, 1200), setTimeout(function () {
            stopAudio();
            document.getElementById("turret").classList.remove('playing');
            document.getElementById("mario").classList.remove('playing');
            document.getElementById("clocks").classList.remove('playing');
            newInput()
        }, 3800)
    } else if ("lists" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            current = "clips"
            //open portfolio
            var e = new XMLHttpRequest;
            e.onreadystatechange = function () {
                4 == this.readyState && 200 == this.status && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
            }, e.open("GET", "/my-lists.txt?t=" + Math.random(), !0), e.send()
            $('.hide-loader').hide();
            setTimeout(function () {
                    var e;
                    (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"></div>'), e.removeAttribute("id")
                }, 500),
                setTimeout(function () {
                    newInput();
                }, 500);
        }, 1100);
    } else if ("dad" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter") ? document.getElementById("typewriter").dataset.text : '', 0), setTimeout(function () {
            //current = "clips";
            //open portfolio
            var e = new XMLHttpRequest;
            e.onreadystatechange = function () {
                4 == this.readyState && 200 == this.status && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
            }, e.open("GET", "/Dad.html?t=" + Math.random(), !0), e.send()
            $('.hide-loader').hide();
            stopAudio();
            dadAudio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            dadAudio.play();
            setTimeout(function () {
                var e;
                (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter") ? document.getElementById("typewriter").dataset.text : '', 0)
            }, 1200), setTimeout(function () {
                newInput();
            }, 2e3);
        }, 1100);
    } else if ("clear" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        //   newInput();
        clear();
    } else if ("refs" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter") ? document.getElementById("typewriter").dataset.text : '', 0), setTimeout(function () {
            //   current = "clips"
            var e = new XMLHttpRequest;
            e.onreadystatechange = function () {
                4 == this.readyState && 200 == this.status && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
            }, e.open("GET", "/references.txt?t=" + Math.random(), !0), e.send()
            $('.hide-loader').hide();
            setTimeout(function () {
                var e;
                (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter") ? document.getElementById("typewriter").dataset.text : '', 0)
            }, 1200), setTimeout(function () {
                newInput();
            }, 2e3);
        }, 1100);
    } else if ("help" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        // document.getElementById('loading-sound').play();
        // e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter") ? document.getElementById("typewriter").dataset.text : '', 0), setTimeout(function() {
        // //   current = "clips"
        // var e = new XMLHttpRequest;
        //   e.onreadystatechange = function() {
        //     4 == this.readyState && 200 == this.status && document.getElementById("input") && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
        //   }, e.open("GET", "/help.txt?t=" + Math.random(), !0), e.send()
        //   $('.hide-loader').hide();
        //   setTimeout(function() {
        //     var e;
        //     (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter") ? document.getElementById("typewriter").dataset.text : '', 0)
        //     setTimeout(function() {
        //         newInput();
        //     }, 1200);
        //   }, 1200);
        // }, 1100);

        document.getElementById('loading-sound').play();
        e.insertAdjacentHTML("afterend", loadingBar), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter") ? document.getElementById("typewriter").dataset.text : '', 0), setTimeout(function () {
            //   current = "clips"
            var e = new XMLHttpRequest;
            e.onreadystatechange = function () {
                4 == this.readyState && 200 == this.status && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
            }, e.open("GET", "/help.txt?t=" + Math.random(), !0), e.send()
            $('.hide-loader').hide();
            setTimeout(function () {
                var e;
                (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter") ? document.getElementById("typewriter").dataset.text : '', 0)
            }, 1200), setTimeout(function () {
                newInput();
            }, 2e3);
        }, 1100);
    } else "clear" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase() ? location.reload() : invalid()
}

function whichPortfolio() {
    "words" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase() ? (loadWords(), setTimeout(function () {
        var e;
        (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="That\'s my work! Type another command to see more."></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0)
    }, 1000), setTimeout(function () {
        document.getElementById("input");
        newInput()
    }, 2e3)) : "code" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase() ? (loadDigital(), setTimeout(function () {
        var e;
        (e = document.getElementById("input")).removeAttribute("id"), document.getElementById("typewriter").removeAttribute("id"), (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="That\'s my work! Type another command to see more."></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0)
    }, 6500), setTimeout(function () {
        document.getElementById("input");
        newInput()
    }, 7e3)) : (current = "", valid())
}

function emailGenerator() {
    if ("email" == document.getElementById("current-p").value.replace(/(<([^>]+)>)/gi, "").toLowerCase()) {
        document.getElementById("typewriter").removeAttribute("id");
        var e = document.getElementById("input");
        e.insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="Enter a subject line"></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
            document.getElementById("input");
            newInput(), current = "subject"
        }, 500)
    } else current = "", valid()
}

function setSubject() {
    subject = document.getElementById("current-p").value, console.log(subject), document.getElementById("typewriter").removeAttribute("id");
    var e = document.getElementById("input");
    e.insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="Enter your email text"></span></div>'), e.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
        document.getElementById("input");
        newInput(), current = "body"
    }, 500)
}

function setBody() {
    var e = document.getElementById("current-p").value;
    console.log(e), document.getElementById("typewriter").removeAttribute("id");
    var t = document.getElementById("input");
    t.insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="Type <span class=\'highlight\'>send</span> if you\'re satisfied with your email. Typing any other command will discard your current draft."></span></div>'), t.removeAttribute("id"), typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
        document.getElementById("input");
        newInput(),
            current = "send",
            url = `mailto:schulzdean4@gmail.com?subject=${subject}&body=${e}`
    }, 1500)
}

function sendEmail() {
    document.getElementById("current-p").contentEditable = !1, "send" == document.getElementById("current-p").value.toLowerCase() && window.open(url, "_blank"), newInput(), current = ""
}

function invalid() {
    (e = document.getElementById("input")).insertAdjacentHTML("afterend", '<div id="input"><span id="typewriter" class="text" data-text="I\'m sorry. That\'s not a valid command. If you need instructions, feel free to type <span class=\'highlight\'>help</span>."></span></div>'), error = !0, e.removeAttribute("id");
    var e = document.getElementById("input");
    typeWriter(document.getElementById("typewriter").dataset.text, 0), setTimeout(function () {
        newInput();
    }, 1e3)
}

function newInput(cursorOnly) {
    $('input').replaceWith('<p class="p-add">' + $('input').val() + '</p>');
    // document.getElementById("input").insertAdjacentHTML('afterend', '<input autocomplete="off" id="current-p" spellcheck="false" class="active paragraph" contenteditable="true">');
    $('.blinking.new').css('display', 'none !important').removeClass('new');
    //   if (counter > 1) {
    //     var e = document.getElementById("current-p");
    //     console.log(e);
    //     e.removeAttribute("id"), e.classList.remove("active")
    //   }
    //   <span class="arrow" style="color: #B8565F">➜</span>
    var t = document.getElementById("input");
    1 == error ? (t.insertAdjacentHTML("afterend", '<div id="input">' + (!cursorOnly ? 'D:\\<span id="first-directory" class="directory">' + username + '></span>' : '') + '<span class="blinking hide-blink new">█</span><input autocomplete="off" id="current-p" spellcheck="false" class="active paragraph" contenteditable="true"/></div>'), t.removeAttribute("id"), focusme(), counter++, error = !1) : t.insertAdjacentHTML("afterend",
        '<div id="input">' + (!cursorOnly ? '<span id="first-directory" class="directory">D:\\' + username + '></span>' : '') + '<span class="blinking hide-blink new">█</span><input autocomplete="off" id="current-p" spellcheck="false" class="active paragraph" contenteditable="true"/></div>'), t.removeAttribute("id"), focusme(), counter++;
    $('#current-p').focus();
    inputPress();
}

function focusme() {
    var e = document.getElementById("current-p");
    e.focus(), e.onblur = function (event) {
        if (event.relatedTarget && !event.relatedTarget.localName == 'a')
            setTimeout(function () {
                e.focus()
            }, 0)
    }
}

function loadResume() {
    var e = new XMLHttpRequest;
    e.onreadystatechange = function () {
        4 == this.readyState && 200 == this.status && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
    }, e.open("GET", "/resume.txt?t=" + Math.random(), !0), e.send()
}

function loadWords() {
    var e = new XMLHttpRequest;
    e.onreadystatechange = function () {
        4 == this.readyState && 200 == this.status && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
    }, e.open("GET", "/written-portfolio.txt?t=" + Math.random(), !0), e.send()
}

function loadDigital() {
    var e = new XMLHttpRequest;
    e.onreadystatechange = function () {
        4 == this.readyState && 200 == this.status && document.getElementById("input").insertAdjacentHTML("afterend", '<div id="input">' + this.responseText + "</div>")
    }, e.open("GET", "/digital-portfolio.txt?t=" + Math.random(), !0), e.send()
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}
hours = 1 == String(d.getHours()).length ? "0" + d.getHours() : d.getHours(), minutes = 1 == String(d.getMinutes()).length ? "0" + d.getMinutes() : d.getMinutes(), seconds = 1 == String(d.getSeconds()).length ? "0" + d.getSeconds() : d.getSeconds(), document.getElementById("date").innerHTML = "Call trans opt: received. " + formatDate(d) + " " + d.toLocaleTimeString().replace(/[^0-9\:]/g, '') + " REC:Log><span class='processing'> [<span class='active'>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span>]</span>", window.onload = function () {
    var e = !1;
    document.addEventListener("touchstart", function () {
        e = !1
    }), document.addEventListener("touchmove", function () {
        e = !0
    }), document.addEventListener("touchend", function () {
        0 == e && ("" == username ? document.getElementById("name-input").focus() : document.getElementById("current-p").focus())
    }), setTimeout(function () {
        nameInput.focus(), nameInput.onblur = function () { //document.getElementById("input").style.visibility = "visible", 
            setTimeout(function () {
                nameInput.focus()
            }, 0)
        }
    }, 2200)
}, nameInput.onkeypress = function (e) {
    e || (e = window.event), "13" == (e.keyCode || e.which) && "" != nameInput.value && ("" == (username = nameInput.value.toLowerCase().replace(/\W/g, "")) && (username = "visitor"), nameInput.classList.remove("active"), nameInput.contentEditable = !1, nameResponse(), counter++)
}, document.body.onkeypress = function (e) {
    "" != username && ("current-p" === e.target.id.toLowerCase() && (e || (e = window.event), "13" == (e.keyCode || e.which) && "" != document.getElementById("current-p").value && (document.getElementById("current-p").contentEditable = !1, "" == current ? valid() : "clips" == current ? whichPortfolio() : "contact" == current ? emailGenerator() : "subject" == current ? setSubject() : "body" == current ? setBody() : "send" == current && sendEmail(), counter++)))
};
var openLink = 0,
    closeLink = 0;

function typeWriter(e, t) {
    if (e)
        if (t < e.length) {
            if (document.getElementById("typewriter").innerHTML = e.substring(0, t + 1), -1 != e.substring(t, t + 1).indexOf("<") ? openLink++ : -1 != e.substring(t, t + 1).indexOf(">") && closeLink++, openLink > closeLink) var n = 0;
            else n = 10;
            t++, setTimeout(function () {
                typeWriter(e, t), document.body.scrollHeight > window.screen.height && window.scrollTo(0, document.body.scrollHeight)
            }, n)
        }
}