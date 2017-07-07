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
  const $title        = $('.title');
  const $startButton  = $('#startButton');
  const $instructions = $('.instructions');
  const $go           = $('.go');
  const $character    = $('.character');
  const $character2   = $('#character2');
  const $displayChar1 = $('#displayChar1');
  const $displayChar2 = $('#displayChar2');
  const $displayBoss  = $('#displayBoss');
  const $projectile   = $('.projectile');
  const $projectile2  = $('.projectile2');
  const $projectile3  = $('.projectile3');
  const $countDown    = $('.countDown');
  const $action       = $('.action');
  const $attack1      = $('#attack1');
  const $attack2      = $('#attack2');
  const $refreshCD    = $('.refreshCountdown');
  const $potionCD     = $('.potionCountdown');
  const $span1        = $('.span1');
  const $span2        = $('.span2');
  const $potion       = $('#potion');
  const $player1      = $('.player1');
  const $ennemy       = $('.ennemy');
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
  let deadMonster;
  let iceMageIdle;
  let mageHurt;
  let mageShoot;
  let mageSpell;
  let shootProjectile;
  let shootProjectile2;
  let shootProjectile3;
  let mageDead;
  let move            = 0;
  let move2           = 0;
  let move3           = 0;
  let move4           = 0;

  $instructions.hide();
  $character.hide();
  $displayChar1.hide();
  $displayChar2.hide();
  $displayBoss.hide();
  $projectile.hide();
  $projectile2.hide();
  $projectile3.hide();
  $countDown.hide();
  $refreshCD.hide();
  $potionCD.hide();
  $action.hide();
  $player1.hide();
  $ennemy.hide();
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

  //start the game
  $startButton.one('click', function() {
    $startButton.fadeOut();
    $title.fadeOut();
    startGame();
  });

  function startGame() {
    $character.show();
    $instructions.show();
    choseCharacter();
  }

  function choseCharacter() {

    $character2.on('mouseover', function(){
      $go.html('Let\'s go!');
    });
    $character2.on('mouseout', function(){
      $go.html('');
    });

    $character2.on('click', function(){
      $character.fadeOut('fast');
      $instructions.fadeOut('fast');
      displayChar2();
    });
  }

  function displayChar2() {
    $displayChar2.show();
    $displayBoss.show();
    $refreshCD.show();
    $potionCD.show();
    $action.show();
    $span1.show();
    $span1.html('100 / 100');
    $span2.show();
    $span2.html('100 / 100');
    $player1.show();
    $ennemy.show();
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
        $countDown.html('FIGHT!');
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

//animation
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

      if (move3 === 10){
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

  function deadBoss() {
    clearInterval(idleMonster);
    move3 = 0;

    deadMonster = setInterval(function() {
      move3 ++;
      $displayBoss.css('background-image', 'url(images/iceMonsterDead.png)');
      $displayBoss.css('background-position', step * 678);
      step = (step + 1) % 5;

      if (move3 === 1){
        clearInterval(backMonster);
        $displayBoss.css('background-image', 'url(images/iceMonsterDead.png)');
      }
    }, 200);
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

      if(move2 === 18) {
        clearInterval(shootProjectile);
        $projectile.hide();
        iceMageIdlee();
      }
    }, 50);
  }

  function projectile2() {
    clearInterval(iceMageIdle);
    $projectile2.show();
    x = 0;
    move3 = 0;
    shootProjectile2 = setInterval(function() {
      move3 ++;
      $projectile2.css('left', x);
      $projectile2.css('background-position', step * 152);
      step = (step + 1) % 3;
      x = (x + 40) % 700;

      if(move3 === 18) {
        clearInterval(shootProjectile2);
        $projectile2.hide();
      }
    }, 50);
  }

  function projectile3() {
    clearInterval(iceMageIdle);
    $projectile3.show();
    x = 0;
    move4 = 0;
    shootProjectile3 = setInterval(function() {
      move4 ++;
      $projectile3.css('left', x);
      $projectile3.css('background-position', step * 152);
      step = (step + 1) % 3;
      x = (x + 40) % 700;

      if(move4 === 18) {
        clearInterval(shootProjectile3);
        $projectile3.hide();
      }
    }, 50);
  }

  function iceMageSpell() {
    clearInterval(iceMageIdle);
    move = 0;

    mageSpell = setInterval(function() {
      move ++;
      $displayChar2.css('background-image', 'url(images/iceMageShoot.png)');
      $displayChar2.css('background-position', step * 300);
      step = (step + 1) % 4;

      if(move === 2){
        clearInterval(mageSpell);
        projectile();
        projectile2();
        projectile3();
      }
    }, 200);
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
  //end of animation

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
      iceMageSpell();
      damageHealthBar(damage, hBar2, bar2);
      checkBossAttack();
      $attack2.addClass('disabled');
      checkTurns();
    }

    function checkTurns() {
      if ($attack2.hasClass('disabled')) {
        refresh --;
        $refreshCD.html(refresh);
      }
      if (refresh === 0){
        $attack2.removeClass('disabled');
        $attack2.one('click', reUse);
        $refreshCD.html('');
        refresh = 4;
      }
      if ($potion.hasClass('disabled')) {
        healRefresh --;
        console.log(healRefresh);
        $potionCD.html(healRefresh);
      }
      if (healRefresh === 0) {
        $potion.removeClass('disabled');
        $potion.one('click', potion);
        $potionCD.html('');
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
        healing(heal, hBar2, bar2);
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
      $span2.html(hBar2.data('value') + (' / 100'));
    }, 1000);
    winCheck();
  }

  function winCheck(){
    if (hBar2.data('value') <= 0) {
      setTimeout(function() {
        deadBoss();
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
