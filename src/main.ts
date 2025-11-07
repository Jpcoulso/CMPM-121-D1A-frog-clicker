import "./style.css";

// --------------------------------------------------------------------------VARIABLES AND DATA STRUCTURES----------------------------------
let count: number = 0;
let growthRate = 0;
const COST_MULTIPLIER = 1.15;

interface upgrade {
  name: string;
  cost: number;
  rate: number;
  purchasedCount: number;
  description: string;
}

const availableUpgrades: upgrade[] = [
  {
    name: "pond",
    cost: 10,
    rate: 0.1,
    purchasedCount: 0,
    description: "a small body of water for frogs to hang in",
  },
  {
    name: "swamp",
    cost: 100,
    rate: 2,
    purchasedCount: 0,
    description: "frogs get to hangout with shrek",
  },
  {
    name: "marsh",
    cost: 1000,
    rate: 50,
    purchasedCount: 0,
    description: "like a town, but for frogs",
  },
  {
    name: "bog",
    cost: 10000,
    rate: 100,
    purchasedCount: 0,
    description: "basically a bigger marsh",
  },
  {
    name: "terraformer",
    cost: 50000,
    rate: 1000,
    purchasedCount: 0,
    description:
      "burn their cities and grind their bones, we shall wipe humanity off the face of the earth and reclaim the land that is rightfully ours",
  },
];

//------------------------------------------------------------------------------------------------------------------------------FUNCTIONS----------------------------------------------------

//---------------------------------------------------------------------REFACTORED AUTO-INCREMENT FUNCTION----------------
function autoIncrease(upgrade: upgrade): void {
  // build increment timer that uses requestAnimationFrame and uses delta time
  let lastTime = performance.now();
  // updates count based on timeDelta
  const update = (currentTime: number) => {
    // compute delta time
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    // add fractional amount to count
    updateCount(count += upgrade.rate * deltaTime);
    // schedule next frame
    requestAnimationFrame(update); // update occurs as browser is refreshed leading to better optimization
  };
  // first call to requestAnimationFrame, subsequent calls made from within 'update' function
  requestAnimationFrame(update);
}

//-----------------------------------------------------------------------REFACTORED DISPLAY/COUNT UPDATE FUNCTION--------------
function updateCount(newCount: number) {
  if (newCount < 0) {
    count = 0;
  } else {
    count = newCount;
  }
  counterDisplay.textContent = `${count.toFixed(2)} Frogs`;
  growthRateDisplay.textContent = `${growthRate.toFixed(2)} Frogs/sec`;
  for (const upgrade of availableUpgrades) {
    upgradeButtons[upgrade.name].textContent = `Buy ${upgrade.name}, cost: ${
      upgrade.cost.toFixed(2)
    } Frogs, Units: ${upgrade.purchasedCount}\n${upgrade.description}`;
    upgradeButtons[upgrade.name].disabled = count < upgrade.cost; // disabled to prevent invalid purchases (enabled when player has enough frogs)
  }
}

//------------------------------------------------------------------------------------------------------------------------INITIALIZE GAME STATE--------------------------------------------------------

//-------------------------------------------------Create frog themed header, inspired by https://mgembree.github.io/cmpm-121-f25-mattembree/
const header = document.createElement("header");
header.classList.add("frogHeader");
header.innerHTML = `
  <h1>🐸 Frog Clicker 🐸</h1>
  <p>Grow your frog empire!</p>
`;
document.body.prepend(header);

// -------------------------------------------------Create main layout container
const layout = document.createElement("div");
layout.classList.add("pageLayout");
document.body.appendChild(layout);

// ---------------------------------------------Create left side (frog button + counters)
const leftPanel = document.createElement("div");
layout.appendChild(leftPanel);
leftPanel.classList.add("leftPanel");

// ------------------------------------------------Create right side (upgrade buttons)
const upgradePanel = document.createElement("div");
upgradePanel.classList.add("upgradePanel");
layout.appendChild(upgradePanel);

// -------------------------------------------------------CREATE COUNTER DISPLAY-------------------
const counterDisplay = document.createElement("div");
leftPanel.appendChild(counterDisplay);
// create counterDisplay update function
counterDisplay.textContent = `${count.toFixed(2)} Frogs`;

//--------------------------------------------------------CREATE FROGS/SEC DISPLAY------------------
const growthRateDisplay = document.createElement("div");
leftPanel.appendChild(growthRateDisplay);
growthRateDisplay.textContent = `${growthRate.toFixed(2)} Frogs/sec`;

const counterContainer = document.createElement("div");
counterContainer.classList.add("counterContainer");
leftPanel.appendChild(counterContainer);

// Move these into the counterContainer:
counterContainer.appendChild(counterDisplay);
counterContainer.appendChild(growthRateDisplay);

// --------------------------------------------------------CREATE FROG BUTTON-----------------------
// Create the button element, add css style, append so it shows up
const frogButton = document.createElement("button");
frogButton.classList.add("frogButton");
leftPanel.appendChild(frogButton);
// On click increase count by 1
frogButton.addEventListener("click", () => {
  updateCount(count += 1);
});

leftPanel.appendChild(frogButton);
leftPanel.appendChild(counterContainer);

//-----------------------------------------------------------------------------------------------------------------------INITIALIZE UPGRADE BUTTONS---------------------------------------

//-----------------------------------------------------CREATE BUTTONS AND ADD THEM TO DICTIONARY--------------

const upgradeButtons: { [key: string]: HTMLButtonElement } = {};

for (const upgrade of availableUpgrades) {
  const button = document.createElement("button");
  button.id = `${upgrade.name}Button`;
  button.classList.add("upgradeButton");
  button.textContent = `Buy ${upgrade.name}, cost: ${
    upgrade.cost.toFixed(2)
  } Frogs, Units: ${upgrade.purchasedCount}\n${upgrade.description}`;
  button.disabled = true;
  upgradePanel.appendChild(button);
  upgradeButtons[upgrade.name] = button;
}

// ------------------------------------------------------------------------------------------------------------------------CREATE BUTTON LISTENERS--------------------------------------------------

// -------------------------------------------------CREATE LISTENERS FOR EACH BUTTON--------------
for (const upgrade of availableUpgrades) {
  upgradeButtons[upgrade.name].addEventListener("click", () => {
    updateCount(count -= upgrade.cost);
    autoIncrease(upgrade);
    upgrade.purchasedCount++;
    upgrade.cost = upgrade.cost * COST_MULTIPLIER;
    growthRate = growthRate + upgrade.rate;
  });
}
