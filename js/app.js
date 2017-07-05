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
//display the value of the healthbar above the healthbar.
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
  const $countDown    = $('.countDown');
  const $action       = $('.action');
  const $attack1      = $('#attack1');
  const $attack2      = $('#attack2');
  const $span1        = $('.span1');
  const $span2        = $('.span2');
  const $potion       = $('#potion');
  const hBar          = $('.healthbar');
  const hBar2         = $('.healthbar2');
  const bar           = $('.bar');
  const bar2          = $('.bar2');
  const $result       = $('.result');
  const $restart      = $('.restart');
  let counter         = 2;
  let attackCounter   = 0;
  let refresh         = 0;

  //animation
  let step            = 0;
  // let x               = 0;
  let idleZombie;
  let idleNinja;

  $character.hide();
  $displayChar1.hide();
  $displayChar2.hide();
  $displayBoss.hide();
  $countDown.hide();
  $action.hide();
  $span1.hide();
  $span2.hide();
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
    $span1.show();
    $span2.show();
    hBar.show();
    hBar2.show();
    bar.show();
    bar2.show();
  }

  function displayChar2() {
    $displayChar2.show();
    $displayBoss.show();
    $action.show();
    $span1.show();
    $span1.html('100 / 100');
    $span2.show();
    $span2.html('100 / 100');
    hBar.show();
    hBar2.show();
    bar.show();
    bar2.show();
    idleBoss();
    idleNinjaa();
    countDown();
  }

  function countDown() {
    $countDown.show();
    var count = 3;
    var timer = setInterval(function() {
      handleTimer(count);
    }, 1000);

    function handleTimer(){
      if(count === 0) {
        $countDown.html('Fight!');
        clearInterval(timer);
        setTimeout(function() {
          $countDown.hide();
          actionButton();
        }, 1000);

      } else {
        $countDown.html(count);
        count--;
      }
    }
  }


  function idleBoss() {
    idleZombie = setInterval(function() {
      $displayBoss.css('background-position', step * 430);
      step = (step + 1) % 15;
    }, 250);
  }

  function idleNinjaa() {
    idleNinja = setInterval(function() {
      $displayChar2.css('background-position', step * 232);
      step = (step + 1) % 10;
    }, 180);
  }

  function actionButton() {

    //first attack
    $attack1.on('click', function() {
      var damage = 10;
      damageHealthBar(damage, hBar2, bar2);
      checkBossAttack();
      attackCounter ++;
      checkTurns();
    });

    //secondAttack
    $attack2.on('click', reUse);

    function reUse(){
      var damage = 50;
      damageHealthBar(damage, hBar2, bar2);
      checkBossAttack();
      attackCounter ++;
      $attack2.off();
      checkTurns();
    }

    function checkTurns() {
      if ($attack2.off()) {
        $attack2.css('background', 'red');
        refresh ++;
        console.log(refresh);
      }
      if (refresh === 4){
        $attack2.on('click', reUse);
        $attack2.css('background', 'green');
        refresh = 0;
      }

    }

    //heal
    $potion.on('click', function(){
      hBar.data('value', hBar.data('total'));
      bar.css('width', '100%');
      $span1.html(hBar.data('value') + ' / 100');
      checkBossAttack();
      attackCounter ++;
      checkTurns();
    });
  }

  function checkBossAttack() {
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
          heal: '20'
        },
        {
          damage: '30',
          heal: '10',
          refresh: '2'
        },
        {
          damage: '50',
          heal: '5',
          refresh: '3'
        },
        {
          damage: '70',
          heal: '10',
          refresh: '5'
        }
      ];
      var dam = bossDamage[Math.floor(Math.random() * bossDamage.length)].damage;
      var heal = bossDamage[Math.floor(Math.random() * bossDamage.length)].heal;

      setTimeout(function(){
        damageHealthBar(dam, hBar, bar);
        healing(heal, hBar2, bar2); //new
        $span1.html(hBar.data('value') + ' / 100');
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
      $span2.html(newValue + (' / 100'));
    }, 500);
    winCheck(newValue);
  }

  function winCheck(newValue){
    if (newValue <= 0) {
      setTimeout(function() {
        $result.show('easing');
        $result.html('You win!');
        $restart.show('slow');
      }, 1000);
      restart();
    }
  }

  function healing(heal, hBar2, bar2 ) {
    var value = hBar2.data('value');
    var newValue = +value + +heal;
    console.log(value, newValue, heal);
    var barWidth = newValue;
    hBar2.data('value', newValue);
    // console.log(newValue);
    setTimeout(function(){
      bar2.css('width', barWidth + '%');
    }, 1000);
  }

  function restart() {
    $restart.on('click', function() {
      location.reload();
    });

  }
}
