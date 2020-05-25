
Array.prototype.clone = function () {
    return this.slice(0);
};
/*
listcauhoi ='[
    {
        cauhoi:"đâu là thủ đô của nhật bản",
        dapan1:"tokyo",
        dapan2:"kasawa",
        dapan3:"hirosima",
        dapan4:"nakasawa",
        dapandung:"tokyo"
    },
    {
        cauhoi:"Điền từ còn thiếu vào câu ca dao: Gần mực thì đen, gần đèn thì...gì?",
        dapan1:"tối",
        dapan2:"chói",
        dapan3:"sáng",
        dapan4:"lóa",
        dapandung:"sáng"
    },
    {
        cauhoi:"Haiku là thể thơ truyền thống của nước nào?",
        dapan1:"nhật bản",
        dapan2:"hàn quốc",
        dapan3:"triều tiên",
        dapan4:"trung quốc",
        dapandung:"nhật bản"
    },
    {
        cauhoi:"Đâu là tên một loại bánh nổi tiếng ở Huế?",
        dapan1:"thích",
        dapan2:"sướng",
        dapan3:"khoái",
        dapan4:"vui",
        dapandung:"khoái"
    }      
]';
*/

function randomInteger(a, b) {
    return Math.floor(Math.random() * (a - b + 1)) + a;
}

$(document).ready(function () {
    GameALTP = (function () {
        function GameALTP() {
            this._questionArray = [];
            this._questionContent = [];
            this._answerArray = [];
            this._selectArray = [];
            this._color = '#3498db';
            this._boardPage = 0;
            this.hide($('#next-question'));
            this.hide($('#restart-game'));
            this.hide($("#survey-region"));
            this._keep = 0;
            _this = this;
        }

        GameALTP.prototype.startGame = function () {
            this.hide($("#button"));
            this.show($("#board-button"));
            this.show($('#each-question'));
            this.hide($("#submit-answer"));
            this.hide($('#next-question'));
            this.hide($("#restart-game"));
            this.hide($("#alert"));
            this.hide($('#top-start'));
            
           /* for (var i = 0; i < 10; i++) {
                          this.Rendercauhoi();
                        }*/
            this._boardPage = 0;
        };

        GameALTP.prototype.setMaxCharacter = function () {
            var maxABCD = 40;
            $("#a").attr('maxlength', maxABCD);
            $("#b").attr('maxlength', maxABCD);
            $("#c").attr('maxlength', maxABCD);
            $("#d").attr('maxlength', maxABCD);
            $("#inputQ").attr('maxlength', '255');
        };
/*         GameALTP.prototype.Rendercauhoi = function () {
            var list = JSON.parse(listcauhoi); 
            var so = randomInteger(0,list.length-1);
            this._questionContent.append(list[so].cauhoi);
            ////////////////
            this._questionArray.append(list[so].dapan1);
            this._questionArray.append(list[so].dapan2);
            this._questionArray.append(list[so].dapan3);
            this._questionArray.append(list[so].dapan4);
            ////////
            this._questionArray.append(list[so].dapandung);
         };*/


        GameALTP.prototype.showBoard = function () {
            var index = this._boardPage * 5;
            $("#question-number").html(this._boardPage + 1);
            $("#display-question").html(this._questionContent[this._boardPage]);
            $("#boxA").append("<span class='char'>A</span>" + this._questionArray[index]);
            $("#boxB").append("<span class='char'>B</span>" + this._questionArray[index + 1]);
            $("#boxC").append("<span class='char'>C</span>" + this._questionArray[index + 2]);
            $("#boxD").append("<span class='char'>D</span>" + this._questionArray[index + 3]);
            var answerID = "#" + _this._answerArray[this._boardPage];
            $(answerID).attr('class', 'answerBox');
            this.show($("#reward"));
        };

        GameALTP.prototype.restartGame = function () {
            this._boardPage = 0;
            $("#question-number").html(this._boardPage + 1);
            $("#display-question").html(this._questionContent[this._boardPage]);
            ($("#reward")).empty();
            this.show($('#board-button'));
            this.hide($("#submit-answer"));
            this.hide($('#restart-game'));
            this.hide($('#next-question'));
            this.hide($('#alert'));
            /*for (var i = 0; i < 10; i++) {
              //this.Rendercauhoi();
            }*/
            this.showBoard();


        };


        GameALTP.prototype.drawMap = function () {
            var countQuestion = this._answerArray.length;

            for (var i = 1; i <= countQuestion; i++) {
                if (i % 5 !== 0) {
                    $("#reward").append("<div class='rewardStep' id='" + i + "'><p class='number'>" + i + "</p></div>")
                } else {
                    $("#reward").append("<div class='specialRewardStep' id='" + i + "'><p class='specialNumber'>" + i + "</p></div>")
                }
            }

        };

        GameALTP.prototype.changeStepColor = function () {
            var currentStep = this._boardPage + 1;
            for (var i = 1; i < currentStep; i++) {
                var id = "#" + i;
                $(id).css('background-color', '#2ecc71');
            }
            currentStep = "#" + currentStep;
            $(currentStep).css('background-color', '#f39c12');


        };


        GameALTP.prototype.nextQ = function () {
            this._boardPage++;
            var step = this._boardPage + 1;
            this.hide($('#submit-answer'));
            this.hide($('#restart-game'));
            this.hide($('#next-question'));
            this.show($('#board-button'));
            this.hide($('#alert'));

            $("#question-number").html(this._boardPage + 1);
            if (step % 5 == 0) {
                $("#question-number").css("background-color", "yellow");
                $("#display-question").css("color", "yellow");
            } else {
                $("#question-number").css("background-color", "#ffffff");
                $("#display-question").css("color", "#ffffff");
            }

            $("#display-question").html(this._questionContent[this._boardPage]);


        };

        
        GameALTP.prototype.hide = function (elementDom) {
            this._elementDom = elementDom;
            this._elementDom.css('display', 'none');

        };

        GameALTP.prototype.show = function (elementDom) {
            this._elementDom = elementDom;
            this._elementDom.css('display', 'block');
        };
        GameALTP.prototype.changeSubmitAnswerButton = function () {
            !this.checkResult(this._boardPage) ? this.show($("#restart-game")) : this.show($("#next-question"));

        };

        GameALTP.prototype.withdraw = function () {
            this.show($('#alert'));
            this.hide($("#submit-answer"));
            this.hide($("#withdraw-button"));
            this.show($("#restart-game"));
            var message = "You've already withdraw and keep the reward for Question " + this._boardPage;
            $("#alert").attr("class", "alert alert-info");
            $("#alert").html(message);

        };

        GameALTP.prototype.resetBoardStatus = function () {
            $("#boxA").css('background-color', '#3498db');
            $("#boxB").css('background-color', '#3498db');
            $("#boxC").css('background-color', '#3498db');
            $("#boxD").css('background-color', '#3498db');
            $("#boxA").empty();
            $("#boxB").empty();
            $("#boxC").empty();
            $("#boxD").empty();

            $('.answerBox').css('pointer-events', 'auto');
            $('.boxWrong').css('pointer-events', 'auto');
            $('#sellector').css('pointer-events', 'auto');
            $('.box').css('pointer-events', 'auto');
            $('.answerBox').attr('class', 'box');
            $('.boxWrong').attr('class', 'box');


            this._color = '#3498db';
            clearInterval(this._interval);
        };

        GameALTP.prototype.selectBox = function (boxID) {
            var id = "#" + boxID;

            if (boxID == "boxA" || boxID == "boxB" || boxID == "boxC" || boxID == "boxD") {

                $("#boxA").css('background-color', '#3498db');
                $("#boxB").css('background-color', '#3498db');
                $("#boxC").css('background-color', '#3498db');
                $("#boxD").css('background-color', '#3498db');

                $(id).css('background-color', '#f1c40f');
                this.show($('#submit-answer'));
                this._selectArray[this._boardPage] = boxID;
            }
        };


        GameALTP.prototype.checkResult = function (number) {
            if (this._answerArray[number] === this._selectArray[number]) {
                console.log("tra loi dung");
                return true;
            } else {
            console.log("tra loi sai");
                return false
            }
        };

        GameALTP.prototype.nextOrStop = function () {
            var page = this._boardPage;
            
            var diem =0;
            for(var i=0;i<10;i++)
            {
                if(this._answerArray[i]!= null)
                {
                if (this.checkResult(i)) {                    
                                      diem++;
                                }
                }
            }
            $("#alert").attr("class", "alert alert-success");
            $("#alert").html("Congratulation! Your Answer is alright!");
            _this._color = '#f1c40f';
            $("#alert").attr("class", "alert alert-success");
            $("#alert").html("Congratulation! You passed " + diem +"/ 10 questions of this Game");
            this.show($('#restart-game'));
            this.hide($('#next-question'));          

            this.hide($("#submit-answer"));                        
           

        };

        GameALTP.prototype.congrats = function () {
            this._interval = setInterval(function () {
                if (_this._hover) {
                    $('.answerBox').css('background-color', '#2ecc71');
                    $('.answerBox').css('pointer-events', 'none');
                    $('#sellector').css('pointer-events', 'none');
                    $('.box').css('pointer-events', 'none');
                } else {
                    $('.answerBox').css('background-color', _this._color);
                    $('.answerBox').css('pointer-events', 'none');
                    $('#sellector').css('pointer-events', 'none');
                    $('.box').css('pointer-events', 'none');
                }
                _this._hover = !_this._hover;

            }, 150);
        };

        GameALTP.prototype.NumberBoxNameChanger = function (value) {

            if (value == "boxA") {
                return 1;
            } else if (value == "boxB") {
                return 2;
            } else if (value == "boxC") {
                return 3;
            } else if (value == "boxD") {
                return 4;
            } else if (value == 1) {
                return "boxA"
            } else if (value == 2) {
                return "boxB"
            } else if (value == 3) {
                return "boxC"
            } else {
                return "boxD"
            }

        };

        GameALTP.prototype.clearWrong = function (boxName1, boxName2) {

            boxName1 = "#" + boxName1;
            boxName2 = "#" + boxName2;
            $(boxName1).attr('class', 'boxWrong');
            $(boxName2).attr('class', 'boxWrong');
            $(boxName1).css('pointer-events', 'none');
            $(boxName2).css('pointer-events', 'none');
            $(boxName1).css('background-color', '#3498db');
            $(boxName2).css('background-color', '#3498db');

        };

        GameALTP.prototype.boxWrong = function (boxName, random1, random2) {
            var boxID = this.NumberBoxNameChanger(boxName);

            if (random1 == random2) {
                if (random1 !== 1) {
                    random1--
                } else {
                    random1++
                }
            }

            var number1 = (boxID + random1) % 4;
            if (number1 == 0)(number1 = 4);
            var number2 = (boxID + random2) % 4;
            if (number2 == 0)(number2 = 4);
            var boxWrong1 = this.NumberBoxNameChanger(number1);
            var boxWrong2 = this.NumberBoxNameChanger(number2);

            for (var i = 1; i <= 4; i++) {
                if (i !== number1 && i !== number2 && i !== boxID) _this._keep = i;
            }
            this.clearWrong(boxWrong1, boxWrong2);
        };

        GameALTP.prototype.constructor = GameALTP;

        return GameALTP;


    })();


    $("#sellector").click(function (e) {
        var GameALTP = window.GameALTP;
        if (e.target.id !== "characterBox" && e.target.id !== "sellector") {
            _this.targetID = e.target.id;
            GameALTP.selectBox(_this.targetID);
        }
    });

    $("#next-question").click(function (e) {
        console.log("eeeeee click nut câu tiếp theo");
        var GameALTP = window.GameALTP;
        GameALTP.resetBoardStatus();
        GameALTP.nextQ();
        GameALTP.showBoard();
        GameALTP.changeStepColor();
    });

    $("#restart-game").click(function (e) {
        console.log("click nut restart");
        e.preventDefault();
        var GameALTP = window.GameALTP;
        GameALTP.resetBoardStatus();
        GameALTP.restartGame();
        GameALTP.drawMap();
        GameALTP.changeStepColor();

    });
    $("#submit-answer").click(function (e) {
        e.preventDefault();
        var GameALTP = window.GameALTP;
        if(GameALTP._boardPage == 9){        
            GameALTP.changeSubmitAnswerButton();
            GameALTP.nextOrStop();
            GameALTP.congrats();
            GameALTP.hide($('#board-button'));
            GameALTP.show($('#alert'));
        }
        else
        {
           GameALTP.resetBoardStatus();
           GameALTP.nextQ();
           GameALTP.showBoard();
           GameALTP.changeStepColor();
        }

    });

   
        
    $("#btn-start").click(function (e) {  
        console.log("click nut start");                         
        e.preventDefault();
        var GameALTP = window.GameALTP;
            GameALTP.resetBoardStatus();
            GameALTP.startGame();
            GameALTP.showBoard();
            GameALTP.drawMap();
            GameALTP.changeStepColor();
            if(GameALTP._questionContent.length ==0)
            {
            alert("không có data câu hỏi");}
        });

    $("#withdraw-button").click(function (e) {
        e.preventDefault();
        var GameALTP = window.GameALTP;
        GameALTP.congrats();
        GameALTP.withdraw();
    });

     $("#ignore-btn").click(function (e) {
     
            e.preventDefault();
            var GameALTP = window.GameALTP;
            if(GameALTP._boardPage == 9){        
                        GameALTP.changeSubmitAnswerButton();
                        GameALTP.nextOrStop();
                        GameALTP.congrats();
                        GameALTP.hide($('#board-button'));
                        GameALTP.show($('#alert'));
                    }
                    else
                    {
                    GameALTP.resetBoardStatus();
                          GameALTP.nextQ();
                          GameALTP.showBoard();
                          GameALTP.changeStepColor();
                    }
            
        });
        
    var GameALTP = new GameALTP();
    window.GameALTP = GameALTP;
    GameALTP.show($('#top-start'));
    GameALTP.hide($('#each-question'));
    GameALTP.setMaxCharacter();
    
});