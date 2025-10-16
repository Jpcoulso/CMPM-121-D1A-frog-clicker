/*
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
*/
import "./style.css";

// create count variable to track number of frogs
let count: number = 0;


// -------------CREATE COUNTER DISPLAY------------------
const counterDisplay = document.createElement("div");
document.body.appendChild(counterDisplay);
// create counterDisplay update function
counterDisplay.textContent = `${count.toFixed(2)} Frogs`;


//---------DISPLAY UPDATE FUNCTION----------
function updateCount(newCount: number) { 
  count = newCount;
  counterDisplay.textContent = `${count.toFixed(2)} Frogs`;
  pondButton.disabled = count < 10;
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


//-------AUTO INCREMENT COUNT BASED ON TIME DELTA-----------------
function startIncrease(): void { 
  // build increment timer that uses requestAnimationFrame and uses delta time
  let lastTime = performance.now();
  // updates count based on timeDelta
  const update = (currentTime: number) => {
    // compute delta time
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    // add fractional amount to count
    updateCount(count += deltaTime)
    // schedule next frame
    requestAnimationFrame(update); // requestAnimationUpdate feeds currentTime to update function
  };
  // first call to requestAnimationFrame, subsequent calls made from within 'update' function
  requestAnimationFrame(update);
}


// ---------------BUY POND BUTTON--------------------------------
// create 'buy pond' button, its disabled until frogs = 10;
const pondButton = document.createElement("button");
pondButton.textContent = "Buy Pond, cost: 10 Frogs";
pondButton.disabled = true;
document.body.append(pondButton); // code for when button becomes clickable in "button click" listener

// when purchased begin to auto increment frog count
pondButton.addEventListener("click", () => {
  updateCount(count -= 10);
  startIncrease();
});


