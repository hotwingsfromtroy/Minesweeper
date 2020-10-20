let global_board;
let global_mined_cells;
let global_flagged_cell;
let no_of_cells;
let no_of_mines = 10;
let global_rows = 9;
let global_cols = 9;

let cell_class = 'big';

const propagation_delay = 15;

// const instructions = document.getElementById('instructions');
let instructions;
let game_status;
let status_message;

const get_elements = () => {
    instructions = document.getElementById('instructions');
    game_status = document.getElementById('game-status');
    status_message = document.getElementById('status-message');

}

// const game_timer_worker = new Worker('game_time.js');

// let w;
// const timer_trial = () =>{

//     if(typeof(Worker) !== "undefined") {
//         if(typeof(w) == "undefined") {
//           w = new Worker("./scripts/game_timer.js");
//         }
//         w.onmessage = function(event) {
//           document.getElementById("game-timer").innerHTML = event.data;
//         };
//       } else {
//         document.getElementById("game-timer").innerHTML = "Sorry, your browser does not support Web Workers...";
//     }
// }


window.onclick = (event) => {
    // let modal = document.getElementById('myModal');
    if (event.target == instructions) {
        instructions.style.display = "none";
    }
    else if (event.target == game_status) {
        game_status.style.display = "none";
    }
};





const show_instructions = () => {
    // let modal = document.getElementById("instructions");
    instructions.style.display = "block";
};

const close_instructions = () => {
    // let span = document.getElementsByClassName("close")[0];
    // let modal = document.getElementById("myModal");

    instructions.style.display = "none";
};





const set_game_status = (game_state) => {
    if(game_state == 'win')
    {
        status_message.innerHTML = 'YOU SURVIVED';
        game_status.className = 'modal-game-won';
    }
    else if(game_state == 'loss')
    {
        status_message.innerHTML = 'YOU BLEW UP';
        game_status.className = 'modal-game-lost';
    }
    game_status.style.display = 'flex';
}



const close_game_status = () => {
    // let span = document.getElementsByClassName("close")[0];
    // let modal = document.getElementById("myModal");

    game_status.style.display = "none";
};



const fin = () => {
    for(let i = 0; i< global_board.length; i++)
    {
        for(let j = 0; j< global_board[i].length; j++)
        {
            let temp_cell = document.getElementById('cell_'+String(i)+'_'+String(j));
            temp_cell.onclick = null;
            // temp_cell.ondblclick = null;
        }
    }
}

const is_win = () => {
    // console.log('cells: '+String(no_of_cells));
    // console.log('mines: '+String(no_of_mines));
    console.log('---------------------');
    if(no_of_cells==no_of_mines)
    {
        fin();
        set_game_status('win');
    }    
}

const get_neighbours = (rows, cols, r, c) => {
    let n = [];
    if(r-1>=0)
    {
        n = [...n, [r-1, c]];
        if(c-1>=0) n = [...n, [r-1, c-1]];
        if(c+1<cols) n = [...n, [r-1, c+1]];
    }  
    if(r+1<rows)
    {
        n = [...n, [r+1, c]];
        if(c-1>=0) n = [...n, [r+1, c-1]];
        if(c+1<cols) n = [...n, [r+1, c+1]];
    }
    if(c-1>=0) n = [...n, [r, c-1]];
    if(c+1<cols) n = [...n, [r, c+1]];
    return n;
}

const get_mine_tag = (arr, r, c) => {
    if(arr[r][c]==-1)
        return -1;
    let tag = 0;
    let nbours = get_neighbours(arr.length, arr[0].length, r, c);
    nbours.forEach(n => {
        tag += arr[n[0]][n[1]] == -1? 1: 0;
    });
    return tag;
}

const print_board = (board) => {
    board.forEach(element => {
        let temp = '';
        element.forEach(e => {
            temp+= String(e) + ' ';
        });
        console.log(temp);
    });
}


const generate_board = () => {
    
    let rows = global_rows, cols = global_cols, mines = no_of_mines;

    no_of_cells = rows*cols;
    // no_of_mines = mines;
    let board = new Array(rows);
    for(let i=0; i<rows; i++)
    {
        board[i] = new Array(cols).fill(0);
    }
    let filled_mines = 0;
    while(filled_mines<mines)
    {
        r = Math.floor(Math.random()*100)%rows;
        c = Math.floor(Math.random()*100)%cols;
        if(board[r][c]==0)
        {
            board[r][c] = -1;
            filled_mines++;
        }
    }

    for(let i=0; i<rows;i++)
    {
        for(let j=0;j<cols;j++)
        {
            board[i][j] = get_mine_tag(board, i, j);
        }
    }

    global_board = board;
    global_mined_cells = new Array(rows);
    global_flagged_cell = new Array(rows);
    for(let i=0; i<rows; i++)
    {
        global_mined_cells[i] = new Array(cols).fill(0);
        global_flagged_cell[i] = new Array(cols).fill(0);
    }
}

const make_minefield = () => {
    generate_board();
    // let r = 0, c=0;
    console.log(global_rows);
    let field = document.getElementById('minefield');
    // let r = 0;
    while(field.hasChildNodes())
        field.removeChild(field.lastChild);


    for(let r =0; r< global_board.length; r++)
    {
        let temp_row = document.createElement('div');
        temp_row.className = "minefield-row";
        temp_row.id = "row_" + String(r);
        for(let c=0; c< global_board[r].length; c++)
        {
            let temp_cell = document.createElement('button');
            temp_cell.className = "cell " + cell_class + " unexplored";
            let cell_id = "cell_" + String(r) + "_" + String(c);
            temp_cell.id = cell_id
            temp_cell.onclick = (event) => reveal_or_toggle(event, cell_id);
            // temp_cell.ondblclick = () => toggle_flag(cell_id);
            temp_cell.innerHTML = '_';
            temp_row.appendChild(temp_cell);
        }
        field.appendChild(temp_row);
        // r++;
    }

    print_board(global_board);
}


const make_beginner_minefield = () => {
    document.getElementById('beginner-board').className = 'option-button selected';
    document.getElementById('intermediate-board').className = 'option-button unselected';
    document.getElementById('advanced-board').className = 'option-button unselected';

    cell_class = 'big';
    global_rows = 9; global_cols = 9; no_of_mines = 10;
    make_minefield();
}

const make_intermediate_minefield = () => {
    document.getElementById('beginner-board').className = 'option-button unselected';
    document.getElementById('intermediate-board').className = 'option-button selected';
    document.getElementById('advanced-board').className = 'option-button unselected';

    cell_class = 'small';
    global_rows = 16; global_cols = 16; no_of_mines = 40;
    make_minefield();
}

const make_advanced_minefield = () => {
    document.getElementById('beginner-board').className = 'option-button unselected';
    document.getElementById('intermediate-board').className = 'option-button unselected';
    document.getElementById('advanced-board').className = 'option-button selected';

    cell_class = 'small';
    global_rows = 16; global_cols = 30; no_of_mines = 99;
    make_minefield();
}



const reveal_default = (r, c) => {

    if(!global_mined_cells[r][c])
    {
        // console.log('revealing: '+ String(r) + ' x ' + String(c));
        global_mined_cells[r][c] = 1;
        no_of_cells--;
        let temp_cell = document.getElementById('cell_' + String(r) + '_' + String(c));
        temp_cell.className = 'cell ' + cell_class + ' discovered';
        // temp_cell.ondblclick = null;
        switch(global_board[r][c])
        {
            case 1:
                temp_cell.classList.add('one');
                break;
            
            case 2:
                temp_cell.classList.add('two');
                break;

            case 3:
                temp_cell.classList.add('three');
                break;
            
            case 4:
                temp_cell.classList.add('four');
                break;
        
            case 5:
                temp_cell.classList.add('five');
                break;
            
            case 6:
                temp_cell.classList.add('six');
                break;
            
            case 7:
                temp_cell.classList.add('seven');
                break;

            case 8:
                temp_cell.classList.add('eight');
                break;
            
            case -1:
                temp_cell.classList.add('mine');
                break;
            
            case 0:
                temp_cell.classList.add('empty');
    
        }

        switch(global_board[r][c])
        {
            case -1:
                temp_cell.innerHTML = '&times;';
                // temp_cell.innerHTML = 'x';

                break;
            
            case 0:
                temp_cell.innerHTML = '_';
                break;
            
            default:
                temp_cell.innerHTML = global_board[r][c];
        }
    }
}



const reveal_propagate = (r, c) => {
    if(global_board[r][c])
    {
        if(global_board[r][c]!=-1)
        // {
            reveal_default(r, c);
            // document.getElementById('cell_'+String(r)+'_'+String(c)).ondblclick = null;
            
        // }
    }
    else
    {
        if(!global_mined_cells[r][c])
        {
            reveal_default(r, c);
            let nbours = get_neighbours(global_board.length, global_board[0].length, r, c);
            nbours.forEach(n => {
                setTimeout(()=>reveal_propagate(n[0], n[1]), propagation_delay);
            });
            // console.log('the neighbours: ', nbours);
        }
    }

}


const game_over  = (mine_id) => {
    // alert('Game Over');
    for(let i=0; i<global_board.length; i++)
        for(let j=0; j< global_board[i].length;j++)
        // {
            reveal_default(i, j);
            // document.getElementById('cell_'+String(i)+'_'+String(j)).ondblclick = null;
        // }
    document.getElementById(mine_id).classList.add('exploded');
    fin();
    // alert('You lost');
    set_game_status('loss');

}


const reveal = (id) => {
    // console.log(id);
    let temp = id.split('_');
    let r = parseInt(temp[1]), c= parseInt(temp[2]);
    if(global_flagged_cell[r][c])
        return;
    switch(global_board[r][c])
    {
        case -1:
            game_over(id);
            break;
        
        case 0:
            reveal_propagate(r, c);
            is_win();
            break;
        
        default:
            reveal_default(r, c);
            is_win();
    }

    // document.getElementById(id).ondblclick = null;
    // reveal(r, c);
}


const toggle_flag = (id) => {
    // alert('Toggled!'+id);
    
    let temp = id.split('_');
    let r = parseInt(temp[1]), c= parseInt(temp[2]);
    if(global_mined_cells[r][c])
        return;
    let temp_cell = document.getElementById(id);
    if(global_flagged_cell[r][c])
    {
        temp_cell.className = 'cell ' + cell_class + ' unexplored';
        // temp_cell.onclick = null;
        global_flagged_cell[r][c] = 0;
    }
    else
    {
        global_flagged_cell[r][c] = 1;
        temp_cell.className = 'cell ' + cell_class + ' flagged';
        // temp_cell.onclick = (event) => reveal_or_toggle(id);
    }
}


const reveal_or_toggle = (event, id) => {
    if(event.altKey)
        toggle_flag(id);
    else
        reveal(id);
}


