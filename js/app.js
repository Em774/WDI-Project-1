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
//create an array of attacks and counter
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
  const $restart      = $('.restart');
  let counter         = 2;

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
  $restart.hide();


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
      var damage = 10;
      damageHealthBar(damage, hBar2, bar2);
      checkBossAttack();
    });

    //secondAttack
    $attack2.on('click', function() {
      var damage = 50;
      damageHealthBar(damage, hBar2, bar2);
      checkBossAttack();
    });

    //heal
    $heal.on('click', function(){
      hBar.data('value', hBar.data('total'));
      bar.css('width', '100%');
    });
  }

  function checkBossAttack() {
    console.log(counter);
    if (counter === 0) {
      bossAttack();
      counter = 2;
    } else {
      counter--;
    }

    function bossAttack() {
      var bossDamage = [
        {
          damage: '20',
          heal: '2'
        },
        {
          damage: '30',
          heal: '5',
          refresh: '2'
        },
        {
          damage: '50',
          heal: '10',
          refresh: '3'
        },
        {
          damage: '70',
          heal: '5',
          refresh: '5'
        }
      ];
      var dam = bossDamage[Math.floor(Math.random() * bossDamage.length)].damage;
      // console.log(dam);
      setTimeout(function(){
        damageHealthBar(dam, hBar, bar);
      }, 1000);
    }
  }

  function damageHealthBar(damage, healthbar, subBar) {
    var total = healthbar.data('total');
    var value = healthbar.data('value');
    var newValue = value - damage;
    var barWidth = (newValue / total) * 100;
    healthbar.data('value', newValue);
    setTimeout(function(){
      subBar.css('width', barWidth + '%');
    }, 500);
    winCheck(newValue);
  }

  function winCheck(newValue){
    if (newValue <= 0) {
      setTimeout(function() {
        $result.show('easing');
        $result.html('You win!');
      }, 1000);
      $restart.show('slow');
      restart();
    }
  }
}
