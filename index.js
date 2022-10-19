// Step 1: Query the IDs from the HTML

const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

// Step 2: Declare Variables

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

// Step 3: add an Event Listener to the buttons to perform an action onclick
startBtn.addEventListener("click", () => {
  if(paused){
    paused = false;
    startTime = Date.now() - elapsedTime;
    // callback the "updateTime" function - to listen when the start button is clicked
    intervalId = setInterval(updateTime, 1000);
  }
});
pauseBtn.addEventListener("click", () => {
  if(!paused){
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
  }
});
resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  timeDisplay.textContent = "00:00:00"
});

// Step 4: Create a function to update the Time
function updateTime(){
  elapsedTime = Date.now() - startTime;
  // convert the elapsedTime from ms to standard time s,m,h
  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

  // pass in secs, mins, hrs after creating the "pad" function below
  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);

  // To display the time
  timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

  function pad(unit){
    return(("0") + unit).length > 2? unit : "0" + unit;
  }
}