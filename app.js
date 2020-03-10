//
//
//
init();

var scores, roundScore, activePlayer, gamePlaying, previousScore, previousScoreSecond, gameWinScore, newGameWinValue;

const startMenu = document.getElementById('instructionsPanel');
document.getElementById('startButton').addEventListener('click', () => { startMenu.style.display = 'none' })


// Roll dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Give random number.
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceSecond = Math.floor(Math.random() * 6) + 1;
        // 2. Display result.
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'

        var diceSecondDOM = document.querySelector('.diceSecond');
        diceSecondDOM.style.display = 'block';
        diceSecondDOM.src = 'dice-' + diceSecond + '.png'

        document.getElementById('playerZeroMessage').innerHTML = '';
        document.getElementById('playerOneMessage').innerHTML = '';

        // Update round score IF the number was NOT 1.
        if (dice !== 1 && diceSecond !== 1) {
            // Add score
            roundScore += dice + diceSecond;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            if (activePlayer === 0) {
                document.getElementById('playerZeroMessage').innerHTML = 'Your last roll was a 1!';
            } else if (activePlayer === 1) {
                document.getElementById('playerOneMessage').innerHTML = 'Your last roll was a 1!';
            };
            nextPlayer();
        }

        // Update round score IF the numbers were not 6 twice.
        if (previousScore === 6 && dice === 6) {
            // Erase global score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            // Next player
            if (activePlayer === 0) {
                document.getElementById('playerZeroMessage').innerHTML = 'You rolled 6 two times';
            } else if (activePlayer === 1) {
                document.getElementById('playerOneMessage').innerHTML = 'You rolled 6 two times';
            };
            nextPlayer();
        } else {
            previousScore = dice;
        }

        if (previousScoreSecond === 6 && diceSecond === 6) {
            // Erase global score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            // Next player
            if (activePlayer === 0) {
                document.getElementById('playerZeroMessage').innerHTML = 'You rolled a 6 two times';
            } else if (activePlayer === 1) {
                document.getElementById('playerOneMessage').innerHTML = 'You rolled a 6 two times';
            };
            nextPlayer();
        } else {
            previousScoreSecond = diceSecond;
        }
    }
});


// Default Game Win Score
gameWinScore = 100;

function getAndSetVal() {
    var newGameWinValue = document.getElementById('gameWinValue').value;
    document.getElementById('gameWinValue1').value = newGameWinValue;

    if (isNaN(newGameWinValue)) {
        alert('The Score Must Be A Number!')
        document.getElementById('gameWinValue').value = "Set a Valid Score";
        gamePlaying = 0;
    } else return [gameWinScore = Math.floor(newGameWinValue, gamePlaying = 1)];
};


// Button hold
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score al global score.
        scores[activePlayer] += roundScore;

        // Update UI con el score.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game.
        if (scores[activePlayer] >= gameWinScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceSecond').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceSecond').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
};