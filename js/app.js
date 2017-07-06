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
  const $projectile   = $('.projectile');
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
  let refresh         = 4;
  let healRefresh     = 4;

  //animation
  let step            = 0;
  let x               = 0;
  let idleMonster;
  let walkMonster;
  let attackMonster;
  let backMonster;
  // let idleNinja;
  let iceMageIdle;
  let mageHurt;
  let mageShoot;
  let shootProjectile;
  let mageDead;
  let move            = 0;
  let move2           = 0;
  let move3           = 0;


  $character.hide();
  $displayChar1.hide();
  $displayChar2.hide();
  $displayBoss.hide();
  $projectile.hide();
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


  $attack1.on('mouseover', function(){
    $attack1.html('-10');
  });
  $attack1.on('mouseout', function() {
    $attack1.html('Shoot');
  });

  $attack2.on('mouseover', function(){
    $attack2.html('-50');
  });
  $attack2.on('mouseout', function() {
    $attack2.html('Spell');
  });

  $potion.on('mouseover', function(){
    $potion.html('+100%');
  });
  $potion.on('mouseout', function() {
    $potion.html('Potion');
  });


  $startButton.one('click', function() {
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
    iceMageIdlee();
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
    idleMonster = setInterval(function() {
      $displayBoss.css('background-image', 'url(images/iceMonster-idle.png)');
      $displayBoss.css('background-position', step * 678);
      step = (step + 1) % 6;
    }, 500);
  }

  function walkBoss() {
    clearInterval(idleMonster);
    move3 = 0;

    walkMonster = setInterval(function() {
      move3 ++;
      $displayBoss.css('background-image', 'url(images/iceMonster-walk.png)');
      $displayBoss.css('left', x);
      $displayBoss.css('background-position', step * 678);
      step = (step + 1) % 9;
      x = (x - 40) % 700;

      if (move3 === 17){
        clearInterval(walkMonster);
        attackBoss();
      }
    }, 100);
  }

  function attackBoss() {
    move3 = 0;

    attackMonster = setInterval(function() {
      move3 ++;
      $displayBoss.css('background-image', 'url(images/iceMonster-attack.png)');
      $displayBoss.css('left', x);
      $displayBoss.css('background-position', step * 678);
      step = (step + 1) % 7;
      iceMageHurt();

      if (move3 === 7){
        clearInterval(attackMonster);
        backBoss();
      }
    }, 200);
  }

  function backBoss() {
    move3 = 0;
    x = -700;
    backMonster = setInterval(function() {

      move3 ++;
      $displayBoss.css('background-image', 'url(images/iceMonster-walk.png)');
      $displayBoss.css('left', x);
      $displayBoss.css('background-position', step * 678);
      step = (step + 1) % 9;
      x = (x + 40) % 700;

      if (move3 === 18){
        clearInterval(backMonster);
        idleBoss();
      }
    }, 100);
  }



  function iceMageIdlee() {
    iceMageIdle = setInterval(function() {
      $displayChar2.css('background-image', 'url(images/iceMageIdle.png)');
      $displayChar2.css('background-position', step * 300);
      step = (step + 1) % 6;
    }, 250);
  }

  function iceMageHurt() {
    clearInterval(iceMageIdle);
    move = 0;

    mageHurt = setInterval(function() {
      move ++;
      $displayChar2.css('background-image', 'url(images/iceMageHurt.png)');
      $displayChar2.css('background-position', step * 300);
      step = (step + 1) % 3;

      if (move === 1){
        clearInterval(mageHurt);
        iceMageIdlee();
      }
    }, 100);
  }

  function iceMageShoot() {
    clearInterval(iceMageIdle);
    move = 0;

    mageShoot = setInterval(function() {
      move ++;
      $displayChar2.css('background-image', 'url(images/iceMageShoot.png)');
      $displayChar2.css('background-position', step * 300);
      step = (step + 1) % 4;

      if(move === 1){
        clearInterval(mageShoot);
        projectile();
      }
    }, 200);
  }

  function projectile() {
    clearInterval(iceMageIdle);
    $projectile.show();
    x = 0;
    move2 = 0;
    shootProjectile = setInterval(function() {
      move2 ++;
      $projectile.css('left', x);
      $projectile.css('background-position', step * 152);
      step = (step + 1) % 3;
      x = (x + 40) % 700;

      if(move2 === 19) {
        clearInterval(shootProjectile);
        $projectile.hide();
        iceMageIdlee();
      }
    }, 50);
  }

  function iceMageDead() {
    clearInterval(iceMageIdle);
    clearInterval(mageHurt);
    move = 0;

    mageDead = setInterval(function() {
      move ++;
      $displayChar2.css('background-image', 'url(images/iceMageDead.png)');
      $displayChar2.css('background-position', step * 300);
      step = (step + 1) % 5;

      if(move === 1){
        clearInterval(mageDead);
      }
    }, 1000);
  }

  function actionButton() {

    //first attack
    $attack1.on('click', function() {
      var damage = 10;
      iceMageShoot();
      damageHealthBar(damage, hBar2, bar2);
      checkBossAttack();
      checkTurns();
    });

    //secondAttack
    $attack2.one('click', reUse);

    function reUse(){
      var damage = 50;
      damageHealthBar(damage, hBar2, bar2);
      checkBossAttack();
      $attack2.addClass('disabled');
      checkTurns();
    }

    function checkTurns() {
      console.log('checkTurns');
      if ($attack2.hasClass('disabled')) {
        console.log('second button is disabled');
        refresh --;
      }
      if (refresh === 0){
        $attack2.removeClass('disabled');
        $attack2.one('click', reUse);
        refresh = 4;
      }
      if ($potion.hasClass('disabled')) {
        healRefresh --;
        console.log(healRefresh);
      }
      if (healRefresh === 0) {
        $potion.removeClass('disabled');
        $potion.one('click', potion);
        healRefresh = 4;
      }
    }

    //heal
    $potion.one('click', potion);

    function potion() {
      hBar.data('value', hBar.data('total'));
      bar.css('width', '100%');
      $span1.html(hBar.data('value') + ' / 100');
      checkBossAttack();
      $potion.addClass('disabled');
      checkTurns();
    }

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
          heal: '10'
        },
        {
          damage: '50',
          heal: '5'
        },
        {
          damage: '70',
          heal: '10'
        }
      ];
      var dam = bossDamage[Math.floor(Math.random() * bossDamage.length)].damage;
      var heal = bossDamage[Math.floor(Math.random() * bossDamage.length)].heal;

      setTimeout(function(){
        damageHealthBar(dam, hBar, bar);
        healing(heal, hBar2, bar2); //new
        // iceMageHurt();
        walkBoss();
        $span1.html(hBar.data('value') + ' / 100');
      }, 2000);
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
    winCheck();
  }

  function winCheck(){
    if (hBar2.data('value') <= 0) {
      setTimeout(function() {
        $result.show('easing');
        $result.html('You win!');
        $restart.show();
      }, 1000);
      restart();
    }
    if (hBar.data('value') <= 0) {
      clearInterval(iceMageIdle);
      iceMageDead();

      setTimeout(function() {
        $result.show('easing');
        $result.html('You Lose!');
        $restart.show();
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
