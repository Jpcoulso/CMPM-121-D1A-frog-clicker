/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
*/
import "./style.css";

// create count variable to track number of frogs
let count: number = 0; // ---------------------------CHANGE ME BACK TO 0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let growthRate = 0;
const POND_MODIFIER = 0.1;
const SWAMP_MODIFIER = 2;
const MARSH_MODIFIER = 50;
const COST_MULTIPLIER = 1.15;
let pondUnits = 0;
let swampUnits = 0;
let marshUnits = 0;
let pondCost = 10;
let swampCost = 100;
let marshCost = 1000;

// -------------CREATE COUNTER DISPLAY------------------
const counterDisplay = document.createElement("div");
document.body.appendChild(counterDisplay);
// create counterDisplay update function
counterDisplay.textContent = `${count.toFixed(2)} Frogs`;

//------------CREATE FROGS/SEC DISPLAY
const growthRateDisplay = document.createElement("div");
document.body.appendChild(growthRateDisplay);
growthRateDisplay.textContent = `${growthRate.toFixed(2)} Frogs/sec`;

//---------DISPLAY UPDATE FUNCTION----------
function updateCount(newCount: number) {
  if (newCount < 0) {
    count = 0;
  } else {
    count = newCount;
  }
  counterDisplay.textContent = `${count.toFixed(2)} Frogs`;
  growthRateDisplay.textContent = `${growthRate.toFixed(2)} Frogs/sec`;
  pondButton.textContent = `Buy Pond, cost: ${
    pondCost.toFixed(2)
  } Frogs, units: ${pondUnits}`;
  swampButton.textContent = `Buy swamp, cost: ${
    swampCost.toFixed(2)
  } Frogs, units: ${swampUnits}`;
  marshButton.textContent = `Buy marsh, cost: ${
    marshCost.toFixed(2)
  } Frogs, units: ${marshUnits}`;
  pondButton.disabled = count < 10;
  swampButton.disabled = count < 100;
  marshButton.disabled = count < 1000;
}

// -----------CREATE FROG BUTTON-----------------------
// Create the button element, add css style, append so it shows up
const frogButton = document.createElement("button");
frogButton.classList.add("frogClicker");
document.body.appendChild(frogButton);
// On click increase count by 1
frogButton.addEventListener("click", () => {
  updateCount(count += 1);
});

//-------AUTO INCREMENT COUNT FOR POND-----------------
function autoIncreasePond(): void {
  // build increment timer that uses requestAnimationFrame and uses delta time
  let lastTime = performance.now();
  // updates count based on timeDelta
  const update = (currentTime: number) => {
    // compute delta time
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    // add fractional amount to count
    updateCount(count += POND_MODIFIER * deltaTime);
    // schedule next frame
    requestAnimationFrame(update); // requestAnimationUpdate feeds currentTime to update function
  };
  // first call to requestAnimationFrame, subsequent calls made from within 'update' function
  requestAnimationFrame(update);
}

//-------AUTO INCREMENT COUNT FOR SWAMP-----------------
function autoIncreaseSwamp(): void {
  // build increment timer that uses requestAnimationFrame and uses delta time
  let lastTime = performance.now();
  // updates count based on timeDelta
  const update = (currentTime: number) => {
    // compute delta time
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    // add fractional amount to count
    updateCount(count += SWAMP_MODIFIER * deltaTime);
    // schedule next frame
    requestAnimationFrame(update); // requestAnimationUpdate feeds currentTime to update function
  };
  // first call to requestAnimationFrame, subsequent calls made from within 'update' function
  requestAnimationFrame(update);
}

//-------AUTO INCREMENT COUNT FOR MARSH-----------------
function autoIncreaseMarsh(): void {
  // build increment timer that uses requestAnimationFrame and uses delta time
  let lastTime = performance.now();
  // updates count based on timeDelta
  const update = (currentTime: number) => {
    // compute delta time
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    // add fractional amount to count
    updateCount(count += MARSH_MODIFIER * deltaTime);
    // schedule next frame
    requestAnimationFrame(update); // requestAnimationUpdate feeds currentTime to update function
  };
  // first call to requestAnimationFrame, subsequent calls made from within 'update' function
  requestAnimationFrame(update);
}

// ---------------BUY POND BUTTON--------------------------------
// create 'buy pond' button, its disabled until frogs = 10;
const pondButton = document.createElement("button");
pondButton.textContent = `Buy Pond, cost: 10 Frogs, units: ${pondUnits}`;
pondButton.disabled = true;
document.body.append(pondButton); // code for when button becomes clickable in "button click" listener

// when purchased begin to auto increment frog count
pondButton.addEventListener("click", () => {
  updateCount(count -= pondCost);
  autoIncreasePond();
  pondUnits++;
  pondCost = pondCost * COST_MULTIPLIER;
  // update growth rate
  growthRate = growthRate + POND_MODIFIER;
});

// ---------------BUY SWAMP BUTTON--------------------------------
// create 'buy swamp' button, its disabled until frogs = 100;
const swampButton = document.createElement("button");
swampButton.textContent = `Buy swamp, cost: 100 Frogs, units: ${swampUnits}`;
swampButton.disabled = true;
document.body.append(swampButton); // code for when button becomes clickable in "button click" listener

// when purchased begin to auto increment frog count
swampButton.addEventListener("click", () => {
  updateCount(count -= swampCost);
  autoIncreaseSwamp();
  swampUnits++;
  swampCost = swampCost * COST_MULTIPLIER;
  // update growth rate
  growthRate = growthRate + SWAMP_MODIFIER;
});

// ---------------BUY MARSH BUTTON--------------------------------
// create 'buy marsh' button, its disabled until frogs = 1000;
const marshButton = document.createElement("button");
marshButton.textContent = `Buy marsh, cost: 1000 Frogs, units: ${marshUnits}`;
marshButton.disabled = true;
document.body.append(marshButton); // code for when button becomes clickable in "button click" listener

// when purchased begin to auto increment frog count
marshButton.addEventListener("click", () => {
  updateCount(count -= marshCost);
  autoIncreaseMarsh();
  marshUnits++;
  marshCost = marshCost * COST_MULTIPLIER;
  // update growth rate
  growthRate = growthRate + MARSH_MODIFIER;

  // step 7 complete, just add The current growth rate (e.g. “1.2 cookies/sec”) for step 6------------------------------START HERE-------------------------------
});
