const fps = 8
var riders = []
var i = 1;
tally = 0
race_finished = 0
var tenMinutes = 60 * 25;
sleeptimer = 1000/fps;
display = document.querySelector('#countdown');
const finish_line= document.querySelector("#black").getBoundingClientRect();

function assignHorseSpeed(horse){
    
    horse.speed = Math.floor(Math.random() * (15 - 5) ) + 5;
    horse.variability = Math.floor(Math.random() * 30);

}

function reloadwindow(){
    location.reload()
}

function celebration(){
    //console.log("WORKS")
    winner = document.querySelector("h1#winner")
    if (winning_horse == 1){
        winner.textContent = "The winner is: Spirited Love!";
    }else if (winning_horse == 2){
        winner.textContent = "The winner is: Life Long Journey!";
    }else if (winning_horse == 3){
        winner.textContent = "The winner is: Kinky Simoni!";
    }else if (winning_horse == 4){
        winner.textContent = "The winner is: Starshine Galaxy!";
    }else if (winning_horse == 5){
        winner.textContent = "The winner is: Ponny Cash!";
    }
    
    winner.style.visibility = "visible";
    console.log("reloading")
    setTimeout(() => reloadwindow(), 300000);
    
}


function checkFinish(x){
    var rider = x
    rider_pos = rider.dom.getBoundingClientRect();
    
    if (rider_pos.right > finish_line.right){
        if(rider.finished != 1){
            rider.finished = 1
            tally = tally + 1
            if(rider.finished == 1 && tally == 1){
                winning_horse = rider.dom.id
            }
        }

        
        return
    }
}

function Gallop(x){
    var rider = x
    var current_speed = Math.floor(((Math.abs(Math.random() * 50 - 25)) * rider.variability) / 15);
    


        if(rider.tilted == 0){
        deg = rider.tilted ? 0 : -11;
        rider.dom.style.webkitTransform = 'rotate('+deg+'deg)'; 
        rider.dom.style.mozTransform    = 'rotate('+deg+'deg)'; 
        rider.dom.style.msTransform     = 'rotate('+deg+'deg)'; 
        rider.dom.style.oTransform      = 'rotate('+deg+'deg)'; 
        rider.dom.style.transform       = 'rotate('+deg+'deg)'; 
        rider.tilted = 1
    }else{
        deg = rider.tilted ? 11 : 11;
        rider.dom.style.webkitTransform = 'rotate('+deg+'deg)'; 
        rider.dom.style.mozTransform    = 'rotate('+deg+'deg)'; 
        rider.dom.style.msTransform     = 'rotate('+deg+'deg)'; 
        rider.dom.style.oTransform      = 'rotate('+deg+'deg)'; 
        rider.dom.style.transform       = 'rotate('+deg+'deg)';
        rider.tilted = 0
    }

//    console.log(rider.variability)
    if(rider.finished != 1){
    rider.dom.style.left = rider.dom.getBoundingClientRect().left + ((rider.speed + current_speed)) * 0.5 + "px";
}




    
}

function doAFrame(){
   riders.forEach(function (jockey) {
        var x = jockey
        checkFinish(x)
    })

    if(tally == 5){
        race_finished = 1
    }


    riders.forEach(function (jockey) {
        var x = jockey
        
        if (x.finished != 1){
        Gallop(x)
        }
    })

    if(race_finished == 0){
    setTimeout(() => doAFrame(), 1000/fps)
    }else{
        console.log("race finihsed")
        celebration()
    }
}


function giveHorseBirth(){
    let horse = Object.create(self);
    horse.dom = document.querySelector(`#${CSS.escape(i) }`);
    i = i + 1;
    assignHorseSpeed(horse);
    horse.tilted = 0
    horse.finished = 0

    //console.log(horse)
     riders.push(horse);

}

function startTheRace(){
    doAFrame()
}


function raceStarts()
{
    i = 1
    horses = document.querySelectorAll('.horse');
    horses.forEach(giveHorseBirth);

}


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        //console.log(timer)
        if (--timer < 0) {
            //console.log(timer)
            timer = duration;
        }
    }, 1000);
    raceStarts()
    setTimeout(() => startTheRace(), 1500000)
}
// 1500000 är för 25 minuter, sen där uppe är det 5 min efter att racet är klart innan refresh





window.onload = startTimer(tenMinutes, display)