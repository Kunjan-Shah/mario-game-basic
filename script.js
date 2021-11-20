let gamebox = document.getElementById('gamebox');
let context = gamebox.getContext('2d');
let level = 1;
document.getElementById('level').innerHTML = "Level: " + level;

let enemy = {
    color: 'red',
    x: 200,
    y: 0,
    h: 50,
    w: 50,
    vx: 0,
    vy: 1,
    speed: 1
};

let player = {
    color: 'blue',
    x: 0,
    y: 175,
    h: 50,
    w: 50,
    vx: 1,
    vy: 0
};

let goal = {
    color: 'green',
    x: 750,
    y: 175,
    h: 50,
    w: 50
}

function drawBox(box) {
    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.w, box.h);
}

function updateGameState() {
    enemy.y += enemy.vy;
    if(enemy.y + enemy.h > gamebox.height) {
        enemy.vy = -enemy.vy;
    } else if(enemy.y < 0) {
        enemy.vy = -enemy.vy;
    }
    detectCollision();
}

function detectFinish() {
    if(player.x > 700) {
        alert("AWESOME! YOU HAVE COMPLETED THE LEVEL");
        // increase the level
        level += 1;
        document.getElementById('level').innerHTML = "Level: " + level;
        // increase the speed of the enemy
        console.log("TO INCREASE ENEMY SPEED", enemy.vy);
        enemy.speed += 1;
        // reset the game
        resetGame();
    }
}

function resetGame() {
    // reset enemy
    enemy.x = 200;
    enemy.y = 0;
    enemy.vx = 0;
    enemy.vy = enemy.speed;

    // reset player
    player.x = 0;
    player.y = 175;
    player.vx = 1;
    player.vy = 0;
}

function detectCollision() {
    if(player.x > 150 && player.x <= 250 && enemy.y > 125 && enemy.y <= 225) {
        // collision occurs
        alert("GAME OVER");
        // change level to 1
        level = 1;
        document.getElementById('level').innerHTML = "Level: " + level;
        enemy.speed = 1;
        resetGame();
    }
}

document.onkeydown = moveMario;

function moveMario(key) {
    // pressed right arrow key
    if(key.keyCode == '39') {
        player.x += 5;
        // detect collision
        detectCollision();
        // check if level completed
        detectFinish();
    }
    // pressed left arrow key
    else if(key.keyCode == '37') {
        player.x -= 5;
        // detect collision
        detectCollision();
    }
}

function updateGame() {
    // update game state
    updateGameState();
    // clear the canvas
    context.clearRect(0, 0, gamebox.width, gamebox.height);
    // draw the player
    drawBox(player);
    // draw the enemy
    drawBox(enemy);
    //draw the goal
    drawBox(goal);

    window.requestAnimationFrame(updateGame);
}

updateGame();