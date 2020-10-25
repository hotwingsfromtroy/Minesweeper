const name_tile = (r, c, val, x = 0) => {
    let tile = document.getElementById("tile_" + String(r) + "_" + String(c));
    if(x)
        tile.className = "tile open-tile-x";
    else
        tile.className = "tile open-tile";
    tile.innerHTML = val;
}





const make_tile_page = () => {
    console.log(window.screen.height, window.screen.width);
    console.log(window.innerHeight, window.innerWidth);

    let R = Math.floor(window.screen.height/34);
    // let R = Math.floor(window.innerHeight/34);

    let C = Math.floor(window.screen.width/34);
    R = R&1?R:R-1;
    R-=3;
    C = C&1?C:C+1;
    // generate_board();
    // let r = 0, c=0;
    // console.log(global_rows);
    let field = document.getElementById('start-screen');
    // let r = 0;
    // while(field.hasChildNodes())
    //     field.removeChild(field.lastChild);

    // field.innerHTML="HELLLLOOOOOOOOO";

    let tile_classes = ['filled-tile-2', 'filled-tile-2', 'filled-tile-2', 
                        'filled-tile-3', 'filled-tile-3', 
                        'filled-tile-4', 'filled-tile-4', 
                        'filled-tile-5', 'filled-tile-5', 'filled-tile-5'];
    let tile_nums = tile_classes.length;

    for(let r =0; r< R; r++)
    {
        let temp_row = document.createElement('div');
        temp_row.className = "tile-row";
        temp_row.id = "row_" + String(r);
        for(let c=0; c< C; c++)
        {
            let temp_cell = document.createElement('div');
            temp_cell.className = "tile " + tile_classes[Math.floor(Math.random()*100) % tile_nums];
            let cell_id = "tile_" + String(r) + "_" + String(c);
            temp_cell.id = cell_id
            // temp_cell.onclick = (event) => reveal_or_toggle(event, cell_id);
            // temp_cell.ondblclick = () => toggle_flag(cell_id);
            // temp_cell.innerHTML = '_';
            temp_row.appendChild(temp_cell);
        }
        field.appendChild(temp_row);
        // r++;
    }


    let M_r = Math.floor(R/2)-2, M_c = Math.floor(C/2);




    name_tile(M_r, M_c-5, 'M', 1); name_tile(M_r, M_c-4, 'I', 1); name_tile(M_r, M_c-3, 'N', 1); name_tile(M_r,M_c-2, 'E', 1); name_tile(M_r,M_c-1, 'S');
    name_tile(M_r, M_c, 'W');
    name_tile(M_r, M_c+1, 'E'); name_tile(M_r, M_c+2, 'E'); name_tile(M_r, M_c+3, 'P'); name_tile(M_r, M_c+4, 'E'); name_tile(M_r, M_c+5, 'R');

    name_tile(M_r-1, M_c-6, '');
    name_tile(M_r-1, M_c-5, '');
    name_tile(M_r-1, M_c-4, '');
    name_tile(M_r-1, M_c-3, '');
    name_tile(M_r-1, M_c-2, '');
    name_tile(M_r-1, M_c-1, '');
    name_tile(M_r-1, M_c, '');
    name_tile(M_r-1, M_c+1, '');
    name_tile(M_r-1, M_c+2, '');
    name_tile(M_r-1, M_c+3, '');
    name_tile(M_r-1, M_c+4, '');
    name_tile(M_r-1, M_c+5, '');
    name_tile(M_r-1, M_c+6, '');

    name_tile(M_r, M_c-6, '');
    name_tile(M_r, M_c+6, '');

    name_tile(M_r+1, M_c-6, '');
    name_tile(M_r+1, M_c-5, '');
    name_tile(M_r+1, M_c-4, '');
    name_tile(M_r+1, M_c-3, '');
    name_tile(M_r+1, M_c-2, '');
    name_tile(M_r+1, M_c-1, '');
    name_tile(M_r+1, M_c, '');
    name_tile(M_r+1, M_c+1, '');
    name_tile(M_r+1, M_c+2, '');
    name_tile(M_r+1, M_c+3, '');
    name_tile(M_r+1, M_c+4, '');
    name_tile(M_r+1, M_c+5, '');
    name_tile(M_r+1, M_c+6, '');




    // print_board(global_board);
};



const start_game = () => {
    document.getElementById('start-screen-overlay').style.display='none';
    document.getElementById('start-screen-modal').style.display='none';
    // document.getElementById('start-screen-modal').style.zIndex = -1;

    document.getElementById('main-container').style.display='flex';
    make_beginner_minefield();
};


// const start_screen_spotlight = (e) => {
//     let w = window.screen.width;
//     let h = window.screen.height;

//     mouseXpercentage = Math.round(e.clientX / w * 100);
//     mouseYpercentage = Math.round(e.clientY / h * 100);
  
//     document.getElementById('start-screen-overlay').style.background= 'radial-gradient(at ' + mouseXpercentage + '% ' + 
//     mouseYpercentage + '%, #00000000, #0000006b, #000000c5, #000000)';
// };