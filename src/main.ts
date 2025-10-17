import "./style.css";

// ------------------------------------------------------------------------VARIABLES AND DATA STRUCTURES----------------------------------
let count: number = 0;
let growthRate = 0;
const COST_MULTIPLIER = 1.15;

// here lies upgrade buttons dictionary

interface upgrade {
  name: string;
  cost: number;
  rate: number;
  units: number;
}

const availableUpgrades: upgrade[] = [
  { name: "pond", cost: 10, rate: 0.1, units: 0 },
  { name: "swamp", cost: 100, rate: 2, units: 0 },
  { name: "marsh", cost: 1000, rate: 50, units: 0 },
];

//------------------------------------------------------------------------------------------------------------------------------FUNCTIONS----------------------------------------------------

//---------------------------------------------------------------------REFACTORED AUTO INCREMENT FUNCTION----------------
function autoIncrease(upgradeType: upgrade): void {
  // build increment timer that uses requestAnimationFrame and uses delta time
  let lastTime = performance.now();
  // updates count based on timeDelta
  const update = (currentTime: number) => {
    // compute delta time
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    // add fractional amount to count
    updateCount(count += upgradeType.rate * deltaTime, availableUpgrades);
    // schedule next frame
    requestAnimationFrame(update); // requestAnimationUpdate feeds currentTime to update function
  };
  // first call to requestAnimationFrame, subsequent calls made from within 'update' function
  requestAnimationFrame(update);
}

//-----------------------------------------------------------------------REFACTORED DISPLAY UPDATE FUNCTION--------------
function updateCount(newCount: number, upgradeArr: upgrade[]) {
  if (newCount < 0) {
    count = 0;
  } else {
    count = newCount;
  }
  counterDisplay.textContent = `${count.toFixed(2)} Frogs`;
  growthRateDisplay.textContent = `${growthRate.toFixed(2)} Frogs/sec`;
  pondButton.textContent = `Buy Pond, cost: ${
    upgradeArr[0].cost.toFixed(2)
  } Frogs, units: ${upgradeArr[0].units}`;
  swampButton.textContent = `Buy swamp, cost: ${
    upgradeArr[1].cost.toFixed(2)
  } Frogs, units: ${upgradeArr[1].units}`;
  marshButton.textContent = `Buy marsh, cost: ${
    upgradeArr[2].cost.toFixed(2)
  } Frogs, units: ${upgradeArr[2].units}`;
  pondButton.disabled = count < upgradeArr[0].cost;
  swampButton.disabled = count < upgradeArr[1].cost;
  marshButton.disabled = count < upgradeArr[2].cost;
}

//------------------------------------------------------------------------------------INITIALIZE GAME STATE--------------------------------------------------------

// -------------------------------------------------------CREATE COUNTER DISPLAY-------------------
const counterDisplay = document.createElement("div");
document.body.appendChild(counterDisplay);
// create counterDisplay update function
counterDisplay.textContent = `${count.toFixed(2)} Frogs`;

//--------------------------------------------------------CREATE FROGS/SEC DISPLAY------------------
const growthRateDisplay = document.createElement("div");
document.body.appendChild(growthRateDisplay);
growthRateDisplay.textContent = `${growthRate.toFixed(2)} Frogs/sec`;

// --------------------------------------------------------CREATE FROG BUTTON-----------------------
// Create the button element, add css style, append so it shows up
const frogButton = document.createElement("button");
frogButton.classList.add("frogClicker");
document.body.appendChild(frogButton);
// On click increase count by 1
frogButton.addEventListener("click", () => {
  updateCount(count += 1, availableUpgrades);
});

//--------------------------------------------------------------------------------INITIALIZE UPGRADE BUTTONS---------------------------------------

// ----------------------------------------------------------BUY POND BUTTON--------------------------------
// create 'buy pond' button, its disabled until frogs = 10;
const pondButton = document.createElement("button");
pondButton.textContent = `Buy Pond, cost: 10.00 Frogs, units: ${
  availableUpgrades[0].units
}`;
pondButton.disabled = true;
pondButton.id = "pondButton";
document.body.append(pondButton); // code for when button becomes clickable in "button click" listener

// ---------------BUY SWAMP BUTTON--------------------------------
// create 'buy swamp' button, its disabled until frogs = 100;
const swampButton = document.createElement("button");
swampButton.textContent = `Buy swamp, cost: 100.00 Frogs, units: ${
  availableUpgrades[1].units
}`;
swampButton.disabled = true;
swampButton.id = "swampButton";
document.body.append(swampButton); // code for when button becomes clickable in "button click" listener

// ---------------BUY MARSH BUTTON--------------------------------
// create 'buy marsh' button, its disabled until frogs = 1000;
const marshButton = document.createElement("button");
marshButton.textContent = `Buy marsh, cost: 1000.00 Frogs, units: ${
  availableUpgrades[2].units
}`;
marshButton.disabled = true;
marshButton.id = "marshButton";
document.body.append(marshButton); // code for when button becomes clickable in "button click" listener

// -----------------------------------------------------------------------CREATE BUTTON LISTENERS--------------------------------------------------

// -------------------------------CREATE BUTTON DICTIONARY--------------
const upgradeButtons: { [key: string]: HTMLButtonElement } = {
  pond: document.getElementById("pondButton") as HTMLButtonElement,
  swamp: document.getElementById("swampButton") as HTMLButtonElement,
  marsh: document.getElementById("marshButton") as HTMLButtonElement,
};

// -------------------------CREATE LISTENERS FOR EACH BUTTON--------------
for (let i = 0; i < 3; i++) {
  upgradeButtons[availableUpgrades[i].name].addEventListener("click", () => {
    updateCount(count -= availableUpgrades[i].cost, availableUpgrades);
    autoIncrease(availableUpgrades[i]);
    availableUpgrades[i].units++;
    availableUpgrades[i].cost = availableUpgrades[i].cost * COST_MULTIPLIER;
    growthRate = growthRate + availableUpgrades[i].rate;
  });
}
