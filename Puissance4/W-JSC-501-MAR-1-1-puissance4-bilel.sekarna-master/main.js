(function($){
  $.fn.myplugin = function (options) {
      let settings = $.extend({
          sizeDefault : [6,7],
          player1: '#B22222',
          player2: '#F4A460',
          margin :'20px',
          borders : '1px solid black',
          bg_color : 'LightSeaGreen',
          
      }, options);
      
      let init = function(board) {
          let container = $('<div class="game-container"></div>').css({'background-img':'https://graffitiwallpaper.com/pics/listings/178_wide_thumb.jpg'});
          let table = $('<table class="table-puissance4" id="grille">');
          let title = $('<h1>').text('Puissance 4').css({'text-align': 'center', 'color': 'grey','font-family':'Orbitron, sans-serif','font-weight': 'bold'});
          let blockButtons = $('<p id="blockButtons">').css({'margin': '10px', 'display': 'flex','align-items': 'center'});
          let blockPlayer = $('<div id="blockPlayer">').css({'margin': '10px', 'display': 'flex','align-items': 'center'});
          let name1 = $('<p id="player1Name">').text(player1Name).css({'margin': '10px', 'display': 'flex','align-items':' center', 'font-family': 'Lucida Console, Monaco, monospace','font-weight': 'bold'});
          let name2 = $('<p id="player2Name">').text(player2Name).css({'margin': '10px', 'display': 'flex','align-items': 'center', 'font-family': 'Lucida Console, Monaco, monospace','font-weight': 'bold'});
          let colorPlayer1 = $(`<input type="color" value="${settings.player1}" id="colorPlayer1" />`).data('current', settings.player1).css({'margin': '10px','width':'50px', 'height':'50px','padding':'10px','border-radius':'50px'});
          let colorPlayer2 = $(`<input type="color" value="${settings.player2}" id="colorWell" />`).data('current', settings.player2).css({'margin': '10px','width':'50px', 'height':'50px','padding':'10px','border-radius':'50px'});
          let vs = $('<img src="https://versus.com/img/favicon-196x196.png">').css({'width':'50px','height':'50px','margin': '10px','display': 'flex','align-items': 'center'});
          
          container.prepend(table);
          blockPlayer.prepend(name2);
          blockPlayer.prepend(colorPlayer2);
          blockPlayer.prepend(vs);
          blockPlayer.prepend(colorPlayer1);
          blockPlayer.prepend(name1);
          container.prepend(blockPlayer);
          container.prepend(blockButtons);

          container.prepend(title);
          container.css({'display': 'flex', 'flex-direction': 'column', 'align-items': 'center'});
          
          
          table.css({'width':'auto', 'heigth':'auto', 'border': settings.borders, 'background-color': settings.bg_color, 'margin':settings.margin});
          for(let y = 0; y < board.length; y++) {
              let row = board[y];
              let tr =  $('<tr>');
              table.append(tr);
              for(let x = 0; x < row.length; x++) {
                  let cell = $('<td>')
                  .attr('data-x', x)
                  .attr('data-y', y)
                  .css({'position': 'relative', 'border-radius':'50px','border':'3px solid LightSeaGreen','background-color':'white','margin' :'50px', 'width': '60px', 'height': '60px'}); 
                  let jeton = $('<div>')
                  .css({'position': 'absolute', 'border-radius':'50px','border':'3px solid LightSeaGreen','background-color':'white', 'top': '0', 'left':'0', 'width': '60px', 'height': '60px'});
                  cell.append(jeton)
                  tr.append(cell);
              }
          }
          
          table.find('td').click(function(){
              cellClicked(this);
          });
          $('body').css({'background-image':'url(https://images4.alphacoders.com/681/681135.jpg)', 'width':'auto', ' background-repeat':'no-repeat'});
          $('body').html(container);
      }
      
      let cellClicked = function(selectedCell) {
          if(finish){
              return;
          }
          
          gameStarted = true;
          
          let coord = $(selectedCell).data();
          let positionX = coord.x;
          let positionY = null;
          for (let index = game.length - 1; index >= 0; index--) {
              const element = game[index][positionX];
              if(element === 0) {
                  positionY = index;
                  break;
              }
          }
          
          if(positionY !== null) {
              game[positionY][positionX] = player;
              let cell = $(`td[data-x="${positionX}"][data-y="${positionY}"] > div`);
              if(player === 1) {
                  cell.css({'background-color':settings.player1})
                  .css({top:-60*positionY-60 + 'px'})
                  .animate({"top":"0px"}, "slow");
                  player = 2;
              }
              else if(player === 2) {
                  cell.css({'background-color':settings.player2})
                  .css({top:-60*positionY-60 + 'px'})
                  .animate({"top":"0px"}, "slow");;
                  player = 1;
              }
              
              finish = hasWon(game, positionX, positionY);
              if(finish) {
                  let winner = null;
                  if(game[positionY][positionX] === 1)
                  {
                      winner = player1Name;
                  }
                  if(game[positionY][positionX] === 2)
                  {
                      winner = player2Name;
                  }
                  if(confirm(`Player ${winner} a gagnÃ© ! Voulez vous rejouer ?`) === true){
                      $('body').myplugin(settings);
                  }
              }
          }
      }
      
      let hasWon = function(board ,x , y) {
          let p = board[y][x];
          let win = true;
          
          // horizontal avant
          if(x-3 < 0) {
              win = false;
          }
          else {
              for (let index = x - 1; index >= x-3; index--) {
                  if(board[y][index] !== p) {
                      win = false;
                  }
              }
          }
          
          // horizontal apres
          if(win === false && x+3 < board[y].length) {
              win = true;
              for (let index = x + 1; index <= x+3; index++) {
                  if(board[y][index] !== p) {
                      win = false;
                  }
              }
          }
          
          // vertical
          if(win === false && y+3 < board.length) {
              win = true;
              for (let index = y + 1; index <= y+3; index++) {
                  if(board[index][x] !== p) {
                      win = false;
                  }
              }
          }
          
          // diagonal haut droite
          if(win === false && y-3 >= 0 && x+3 < board[y].length) {
              win = true;
              for (let indexY = y-1, indexX = x+1; indexY >= y-3 && indexX <= x+3; indexY--, indexX++) {
                  if(board[indexY][indexX] !== p) {
                      win = false;
                  }
              }
          }
          
          // diagonal haut gauche
          if(win === false && y-3 >= 0 && x-3 >= 0) {
              win = true;
              for (let indexY = y-1, indexX = x-1; indexY >= y-3 && indexX >= x-3; indexY--, indexX--) {
                  if(board[indexY][indexX] !== p) {
                      win = false;
                  }
              }
          }
          // diagonal bas gauche
          if(win === false && y+3 < board.length && x-3 >= 0) {
              win = true;
              for (let indexY = y+1, indexX = x-1; indexY <= y+3 && indexX >= x-3; indexY++, indexX--) {
                  if(board[indexY][indexX] !== p) {
                      win = false;
                  }
              }
          }
          // diagonal bas droite
          if(win === false && y+3 < board.length && x+3 < board[y].length) {
              win = true;
              for (let indexY = y+1, indexX = x+1; indexY <= y+3 && indexX <= x+3; indexY++, indexX++) {
                  if(board[indexY][indexX] !== p) {
                      win = false;
                  }
              }
          }
          return win;
      }
      
    
      let player1Name = prompt("Player 1 what is your name?");
      let player2Name = prompt("And you Player 2?");
      
      let game = [];
      let player = 1;
      let finish = false;
      for (let row = 0; row < settings.sizeDefault[0]; row++) {
          let r = [];
          for (let col = 0; col < settings.sizeDefault[1]; col++) {
              r.push(0);
          }
          game.push(r);
      }
      
      init(game);
  };
})(jQuery);