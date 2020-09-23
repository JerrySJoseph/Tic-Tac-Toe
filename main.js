

const X_CLASS='x'
const CIRCLE_CLASS='circle'
const cellelements= document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
const status=document.getElementById('status');
const clearButton=document.getElementById('clear-button');
let circleturn;
let won=false;
const WINNING_COMBONATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

startGame();

function startGame()
{
    circleturn=false;
    cellelements.forEach(cell=>{
        cell.addEventListener('click',handleClick,{once:true});
    })
    clearButton.addEventListener('click',clearBoard);
    setBoardhoverClass();
    updateTurn();
}
function updateTurn()
{
    let string=circleturn?"O's Turn":"X's Turn";
    status.innerHTML=string;
}


function handleClick(e)
{
   const cell=e.target;
   const currentclass=circleturn?CIRCLE_CLASS:X_CLASS;
   placeMark(cell,currentclass);
   if(checkWin())
   {
       stopGame(false);
       return;
   }
   else if(isDraw()){
       stopGame(true)
   }
   else
   {
    swapTurn();
    setBoardhoverClass();
    updateTurn();
   }
  
}
function isDraw()
{
    return [...cellelements].every(cell=>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
    })
}
function clearBoard()
{
    cellelements.forEach(cell=>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        startGame();
    })
}
function stopGame(draw)
{
    if(draw)
    {
        swal({
            title:'draw',
            icon:'info',
            text:'The match is Draw',
            button:'try again',
            background:'#252d4a',

        });
        clearBoard();
        startGame();
    }
    else{
        let string=circleturn?"O Wins!":"X Wins!";
        swal({
            title:'Hurray!',
            icon:'success',
            text:string,
            button:'Play Again',
            background:'#252d4a',
        });
        clearBoard();
        startGame();
    }
}
function placeMark(cell,currentclass){
    cell.classList.add(currentclass);
   
}
function swapTurn()
{
    circleturn=!circleturn;
    
}
function showWin()
{
  
}
function setBoardhoverClass(){

    const currentclass=circleturn?CIRCLE_CLASS:X_CLASS;
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    board.classList.add(currentclass);
}
function checkWin()
{
    const currentclass=circleturn?CIRCLE_CLASS:X_CLASS;
    return WINNING_COMBONATIONS.some(combination=>{
       return combination.every(value=>{
            return cellelements[value].classList.contains(currentclass)
        })
    })
}