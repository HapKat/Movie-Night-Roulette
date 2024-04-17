
 
 
 let one;
 let two;
 let three;
 let firstMovie;
 let secondMovie;
 let thirdMovie;
 let box = document.getElementById("box");
 let final_button = document.getElementById("start_final");
 let num = parseInt(document.getElementById("ps").textContent, 10);

 document.getElementById("start_random").onclick = function(){
    one = Math.floor(Math.random() * 3 * num) + 1;
    two = Math.floor(Math.random() * 3 * num) + 1;
    while (two == one){
        two = Math.floor(Math.random() * 3 * num) + 1;
    }
    three = Math.floor(Math.random() * 3 * num) + 1;
    while (three == one || three == two) {
        three = Math.floor(Math.random() * 3 * num) + 1;
    }

    // make box appear
    box.style.display = "block";

    firstMovie = document.getElementById("m" + one);
    secondMovie = document.getElementById("m" + two); 
    thirdMovie = document.getElementById("m" + three);


    document.getElementById("topThree1").innerHTML = one;
    document.getElementById("topThree1_name").innerHTML = firstMovie.value;

    document.getElementById("start_random").onclick = function(){

        document.getElementById("topThree2").innerHTML = two;
        document.getElementById("topThree2_name").innerHTML = secondMovie.value;

           document.getElementById("start_random").onclick = function(){
       
            document.getElementById("topThree3").innerHTML = three;
            document.getElementById("topThree3_name").innerHTML = thirdMovie.value;

            final_button.style.display = "block";

            document.getElementById("start_final").onclick = function(){

                winner_num = Math.floor(Math.random() * 3) + 1;
            
                if (winner_num == 1){
                    document.getElementById("winner").innerHTML = one;
                document.getElementById("winner_name").innerHTML = firstMovie.value;
                } if (winner_num == 2){
                    document.getElementById("winner").innerHTML = two;
                    document.getElementById("winner_name").innerHTML = secondMovie.value;
                } if (winner_num == 3){
                    document.getElementById("winner").innerHTML = three;
                    document.getElementById("winner_name").innerHTML = thirdMovie.value;

             }
        }
        }
        
      
       

 }
}





