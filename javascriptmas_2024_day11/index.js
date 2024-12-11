const emojis = ['🎄', '🎁', '🎅', '☃️']; // Your set of emojis


/**
 *🎄 Requirements:
 * - This is a classic "Find the Pair" game with a christmas theme.
 * - The player should be able to reveal cards by clicking on them.
 * - When the player reveals one card, it should stay revealed until a second card is revealed.
 * - When the player reveals two cards:
 *   - If they are the same, they should remain revealed for the rest of the game.
 *   - If they are different, they should be flipped back to hidden.
 * - The cards should be shuffled at the start of each game.
 */

/**
 * 🎅 Stretch Goals:
 * - Add a point system where points are awarded for each correctly revealed pair 
 *   and deducted for each incorrect pair (you decide the exact points for each action).
 * - Implement a high-score system using the browser's local storage.
 * - Add a "Restart Game" button that appears when the game ends so the user can start over.
 */
let firstCard = null
let secondCard = null
let hasFlipped = false

function generateGameBoard(emojisArray) {
    const totalNumberOfBoxes = emojisArray.length * 2
    console.log(totalNumberOfBoxes)
    let gameEmojis = [...emojisArray, ...emojisArray]
    shuffleEmoji(gameEmojis)

    const gameContainer = document.createElement('div')
    gameContainer.classList.add('game-container')
    
    for(let i = 0; i < totalNumberOfBoxes; i++) {
        const boxElement = document.createElement('div')
        boxElement.classList.add('card')
        boxElement.textContent = '?'
        boxElement.dataset.emoji = gameEmojis[i]
        boxElement.addEventListener('click', flipCard)
        gameContainer.append(boxElement)
    }
    
    document.getElementById('game-board').append(gameContainer)
}

function shuffleEmoji(arr) {
    arr.sort(() => Math.random() - 0.5)
}

function flipCard(event) {
    if(event.target.classList.contains('revealed') || hasFlipped) return
    console.log(event.target.dataset.emoji)
    event.target.textContent = event.target.dataset.emoji
    event.target.classList.add('revealed')
    
    if(!firstCard) {
        firstCard = event.target
        return
    } else {
        secondCard = event.target
        if(firstCard.dataset.emoji === secondCard.dataset.emoji) {
            resetCard()
        } else {
            setTimeout(function() {
                firstCard.textContent = "?"
                secondCard.textContent = "?"
                firstCard.classList.remove('revealed')
                secondCard.classList.remove('revealed')
                resetCard()
            }, 1000)
        }
    }
}

function resetCard() {
    firstCard = null
    secondCard = null
    hasFlipped = false
}

generateGameBoard(emojis)

// reload page 
document.getElementById('play-again').addEventListener('click', function() {
    location.reload()
})
