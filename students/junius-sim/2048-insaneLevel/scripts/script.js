// Defining Global Variables
var $grid = $('.grid');
var game = new Game();
var allowMove = [];

// Event Listeners
// Pressing Keys (Up, Down, Left, Right)
function pressKeys() {
  $(document).keydown( function(event) {
    if ( event.which === 38 ) {
      game.slideUp();
      game.generateNew();
      game.gameOver();
      game.youWon();
    }
    else if ( event.which === 40 ) {
      game.slideDown();
      game.generateNew();
      game.gameOver();
      game.youWon();
    }
    else if ( event.which === 37 ) {
      // console.log("left key was pressed");
      game.slideLeft();
      game.generateNew();
      game.gameOver();
      game.youWon();
    }
    else if ( event.which === 39 ) {
      game.slideRight();
      game.generateNew();
      game.gameOver();
      game.youWon();
    }
  });
}
pressKeys();

// Game Object Prototype
function Game() {
  // Clearing board function
  this.clearBoard = function () {
    $grid.text("");
    this.changeColor();
    this.removeMessage();
  }
  // Generate two random numbers on two random grids
  this.startGame = function () {
    var lRandomGrid1 = this.getGrid();
    var lRandomGrid2 = this.getGrid();
    // this ensures that both starting numbers are not generated on the same grid
    while (lRandomGrid2 === lRandomGrid1 ) {
      lRandomGrid2 = this.getGrid();
    }
    $grid.eq( lRandomGrid1 ).text( this.getNumber() );
    $grid.eq( lRandomGrid2 ).text( this.getNumber() );
    this.changeColor();
  }
  // Generate two random numbers
  this.getNumber = function() {
    if (Math.random() < 0.8) {
      variable = 2
    } else (
      variable = 4
    )
    return variable;
  }
  // Shortcut to above - Error Leh?
  // function getNumber() {
  //   if (Math.random() < 0.5) {
  //     return 2
  //   } else (
  //     return 4
  //   )
  // }

  // Generate random grids on starting grid spots (Get Grid)
  // What does return do in this function? Does it return to switch or function getGrid1
  this.getGrid = function() {
    // 16 possible grids - start from 0 to 15
    // can i use a loop?
    switch ( Math.floor(Math.random()*9) ) {
      case 0:
      // not working
        if ($grid.eq(0).text() === "") {
          return 0;
        }
        else {
          return null;
        }
      case 1:
        if ($grid.eq(1).text() === "") {
          return 1;
        }
        else {
          return null;
        }
      case 2:
        if ($grid.eq(2).text() === "") {
          return 2;
        }
        else {
          return null;
        }
      case 3:
        if ($grid.eq(3).text() === "") {
          return 3;
        }
        else {
          return null;
        }
      case 4:
        if ($grid.eq(4).text() === "") {
          return 4;
        }
        else {
          return null;
        }
      case 5:
        if ($grid.eq(5).text() === "") {
          return 5;
        }
        else {
          return null;
        }
      case 6:
        if ($grid.eq(6).text() === "") {
          return 6;
        }
        else {
          return null;
        }
      case 7:
        if ($grid.eq(7).text() === "") {
          return 7;
        }
        else {
          return null;
        }
      case 8:
        if ($grid.eq(8).text() === "") {
          return 8;
        }
        else {
          return null;
        }
      }
  }

  this.generateNew = function() {
    // var lRandomGrid = getGrid();
    // while (lRandomGrid === null) {
    //   lRandomGrid = getGrid();
    // }
    // do while loop is a better alternative
    if ( allowMove[0] || allowMove[1] || allowMove[2] ) {
      do {
        var lRandomGrid = this.getGrid();
      }
      while(lRandomGrid === null);
      $grid.eq( lRandomGrid ).text( this.getNumber() );
      this.changeColor();
      this.slideSound();
    }
  }

  this.gameOver = function() {
    if ($grid.eq(0).text() !== "" && $grid.eq(1).text() !== "" && $grid.eq(2).text() !== "" && $grid.eq(3).text() !== "" && $grid.eq(4).text() !== "" && $grid.eq(5).text() !== "" && $grid.eq(6).text() !=="" && $grid.eq(7).text() !== "" && $grid.eq(8).text() !== "" ) {
      this.slideUp();
        if (!allowMove[0] && !allowMove[1] && !allowMove[2]) {
          this.slideDown();
            if (!allowMove[0] && !allowMove[1] && !allowMove[2]) {
              this.slideRight();
                if (!allowMove[0] && !allowMove[1] && !allowMove[2]) {
                  this.slideLeft();
                    if (!allowMove[0] && !allowMove[1] && !allowMove[2]) {
                      this.gameOverMessage();
                    }
                }
            }
        }
    }
  }

  this.gameOverMessage = function() {
    $('#message').text("Game Over").addClass("messageEnd");
    this.gameOverSound();
  }

  this.removeMessage = function() {
    $('#message').removeClass("messageEnd");
  }

  this.youWon = function() {
    for (var i=0; i <= 8; i++) {
      if ( $grid.eq(i).text() === "128" ) {
        $('#message').text("Congrats! We secretly made it easier").addClass("messageEnd");
      }
    }
  }

  this.slideSound = function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'slide.mp3');
    audioElement.setAttribute('autoplay', 'autoplay');
    audioELement.play();
  }

  this.gameOverSound = function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'gameover.wav');
    audioElement.setAttribute('autoplay', 'autoplay');
    audioELement.play();
  }

  // Sliding Up
  this.slideUp = function() {
    allowMove = [true,true,true];
    for (var i = 6 ; i <= 8; i++) {
      if ( $grid.eq(i).text() === "" ) {
        if ( $grid.eq(i-3).text() === "" ) {
          if ( $grid.eq(i-6).text() === "" ) {
            // grid 0 is empty
            // Turns allowMove index 0,1,2 false | eg. 0 refers to row 6
            // does nothing
            allowMove[i-6] = false;
            this.changeColor();
          }
          // if grid 0 is not empty
          else {
          // $grid.eq(i-6).text($('.grid').eq(i-6).text());
          //   changeColor();
          //   // Does nothing, it remains as it is
            allowMove[i-6] = false;
            this.changeColor();
          }

        // if grid 3 is not empty
        } else {
            // grid 0 is empty
            if ( $grid.eq(i-6).text() === "" ) {
              $grid.eq(i-6).text($grid.eq(i-3).text());
              $grid.eq(i-3).text("");
              this.changeColor();
            }
            // grid 0 is not empty (2 scenarios)
            // grid 0 is same as grid 3
            else if ($grid.eq(i-6).text() === $grid.eq(i-3).text()) {
              var sameNumber = parseInt($grid.eq(i-6).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i-6).text(doubleNumber);
              $grid.eq(i-3).text("");
              this.changeColor();
            }
            // grid 0 is different from grid 3
            else {
            //   $grid.eq(i-6).text( $grid.eq(i-6).text() );
            //   $grid.eq(i-3).text( $grid.eq(i-3).text() );
            //   changeColor();
            //   // nothing happens
            allowMove[i-6] = false;
            this.changeColor();
            }
        }

      // if grid 6 is not empty
      } else {
        // 1. grid 3 is empty -> we move up
        if ( $grid.eq(i-3).text() === "" ) {
          $grid.eq(i-3).text($grid.eq(i).text()) ;
          $grid.eq(i).text("");
          // 1A. grid 0 is empty -> we move up
          if ( $grid.eq(i-6).text() === ""  ) {
            $grid.eq(i-6).text($('.grid').eq(i-3).text()) ;
            $grid.eq(i-3).text("");
            this.changeColor();
          }
          // grid 0 is not empty (2 situations)
          // 1B. grid 0 = grid 3 (Equal)
          else if (  $grid.eq(i-6).text() === $grid.eq(i-3).text() ) {
            var sameNumber = parseInt($grid.eq(i-6).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i-6).text(doubleNumber);
            $grid.eq(i-3).text("");
            this.changeColor();
          }
          // 1C. grid 0 != grid 3 (Not Equal)
          // nothing happens
          // else {
          // }
          //  Do not include allowMove[i-6] = false; because a move has already been made

        }
        // 2. grid 3 is not empty
        // 2A. grid6 = grid3 (Next Box Equal)
        else if ( $grid.eq(i-3).text() === $grid.eq(i).text() ) {
          // 2A1. & grid0 = grid3 (Next Next Box Equal)
          if ( $grid.eq(i-6).text() === $grid.eq(i-3).text() ) {
            var sameNumber = parseInt($grid.eq(i-6).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i-6).text(doubleNumber);
            $grid.eq(i-3).text($grid.eq(i).text());
            $grid.eq(i).text("");
            this.changeColor();
            // do i need to care about the order of the change for the animation
          }
          // 2A2. & grid0 != grid3 (Next Next Box Not Equal) -> does it take into account an empty box (hell no, use console to test)
          else if ( $grid.eq(i-6).text() !== $grid.eq(i-3).text() ) {
            //2A2A. grid0 is not an empty string (real value not equal)
            if ( $grid.eq(i-6).text() !== "" ) {
              var sameNumber = parseInt($('.grid').eq(i-3).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i-3).text(doubleNumber);
              $grid.eq(i).text("");
              this.changeColor();
            }
            //2A2B grid0 is an empty string
            else {
              $grid.eq(i-6).text( $grid.eq(i-3).text() );
              $grid.eq(i-3).text( $grid.eq(i-3).text() );
              $grid.eq(i).text("");
              var sameNumber = parseInt($('.grid').eq(i-6).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i-6).text(doubleNumber);
              $grid.eq(i-3).text("");
              this.changeColor();
            }
          }
        }
        // 2B. grid6 != grid3 (Next Box Not Equal)
        else {
          // 2B1. grid0 != grid3 (Next Next Box Not Equal)
          if ( $grid.eq(i-6).text() !== $grid.eq(i-3).text() ) {
            //2B1A. grid0 is not an empty string
            if ($grid.eq(i-6).text() !== "" ) {
              // $grid.eq(i-6).text( $grid.eq(i-6).text() );
              // $grid.eq(i-3).text( $grid.eq(i-3).text() );
              // $grid.eq(i).text( $grid.eq(i).text() );
              // changeColor();
              // nothing happens
              allowMove[i-6] = false;
              this.changeColor();
            }
            // 2B1B. grid0 is an empty string
            else if ($grid.eq(i-6).text() === "" ){
              $grid.eq(i-6).text( $grid.eq(i-3).text() );
              $grid.eq(i-3).text( $grid.eq(i).text() );
              $grid.eq(i).text("");
              this.changeColor();
            }
          }
          // 2B2. grid0 = grid3 (Next Next Box Equal) (Not going to write the full else if)
          else {
            var sameNumber = parseInt($grid.eq(i-6).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i-6).text(doubleNumber);
            $grid.eq(i-3).text($grid.eq(i).text());
            $grid.eq(i).text("");
            this.changeColor();
          }
        }
      }
    }
  }

  // Sliding Down
  this.slideDown = function() {
    allowMove = [true,true,true];
    for (var i = 0 ; i <= 2; i++) {
      if ( $grid.eq(i).text() === "" ) {
        if ( $grid.eq(i+3).text() === "" ) {
          if ( $grid.eq(i+6).text() === "" ) {
            // grid 6 is empty
            // Turns allowMove index 0,1,2 false | eg. 0 refers to row 6
            // does nothing
            allowMove[i] = false;
            this.changeColor();
          }
          // if grid 6 is not empty
          else {
          // $grid.eq(i-6).text($('.grid').eq(i-6).text());
          //   changeColor();
          //   // Does nothing, it remains as it is
            allowMove[i] = false;
            this.changeColor();
          }

        // if grid 3 is not empty
        } else {
            // grid 0 is empty
            if ( $grid.eq(i+6).text() === "" ) {
              $grid.eq(i+6).text($grid.eq(i+3).text());
              $grid.eq(i+3).text("");
              this.changeColor();
            }
            // grid 0 is not empty (2 scenarios)
            // grid 0 is same as grid 3
            else if ($grid.eq(i+6).text() === $grid.eq(i+3).text()) {
              var sameNumber = parseInt($grid.eq(i+6).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i+6).text(doubleNumber);
              $grid.eq(i+3).text("");
              this.changeColor();
            }
            // grid 0 is different from grid 3
            else {
            //   $grid.eq(i-6).text( $grid.eq(i-6).text() );
            //   $grid.eq(i-3).text( $grid.eq(i-3).text() );
            //   changeColor();
            //   // nothing happens
            allowMove[i] = false;
            this.changeColor();
            }
        }

      // if grid 6 is not empty
      } else {
        // 1. grid 3 is empty -> we move up
        if ( $grid.eq(i+3).text() === "" ) {
          $grid.eq(i+3).text($grid.eq(i).text()) ;
          $grid.eq(i).text("");
          // 1A. grid 0 is empty -> we move up
          if ( $grid.eq(i+6).text() === ""  ) {
            $grid.eq(i+6).text($('.grid').eq(i+3).text()) ;
            $grid.eq(i+3).text("");
            this.changeColor();
          }
          // grid 0 is not empty (2 situations)
          // 1B. grid 0 = grid 3 (Equal)
          else if (  $grid.eq(i+6).text() === $grid.eq(i+3).text() ) {
            var sameNumber = parseInt($grid.eq(i+6).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i+6).text(doubleNumber);
            $grid.eq(i+3).text("");
            this.changeColor();
          }
          // 1C. grid 0 != grid 3 (Not Equal)
          // nothing happens
          // else {
          //   this.changeColor();
          // }
          //   No allowMove[i] = false; because a move has already been made
        }
        // 2. grid 3 is not empty
        // 2A. grid6 = grid3 (Next Box Equal)
        else if ( $grid.eq(i+3).text() === $grid.eq(i).text() ) {
          // 2A1. & grid0 = grid3 (Next Next Box Equal)
          if ( $grid.eq(i+6).text() === $grid.eq(i+3).text() ) {
            var sameNumber = parseInt($grid.eq(i+6).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i+6).text(doubleNumber);
            $grid.eq(i+3).text($grid.eq(i).text());
            $grid.eq(i).text("");
            this.changeColor();
            // do i need to care about the order of the change for the animation
          }
          // 2A2. & grid0 != grid3 (Next Next Box Not Equal) -> does it take into account an empty box (hell no, use console to test)
          else if ( $grid.eq(i+6).text() !== $grid.eq(i+3).text() ) {
            //2A2A. grid0 is not an empty string (real value not equal)
            if ( $grid.eq(i+6).text() !== "" ) {
              var sameNumber = parseInt($('.grid').eq(i+3).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i+3).text(doubleNumber);
              $grid.eq(i).text("");
              this.changeColor();
            }
            //2A2B grid0 is an empty string
            else {
              $grid.eq(i+6).text( $grid.eq(i+3).text() );
              $grid.eq(i+3).text( $grid.eq(i+3).text() );
              $grid.eq(i).text("");
              var sameNumber = parseInt($('.grid').eq(i+6).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i+6).text(doubleNumber);
              $grid.eq(i+3).text("");
              this.changeColor();
            }
          }
        }
        // 2B. grid6 != grid3 (Next Box Not Equal)
        else {
          // 2B1. grid0 != grid3 (Next Next Box Not Equal)
          if ( $grid.eq(i+6).text() !== $grid.eq(i+3).text() ) {
            //2B1A. grid0 is not an empty string
            if ($grid.eq(i+6).text() !== "" ) {
              // $grid.eq(i-6).text( $grid.eq(i-6).text() );
              // $grid.eq(i-3).text( $grid.eq(i-3).text() );
              // $grid.eq(i).text( $grid.eq(i).text() );
              // changeColor();
              // nothing happens
              allowMove[i] = false;
              this.changeColor();
            }
            // 2B1B. grid0 is an empty string
            else if ($grid.eq(i+6).text() === "" ){
              $grid.eq(i+6).text( $grid.eq(i+3).text() );
              $grid.eq(i+3).text( $grid.eq(i).text() );
              $grid.eq(i).text("");
              this.changeColor();
            }
          }
          // 2B2. grid0 = grid3 (Next Next Box Equal) (Not going to write the full else if)
          else {
            var sameNumber = parseInt($grid.eq(i+6).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i+6).text(doubleNumber);
            $grid.eq(i+3).text($grid.eq(i).text());
            $grid.eq(i).text("");
            this.changeColor();
          }
        }
      }
    }
  }

  // Sliding Right
  this.slideRight = function() {
    allowMove = [true,true,true];
    for (var i = 0 ; i <= 6; i+=3) {
      if ( $grid.eq(i).text() === "" ) {
        if ( $grid.eq(i+1).text() === "" ) {
          if ( $grid.eq(i+2).text() === "" ) {
            // grid 2 is empty
            // Turns allowMove index 0,1,2 false | eg. 0 refers to row 6
            // does nothing
            allowMove[i/3] = false;
            this.changeColor();
          }
          // if grid 2 is not empty
          else {
          // $grid.eq(i-6).text($('.grid').eq(i-6).text());
          //   changeColor();
          //   // Does nothing, it remains as it is
            allowMove[i/3] = false;
            this.changeColor();
          }

        // if grid 1 is not empty
        } else {
            // grid 2 is empty
            if ( $grid.eq(i+2).text() === "" ) {
              $grid.eq(i+2).text($grid.eq(i+1).text());
              $grid.eq(i+1).text("");
              this.changeColor();
            }
            // grid 2 is not empty (2 scenarios)
            // grid 2 is same as grid 3
            else if ($grid.eq(i+2).text() === $grid.eq(i+1).text()) {
              var sameNumber = parseInt($grid.eq(i+2).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i+2).text(doubleNumber);
              $grid.eq(i+1).text("");
              this.changeColor();
            }
            // grid 2 is different from grid 3
            else {
            //   $grid.eq(i-6).text( $grid.eq(i-6).text() );
            //   $grid.eq(i-3).text( $grid.eq(i-3).text() );
            //   changeColor();
            //   // nothing happens
            allowMove[i/3] = false;
            this.changeColor();
            }
        }

      // if grid 0 is not empty
      } else {
        // 1. grid 1 is empty -> we move up
        if ( $grid.eq(i+1).text() === "" ) {
          $grid.eq(i+1).text($grid.eq(i).text()) ;
          $grid.eq(i).text("");
          // 1A. grid 3 is empty -> we move up
          if ( $grid.eq(i+2).text() === ""  ) {
            $grid.eq(i+2).text($('.grid').eq(i+1).text()) ;
            $grid.eq(i+1).text("");
            this.changeColor();
          }
          // grid 2 is not empty (2 situations)
          // 1B. grid 1 = grid 2 (Equal)
          else if (  $grid.eq(i+2).text() === $grid.eq(i+1).text() ) {
            var sameNumber = parseInt($grid.eq(i+2).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i+2).text(doubleNumber);
            $grid.eq(i+1).text("");
            this.changeColor();
          }
          // 1C. grid 1 != grid 2 (Not Equal)
          // nothing happens
          // else {
          //   this.changeColor();
          // }
          //  No allowMove[i/3] = false; because a move has already been made
        }
        // 2. grid 1 is not empty
        // 2A. grid0 = grid1 (Next Box Equal)
        else if ( $grid.eq(i+1).text() === $grid.eq(i).text() ) {
          // 2A1. & grid2 = grid1 (Next Next Box Equal)
          if ( $grid.eq(i+2).text() === $grid.eq(i+1).text() ) {
            var sameNumber = parseInt($grid.eq(i+2).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i+2).text(doubleNumber);
            $grid.eq(i+1).text($grid.eq(i).text());
            $grid.eq(i).text("");
            this.changeColor();
            // do i need to care about the order of the change for the animation
          }
          // 2A2. & grid2 != grid1 (Next Next Box Not Equal) -> does it take into account an empty box (hell no, use console to test)
          else if ( $grid.eq(i+2).text() !== $grid.eq(i+1).text() ) {
            //2A2A. grid2 is not an empty string (real value not equal)
            if ( $grid.eq(i+2).text() !== "" ) {
              var sameNumber = parseInt($('.grid').eq(i+1).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i+1).text(doubleNumber);
              $grid.eq(i).text("");
              this.changeColor();
            }
            //2A2B grid2 is an empty string
            else {
              $grid.eq(i+2).text( $grid.eq(i+1).text() );
              $grid.eq(i+1).text( $grid.eq(i+1).text() );
              $grid.eq(i).text("");
              var sameNumber = parseInt($('.grid').eq(i+2).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i+2).text(doubleNumber);
              $grid.eq(i+1).text("");
              this.changeColor();
            }
          }
        }
        // 2B. grid0 != grid1 (Next Box Not Equal)
        else {
          // 2B1. grid1 != grid2 (Next Next Box Not Equal)
          if ( $grid.eq(i+1).text() !== $grid.eq(i+2).text() ) {
            //2B1A. grid2 is not an empty string
            if ($grid.eq(i+2).text() !== "" ) {
              // $grid.eq(i-6).text( $grid.eq(i-6).text() );
              // $grid.eq(i-3).text( $grid.eq(i-3).text() );
              // $grid.eq(i).text( $grid.eq(i).text() );
              // changeColor();
              // nothing happens
              allowMove[i/3] = false;
              this.changeColor();
            }
            // 2B1B. grid2 is an empty string
            else if ($grid.eq(i+2).text() === "" ) {
              $grid.eq(i+2).text( $grid.eq(i+1).text() );
              $grid.eq(i+1).text( $grid.eq(i).text() );
              $grid.eq(i).text("");
              this.changeColor();
            }
          }
          // 2B2. grid1 = grid2 (Next Next Box Equal) (Not going to write the full else if)
          else {
            var sameNumber = parseInt($grid.eq(i+2).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i+2).text(doubleNumber);
            $grid.eq(i+1).text($grid.eq(i).text());
            $grid.eq(i).text("");
            this.changeColor();
          }
        }
      }
    }
  }

  // Sliding Left
  this.slideLeft = function() {
    allowMove = [true,true,true];
    for (var i = 2, j=0 ; i <= 8, j<=2; i+=3, j++) {
      if ( $grid.eq(i).text() === "" ) {
        if ( $grid.eq(i-1).text() === "" ) {
          if ( $grid.eq(i-2).text() === "" ) {
            // grid 0 is empty
            // Turns allowMove index 0,1,2 false | eg. 0 refers to row 6
            // does nothing
            allowMove[j] = false;
            this.changeColor();
          }
          // if grid 0 is not empty
          else {
          // $grid.eq(i-6).text($('.grid').eq(i-6).text());
          //   changeColor();
          //   // Does nothing, it remains as it is
            allowMove[j] = false;
            this.changeColor();
          }

        // if grid 3 is not empty
        } else {
            // grid 0 is empty
            if ( $grid.eq(i-2).text() === "" ) {
              $grid.eq(i-2).text($grid.eq(i-1).text());
              $grid.eq(i-1).text("");
              this.changeColor();
            }
            // grid 0 is not empty (2 scenarios)
            // grid 0 is same as grid 3
            else if ($grid.eq(i-2).text() === $grid.eq(i-1).text()) {
              var sameNumber = parseInt($grid.eq(i-2).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i-2).text(doubleNumber);
              $grid.eq(i-1).text("");
              this.changeColor();
            }
            // grid 0 is different from grid 3
            else {
            //   $grid.eq(i-6).text( $grid.eq(i-6).text() );
            //   $grid.eq(i-3).text( $grid.eq(i-3).text() );
            //   changeColor();
            //   // nothing happens
            allowMove[j] = false;
            this.changeColor();
            }
        }

      // if grid 6 is not empty
      } else {
        // 1. grid 3 is empty -> we move up
        if ( $grid.eq(i-1).text() === "" ) {
          $grid.eq(i-1).text($grid.eq(i).text()) ;
          $grid.eq(i).text("");
          // 1A. grid 0 is empty -> we move up
          if ( $grid.eq(i-2).text() === ""  ) {
            $grid.eq(i-2).text($('.grid').eq(i-1).text()) ;
            $grid.eq(i-1).text("");
            this.changeColor();
          }
          // grid 0 is not empty (2 situations)
          // 1B. grid 0 = grid 3 (Equal)
          else if (  $grid.eq(i-2).text() === $grid.eq(i-1).text() ) {
            var sameNumber = parseInt($grid.eq(i-2).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i-2).text(doubleNumber);
            $grid.eq(i-1).text("");
            this.changeColor();
          }
          // 1C. grid 0 != grid 3 (Not Equal)
          // nothing happens
          // else {
          //   this.changeColor();
          // }
          //   No allowMove[j] = false; because a move has already been made
        }
        // 2. grid 3 is not empty
        // 2A. grid6 = grid3 (Next Box Equal)
        else if ( $grid.eq(i-1).text() === $grid.eq(i).text() ) {
          // 2A1. & grid0 = grid3 (Next Next Box Equal)
          if ( $grid.eq(i-2).text() === $grid.eq(i-1).text() ) {
            var sameNumber = parseInt($grid.eq(i-2).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i-2).text(doubleNumber);
            $grid.eq(i-1).text($grid.eq(i).text());
            $grid.eq(i).text("");
            this.changeColor();
            // do i need to care about the order of the change for the animation
          }
          // 2A2. & grid0 != grid3 (Next Next Box Not Equal) -> does it take into account an empty box (hell no, use console to test)
          else if ( $grid.eq(i-2).text() !== $grid.eq(i-1).text() ) {
            //2A2A. grid0 is not an empty string (real value not equal)
            if ( $grid.eq(i-2).text() !== "" ) {
              var sameNumber = parseInt($('.grid').eq(i-1).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i-1).text(doubleNumber);
              $grid.eq(i).text("");
              this.changeColor();
            }
            //2A2B grid0 is an empty string
            else if ( $grid.eq(i-2).text() === "" ) {
              $grid.eq(i-2).text( $grid.eq(i-1).text() );
              $grid.eq(i-1).text( $grid.eq(i-1).text() );
              $grid.eq(i).text("");
              var sameNumber = parseInt($('.grid').eq(i-2).text());
              var doubleNumber = sameNumber * 2;
              $grid.eq(i-2).text(doubleNumber);
              $grid.eq(i-1).text("");
              this.changeColor();
            }
          }
        }
        // 2B. grid6 != grid3 (Next Box Not Equal)
        else {
          // 2B1. grid0 != grid3 (Next Next Box Not Equal)
          if ( $grid.eq(i-2).text() !== $grid.eq(i-1).text() ) {
            //2B1A. grid0 is not an empty string
            if ($grid.eq(i-2).text() !== "" ) {
              // $grid.eq(i-6).text( $grid.eq(i-6).text() );
              // $grid.eq(i-3).text( $grid.eq(i-3).text() );
              // $grid.eq(i).text( $grid.eq(i).text() );
              // changeColor();
              // nothing happens
              allowMove[j] = false;
              this.changeColor();
            }
            // 2B1B. grid0 is an empty string
            else if ($grid.eq(i-2).text() === "" ) {
              $grid.eq(i-2).text( $grid.eq(i-1).text() );
              $grid.eq(i-1).text( $grid.eq(i).text() );
              $grid.eq(i).text("");
              this.changeColor();
            }
          }
          // 2B2. grid0 = grid3 (Next Next Box Equal) (Not going to write the full else if)
          else {
            var sameNumber = parseInt($grid.eq(i-2).text());
            var doubleNumber = sameNumber * 2;
            $grid.eq(i-2).text(doubleNumber);
            $grid.eq(i-1).text($grid.eq(i).text());
            $grid.eq(i).text("");
            this.changeColor();
          }
        }
      }
    }
  }

  // Changing Cell Color Based on Cell's Number:
  this.changeColor = function() {
    // 9 possible grids - start from 0 to 8
    for (var i=0; i<$grid.length; i++) {
      if ( $grid.eq(i).text() === "" ) {
        $grid.eq(i).removeClass("number2 number4 number8 number16 number32 number64").addClass("numberNil");
      }
      else if ( $grid.eq(i).text() === "2" ) {
          $grid.eq(i).removeClass("numberNil number4 number8 number16 number32 number64").addClass("number2");
      }
      else if ( $grid.eq(i).text() === "4" ) {
          $grid.eq(i).removeClass("numberNil number2 number8 number16 number32 number64 number128").addClass("number4");
      }
      else if ( $grid.eq(i).text() === "8" ) {
          $grid.eq(i).removeClass("numberNil number2 number4 number16 number32 number64 number128").addClass("number8");
      }
      else if ( $grid.eq(i).text() === "16" ) {
          $grid.eq(i).removeClass("numberNil number2 number4 number8 number32 number64 number128").addClass("number16");
      }
      else if ( $grid.eq(i).text() === "32" ) {
          $grid.eq(i).removeClass("numberNil number2 number4 number8 number16 number64 number128").addClass("number32");
      }
      else if ( $grid.eq(i).text() === "64" ) {
          $grid.eq(i).removeClass("numberNil number2 number4 number8 number16 number32 number128").addClass("number64");
      }
      else if ( $grid.eq(i).text() === "128" ) {
          $grid.eq(i).removeClass("numberNil number2 number4 number8 number16 number32 number64").addClass("number128");
      }
    }
  }

// End of Object Prototype
}

// Start Game
$('#newGame').on('click', function(){
  game.clearBoard();
  game.startGame();
});
