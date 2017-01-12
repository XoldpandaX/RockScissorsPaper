$(document).ready( function () {
    var weapons = ["images/paper.png", "images/rock.png",
                   "images/scissors.png",];

    $("#buttons > li > button").on("click", function() {
        var playerWeapon = $("#you > img");
        var computerWeapon = $("#computer > img");
        reset(playerWeapon, computerWeapon);

        var playerWeaponsId = $(this).attr('id');// выбраныое оружие игрока
        var computerWeaponsId = comTurn();// выбраныое оружие компьютера

        setSecCountdown();
        setTimeout( // остановка работы основной логики на 1800 м/сек
            function() {
                var playerTurn = weapons[playerWeaponsId];// ход игрока
                playerWeapon.attr("src", playerTurn);

                var computerTurn = weapons[computerWeaponsId];// ход компьютера
                computerWeapon.attr("src", computerTurn);

                var msg = detectWinner(playerWeaponsId, computerWeaponsId);
                displayStatus(msg);
            }
            , 1800);

    });

    function setSecCountdown() { // отсчёт 3х секунд и добавление анимации
        $(".first").addClass("shake");
        var counter = 3;
        displayStatus(counter);
        var interval = setInterval(function() {
            counter--;
            displayStatus(counter);
            if (counter == 0) {
                clearInterval(interval);
            }
        }, 600);
    }

    function displayStatus(msg) {
        $("#status > ul > li").remove();
        $("#status > ul").append("<li class='statusMsg'></li>");
        $(".statusMsg").text(msg);
    } // вывод сообщений состояния

    function comTurn() {
        var comPlayer = Math.floor(Math.random() * weapons.length);
        return comPlayer
    } // расчёт хода компьютера

    function reset(playerImg, comImg) {
        playerImg.attr('src', "images/right_fist.png");
        comImg.attr('src', "images/left_fist.png");
    } // сброс выбранного оружия(картинок)

    // определяем победителя и сбрасываем класс анимации
    function detectWinner(playerId, computerId) {
        $(".first").removeClass("shake");
        var msg;
        if (playerId == computerId) {
            msg = "Ничья";
        } else if(playerId == 0 && computerId == 1) {
            msg = "Вы победили";
        } else if (playerId == 2 && computerId == 0) {
            msg = "Вы победили";
        } else if (playerId == 1 && computerId == 2) {
            msg = "Вы победили";
        } else {
            msg = "Победил компьютер";
        }
        return msg
    }
});
