var pieceDiameter = 80;
var playerTurn = true;
var board =['_______',
            '_______',
            '_______',
            '_______',
            '_______',
            '_______']
function setup() {
    createCanvas(700, 800);
}

function placePiece(col,isPlayerTurn)
{
    for(i=5;i>=0;i--)
    {
        console.log(i)
        if (board[i][col] == '_')
        {
            var row = '';
            for (j=0;j<7;j++)
            {
                if (j==col)
                {
                    if (isPlayerTurn)
                    {
                        row += 'X';
                    } else
                    {
                        row += 'O';
                    }
                } else
                {
                    row += board[i][j];
                }
            }
            board[i] = row;
            return true;
        }
    }
    return false;
}


function drawBoard()
{
    background('blue');
    stroke(255);
    fill(255);
    rect(0,0,700,100);
    rect(0,700,700,100);
    stroke(0);
    for(col=0;col<7;col++)
    {
        for(row=0;row<6;row++)
        {
            if (board[row][col] == 'X') 
            {
                fill('red');
                ellipse(50+col*100, 150+row*100, pieceDiameter, pieceDiameter);
            } else if (board[row][col] == 'O')
            {
                fill('yellow');
                ellipse(50+col*100, 150+row*100, pieceDiameter, pieceDiameter);
            } else
            {
                fill(255);
                ellipse(50+col*100, 150+row*100, pieceDiameter, pieceDiameter);
            }
        }
    }
    textSize(64);
    if (playerTurn)
    {
        fill('red');
        ellipse(100, 750, pieceDiameter, pieceDiameter);
        ellipse(600, 750, pieceDiameter, pieceDiameter);
        fill(0);
        text("Red's turn.", 195, 775);
        fill('red');
        ellipse(50+100 * floor(mouseX/100), 50, pieceDiameter, pieceDiameter);
    }
    else 
    {
        fill('yellow');
        ellipse(100, 750, pieceDiameter, pieceDiameter);
        ellipse(600, 750, pieceDiameter, pieceDiameter);
        fill(0);
        text("Yellow's turn.", 160, 775);
        fill('yellow');
        ellipse(50+100 * floor(mouseX/100), 50, pieceDiameter, pieceDiameter);
    }
    
}

function mouseClicked() 
{
    if (placePiece(floor(mouseX/100),playerTurn))
    {
        playerTurn = !playerTurn;
    }
    console.log(board);
}

function draw() {
    drawBoard();
}