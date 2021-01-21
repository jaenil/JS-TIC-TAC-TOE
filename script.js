const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle' ;

const WINNING_COMBINATIONS = [
    [0,1,2] ,
    [3,4,5] ,
    [6,7,8] ,
   
    [0,3,6] ,
    [1,4,7] ,
    [2,5,8] ,

    [0,4,8] ,
    [2,4,6] 
] 

const cellElements = document.querySelectorAll('[data-cell]') ;
const board = document.querySelector('#board') ;

const winningMessageElement = document.getElementById('winningMessage') ;
const restartButton = document.querySelector('#restartbutton') ;
const winningMessageTextElement = document.querySelector('[data-winning-message-text]') ;

let circleTurn ;

function reload(){
    location.reload();
}

startGame() ;

function startGame(){
    circleTurn = false ;
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick,  {once: true} ) ;
    })
    setBoardHoverClass() ;
    
}

function handleClick(e) {

    //placeMark
    const cell = e.target ;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS ;
    placeMark(cell, currentClass) ;
    //Check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        //Check for draw
        endGame(true) ;
    } else{
        swapTurns() ;
        setBoardHoverClass() ;
    }
    
    //Switch Turns

}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!' ;      
    } else {
        let txt ;
        if (circleTurn) {
            txt = "0 has Won!" ;  
           } else {
               txt = "X has Won!"  ; 
           }
        winningMessageTextElement.innerText = txt ;
    }
    winningMessageElement.classList.add('show') ;
}

function isDraw(){
    return [ ...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || 
            cell.classList.contains(CIRCLE_CLASS) ;
    })
}

function placeMark(cell , currentClass){
    cell.classList.add(currentClass) ;
}

function swapTurns(){
    circleTurn = !circleTurn ;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS) ;
    board.classList.remove(CIRCLE_CLASS) ;
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS) ;
    } else {
        board.classList.add(X_CLASS) ;
    }

}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combations => {
        return combations.every(index =>{
            return cellElements[index].classList.contains(currentClass) ;
        })
    })
}