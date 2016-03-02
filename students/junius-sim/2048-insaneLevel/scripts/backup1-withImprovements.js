$(function(){
  console.log("It's time to begin your training young padawan");
  var $grid = $('.grid');

  // Flow of events after New Game Button is clicked
  $('#newGame').on('click', function(){
    console.log("newGame Button is working");
    pressStart();
    pressKeys();


    // i want to generate two numbers, each number can be 2 or 4
    // Place this number randomly on any of the available grid spots

    // $('.grid').text("").css('background','white');
    // $('#message').text("Click on board to start!");
  });

  // Step 1: Pressing New Game Button And Generating two random numbers on two random grids
  function pressStart() {
    console.log("pressStart function is working");
    clearBoard();
    var gRandomGrid1 = getGrid();
    var gRandomGrid2 = getGrid();
    // this ensures that both starting numbers are not generated on the same grid
    while (gRandomGrid2 === gRandomGrid1 ) {
      gRandomGrid2 = getGrid();
    }
    $grid.eq( gRandomGrid1 ).text( getNumber() );
    $grid.eq( gRandomGrid2 ).text( getNumber() );
    changeColor();
  }

      // Clearing board function
      function clearBoard() {
        console.log("clear log is working");
        $grid.text("");
        changeColor();
      }

      // Generate two random numbers
      function getNumber() {
        console.log("getNumber is working");
        if (Math.random() < 0.8) {
          variable = 2;
        } else (
          variable = 4;
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

      // What does return do in this function? Does it return to switch or function getGrid1
      // Generate random grids on available grid spots (Get Grid 1)
      function getGrid() {
        console.log("getGrid is working");
        // 16 possible grids - start from 0 to 15
        switch ( Math.floor(Math.random()*8) ) {
          case 0:
            return 0;
          case 1:
            return 1;
          case 2:
            return 2;
          case 3:
            return 3;
          case 4:
            return 4;
          case 5:
            return 5;
          case 6:
            return 6;
          case 7:
            return 7;
          case 8:
            return 8;
        }
      }

  // Step 2: Pressing Keys (Up, Down, Left, Right)
  function pressKeys() {
    $(document).keydown(  function(event) {
      if ( event.which === 38 ) {
        console.log("Up key was pressed");
        for (var i = 6; i <= 8; i++) {
          if ( $grid.eq(i).text() === "" ) {
            if ( $grid.eq(i-3).text() === "" ) {
              if ( $grid.eq(i-6).text() === "" ) {
                // grid 0 is empty
                $grid.eq(i-6).text("");
                changeColor();
              }

              // if grid 0 is not empty
              else {
              $grid.eq(i-6).text($('.grid').eq(i-6).text());
                changeColor();
              }

            // if grid 3 is not empty
            } else {
                // grid 0 is empty
                if ( $grid.eq(i-6).text() === "" ) {
                  $grid.eq(i-6).text($grid.eq(i-3).text());
                  $grid.eq(i-3).text("");
                  changeColor();
                }
                // grid 0 is same as grid 3
                else if ($grid.eq(i-6).text() === $grid.eq(i-3).text()) {
                  var sameNumber = parseInt($grid.eq(i-6).text());
                  var doubleNumber = sameNumber * 2;
                  $grid.eq(i-6).text(doubleNumber);
                  $grid.eq(i-3).text("");
                  changeColor();
                }
                // grid 0 is different from grid 3
                else {
                  $grid.eq(i-6).text( $grid.eq(i-6).text() );
                  $grid.eq(i-3).text( $grid.eq(i-3).text() );
                  changeColor();
                  // nothing happens
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
                changeColor();
              }
              // grid 0 is not empty (2 situations)
              // 1B. grid 0 = grid 3 (Equal)
              else if (  $grid.eq(i-6).text() === $grid.eq(i-3).text() ) {
                var sameNumber = parseInt($grid.eq(i-6).text());
                var doubleNumber = sameNumber * 2;
                $grid.eq(i-6).text(doubleNumber);
                $grid.eq(i-3).text("");
                changeColor();
              }
              // 1C. grid 0 != grid 3 (Not Equal)
              // nothing happens
            }
            // 2. grid 3 is not empty
            // 2A. grid6 = grid3 (Next Box Equal)
            else if ( $grid.eq(i-3).text() === $grid.eq(i).text() ) {
              // 2A1. & grid0 = grid3 (Next Next Box Equal)
              if ( $grid.eq(i-6).text() === $grid.eq(i-3).text() ) {
                var sameNumber = parseInt($grid.eq(i-6).text());
                var doubleNumber = sameNumber * 2;
                $grid.eq(i-6).text(doubleNumber);
                $grid.eq(i-3).text($grid.eq(6).text());
                $grid.eq(i).text("");
                changeColor();
                // do i need to care about the order of the change for the animation
              }
              // 2A2. & grid0 != grid4 (Next Next Box Not Equal) -> does it take into account an empty box (hell no, use console to test)
              else if ( $grid.eq(i-6).text() !== $grid.eq(i-3).text() ) {
                //2A2A. grid0 is not an empty string (real value not equal)
                if ( $grid.eq(i-6).text() !== "" ) {
                  var sameNumber = parseInt($('.grid').eq(i-3).text());
                  var doubleNumber = sameNumber * 2;
                  $grid.eq(i-3).text(doubleNumber);
                  $grid.eq(i).text("");
                  changeColor();
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
                  changeColor();
                }
              }
            }
            // 2B. grid6 != grid3 (Next Box Not Equal)
            else {
              // 2B1. grid0 != grid3 (Next Next Box Not Equal)
              if ( $grid.eq(i-6).text() !== $grid.eq(i-3).text() ) {
                //2B1A. grid0 is not an empty string
                if ($grid.eq(i-6).text() !== "" ) {
                  $grid.eq(i-6).text( $grid.eq(i-6).text() );
                  $grid.eq(i-3).text( $grid.eq(i-3).text() );
                  $grid.eq(i).text( $grid.eq(i).text() );
                  changeColor();
                  // nothing happens
                }
                // 2B1B. grid0 is an empty string
                else {
                  $grid.eq(i-6).text( $grid.eq(i-3).text() );
                  $grid.eq(i-3).text( $grid.eq(i).text() );
                  $grid.eq(i).text("");
                  changeColor();
                }
              }
              // 2B2. grid0 = grid3 (Next Next Box Equal) (Not going to write the full else if)
              else {
                var sameNumber = parseInt($grid.eq(i-6).text());
                var doubleNumber = sameNumber * 2;
                $grid.eq(i-6).text(doubleNumber);
                $grid.eq(i-3).text($grid.eq(i).text());
                $grid.eq(i).text("");
                changeColor();
              }
            }
          }
        }
      }
      else if ( event.which === 40 ) {
        console.log("Down key was pressed");
      }
      else if ( event.which === 37 ) {
        console.log("left key was pressed");
      }
      else if ( event.which === 39 ) {
        console.log("Right key was pressed");
      }
    });
  }
  // Left: 37
  // Up: 38
  // Right: 39
  // Down: 40
  // Up!
  // for (var i = 0; i <= 2; i++) {
  //   for (var j = i; j <= (i + 6  ); j += 3) {
  //     if ($grid.eq(j).text() === '') {
  //       // then move
  //     }
  //   }
  // }

  // Changing Cell Color Based on Cell's Number:
  function changeColor() {
    console.log("changeColor is working");
    // 9 possible grids - start from 0 to 8
    for (var i=0; i<$('.grid').length; i++) {
      if ( $('.grid').eq(i).text() === "" ) {
        $('.grid').eq(i).removeClass("number2 number4").addClass("numberNil");
      }
      else if ( $('.grid').eq(i).text() === "2" ) {
          $('.grid').eq(i).removeClass("numberNil number4").addClass("number2");
      }
      else if ( $('.grid').eq(i).text() === "4" ) {
          $('.grid').eq(i).removeClass("numberNil number2").addClass("number4");
      }
      else if ( $('.grid').eq(i).text() === "8" ) {
          $('.grid').eq(i).removeClass("numberNil number2 number4").addClass("number8");
      }
    }
  }



});
