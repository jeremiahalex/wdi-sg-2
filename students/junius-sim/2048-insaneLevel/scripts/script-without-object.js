var $grid = $('.grid');
var allowMove;

// Step 1: Pressing New Game Button And Generating two random numbers on two random grids
function pressStart() {
  clearBoard();
  var lRandomGrid1 = getGrid();
  var lRandomGrid2 = getGrid();
  // this ensures that both starting numbers are not generated on the same grid
  while (lRandomGrid2 === lRandomGrid1 ) {
    lRandomGrid2 = getGrid();
  }
  $grid.eq( lRandomGrid1 ).text( getNumber() );
  $grid.eq( lRandomGrid2 ).text( getNumber() );
  changeColor();
}

    // Clearing board function
    function clearBoard() {
      $grid.text("");
      changeColor();
    }

    // Generate two random numbers
    function getNumber() {
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

    // What does return do in this function? Does it return to switch or function getGrid1
    // Generate random grids on starting grid spots (Get Grid)
    function getGrid() {
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

// Step 2: Pressing Keys (Up, Down, Left, Right)
function pressKeys() {
  $(document).keydown( function(event) {
    if ( event.which === 38 ) {
      // put it here so that both SlideUp function and "generate new random grid" can access the variables
      slideUp();
      // is it wrong to put the () here ... ?

      // some problems here
      // var lRandomGrid = getGrid();
      // while (lRandomGrid === null) {
      //   lRandomGrid = getGrid();
      // }
      // do while loop is a better alternative
      if (allowMove[0] || allowMove[1] || allowMove[2]) {
        do {
          lRandomGrid = getGrid();
        }
        while(lRandomGrid === null);

        $grid.eq( lRandomGrid ).text( getNumber() );
        changeColor();
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
// need to set conditions for sliding up -> you must be able to slide up in order to slide up
// if (not equal to 3 scenarios -> A(eg. grid0 != "" && grid3 != "" && grid6 != "") | B | C)
// Sliding Up
function slideUp() {
  allowMove = [true,true,true];
  for (var i = 6 ; i <= 8; i++) {
    if ( $grid.eq(i).text() === "" ) {
      if ( $grid.eq(i-3).text() === "" ) {
        if ( $grid.eq(i-6).text() === "" ) {
          // grid 0 is empty
          // Turns allowMove index 0,1,2 false | eg. 0 refers to row 6
          // does nothing
          allowMove[i-6] = false;
          changeColor();
        }
        // if grid 0 is not empty
        else {
        // $grid.eq(i-6).text($('.grid').eq(i-6).text());
        //   changeColor();
        //   // Does nothing, it remains as it is
          allowMove[i-6] = false;
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
          // grid 0 is not empty (2 scenarios)
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
          //   $grid.eq(i-6).text( $grid.eq(i-6).text() );
          //   $grid.eq(i-3).text( $grid.eq(i-3).text() );
          //   changeColor();
          //   // nothing happens
          allowMove[i-6] = false;
          changeColor();
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
        else {
          allowMove[i-6] = false;
          changeColor();
        }
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
        // 2A2. & grid0 != grid3 (Next Next Box Not Equal) -> does it take into account an empty box (hell no, use console to test)
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
            // $grid.eq(i-6).text( $grid.eq(i-6).text() );
            // $grid.eq(i-3).text( $grid.eq(i-3).text() );
            // $grid.eq(i).text( $grid.eq(i).text() );
            // changeColor();
            // nothing happens
            allowMove[i-6] = false;
            changeColor();
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
  // 9 possible grids - start from 0 to 8
  for (var i=0; i<$('.grid').length; i++) {
    if ( $('.grid').eq(i).text() === "" ) {
      $('.grid').eq(i).removeClass("number2 number4 number8").addClass("numberNil");
    }
    else if ( $('.grid').eq(i).text() === "2" ) {
        $('.grid').eq(i).removeClass("numberNil number4 number8").addClass("number2");
    }
    else if ( $('.grid').eq(i).text() === "4" ) {
        $('.grid').eq(i).removeClass("numberNil number2 number8").addClass("number4");
    }
    else if ( $('.grid').eq(i).text() === "8" ) {
        $('.grid').eq(i).removeClass("numberNil number2 number4").addClass("number8");
    }
  }
}


// Flow of events after New Game Button is clicked
$('#newGame').on('click', function(){
  var $grid = $('.grid');
  pressStart();
  pressKeys();
});
