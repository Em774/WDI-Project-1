// create a start button
  //create a div, make it clickable, link it to the next stage.
//after the start button, 2 characters should be proposed to chose.
//(hover on one character to see their criteria?)
//click on one character to start the game
//=> if clicked on one character, display that character
//display the character on the left and the boss on the right
//create an object for the attack(s) and heal
//attack the boss healthbar
//create one icon for healing
//click on one icon to activate a spell/attack
//every three turns, the boss attack from a random array of attacks. =>
//create an array of attacks
//when healthbar of player is empty: you lose (vise versa)
//display a window central : you lose. restart:RETRY
//go back to character chosing phase.
//
//bonus: save the score in highest score
//

$(init);

function init() {
  const $startButton  = $('#startButton');
  const $character    = $('.character');
  const $character1   = $('#character1');
  const $character2   = $('#character2');
  const $displayChar1 = $('#displayChar1');
  const $displayChar2 = $('#displayChar2');
  const $displayBoss  = $('#displayBoss');
  const $action       = $('.action');
  const $attack1      = $('#attack1');
  const $attack2      = $('#attack2');
  const $heal         = $('#heal');
  const hBar          = $('.healthbar');
  const hBar2         = $('.healthbar2');
  const bar           = $('.bar');
  const bar2          = $('.bar2');
  const $result       = $('.result');

  $character.hide();
  $displayChar1.hide();
  $displayChar2.hide();
  $displayBoss.hide();
  $action.hide();
  hBar.hide();
  hBar2.hide();
  bar.hide();
  bar2.hide();
  $result.hide();


  $startButton.on('click', function() {
    $startButton.fadeOut();
    startGame();
  });

  function startGame() {
    $character.show();
    choseCharacter();
  }

  function choseCharacter() {
    $character1.on('click', function(){
      $character.fadeOut('fast');
      displayChar1();

    });
    $character2.on('click', function(){
      $character.fadeOut('fast');
      displayChar2();
    });
  }

  function displayChar1() {
    $displayChar1.show();
    $displayBoss.show();
    $action.show();
    hBar.show();
    hBar2.show();
    bar.show();
    bar2.show();
  }

  function displayChar2() {
    $displayChar2.show();
    $displayBoss.show();
    $action.show();
    hBar.show();
    hBar2.show();
    bar.show();
    bar2.show();
    actionButton();
  }

  function actionButton() {
    //first attack
    $attack1.on('click', function() {
      var total = hBar2.data('total');
      var value = hBar2.data('value');

      if (value <= 0) {
        $result.show('fast');
        $result.html('You win!');
      }

      //damage = 20points
      var damage   = 20;
      //result= 80
      var newValue = value - damage;
      //in percentage 80%
      var barWidth = (newValue / total) * 100;

      hBar2.data('value', newValue);

      setTimeout(function(){
        bar2.css('width', barWidth + '%');
      }, 500);
      console.log(value, damage, newValue);
    });

    //attack2
    $attack2.on('click', function() {
      var total = hBar2.data('total');
      var value = hBar2.data('value');

      if (value <= 0) {
        $result.show('fast');
        $result.html('You win!');
      }

      //damage = 20points
      var damage   = 50;
      //result= 80
      var newValue = value - damage;
      //in percentage 80%
      var barWidth = (newValue / total) * 100;

      hBar2.data('value', newValue);

      setTimeout(function(){
        bar2.css('width', barWidth + '%');
      }, 500);
      console.log(value, damage, newValue);
    });

  }


}
