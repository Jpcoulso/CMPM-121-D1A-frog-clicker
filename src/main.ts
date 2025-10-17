import "./style.css";

// -----------------------------------------------------------------------------------------------------------------VARIABLES AND DATA STRUCTURES----------------------------------
let count: number = 100000;
let growthRate = 0;
const COST_MULTIPLIER = 1.15;

interface upgrade {
  name: string;
  cost: number;
  rate: number;
  units: number;
  description: string;
}

const availableUpgrades: upgrade[] = [
  {
    name: "pond",
    cost: 10,
    rate: 0.1,
    units: 0,
    description: "a small body of water for frogs to hang in",
  },
  {
    name: "swamp",
    cost: 100,
    rate: 2,
    units: 0,
    description: "frogs get to hangout with shrek",
  },
  {
    name: "marsh",
    cost: 1000,
    rate: 50,
    units: 0,
    description: "like a town, but for frogs",
  },
  {
    name: "bog",
    cost: 10000,
    rate: 100,
    units: 0,
    description: "basically a bigger marsh",
  },
  {
    name: "terraformer",
    cost: 50000,
    rate: 1000,
    units: 0,
    description:
      "burn their cities and grind their bones, we shall wipe humanity off the face of the earth and reclaim the land that is rightfully ours",
  },
];

/*
  pondButton.textContent = `Buy Pond, cost: ${
    upgradeArr[0].cost.toFixed(2)
  } Frogs, units: ${upgradeArr[0].units}`;
  swampButton.textContent = `Buy swamp, cost: ${
    upgradeArr[1].cost.toFixed(2)
  } Frogs, units: ${upgradeArr[1].units}`;
  marshButton.textContent = `Buy marsh, cost: ${
    upgradeArr[2].cost.toFixed(2)
    } Frogs, units: ${upgradeArr[2].units}`;
  bogButton.textContent = `Buy bog, cost: ${
    upgradeArr[3].cost.toFixed(2)
    } Frogs, units: ${upgradeArr[3].units}`;
  terraformerButton.textContent = `Buy terraformer, cost: ${
    upgradeArr[4].cost.toFixed(2)
  } Frogs, units: ${upgradeArr[4].units}`;
  pondButton.disabled = count < upgradeArr[0].cost;
  swampButton.disabled = count < upgradeArr[1].cost;
  marshButton.disabled = count < upgradeArr[2].cost;
  bogButton.disabled = count < upgradeArr[3].cost;
  terraformerButton.disabled = count < upgradeArr[4].cost;
}
*/

//------------------------------------------------------------------------------------------------------------------------INITIALIZE GAME STATE--------------------------------------------------------

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
  updateCount(count += 1);
});

//-----------------------------------------------------------------------------------------------------------------------INITIALIZE UPGRADE BUTTONS---------------------------------------

//-----------------------------------------------------CREATE BUTTONS AND ADD THEM TO DICTIONARY--------------

const upgradeButtons: { [key: string]: HTMLButtonElement } = {};

for (const upgrade of availableUpgrades) {
  const button = document.createElement("button");
  button.id = `${upgrade.name}Button`;
  button.textContent = `Buy ${upgrade.name}, cost: ${
    upgrade.cost.toFixed(2)
  } Frogs, units: ${upgrade.units}`;
  button.disabled = true;
  document.body.appendChild(button);
  upgradeButtons[upgrade.name] = button;
}

//------------------------------------------------------------------------------------------------------------------------------FUNCTIONS----------------------------------------------------

//---------------------------------------------------------------------REFACTORED AUTO-INCREMENT FUNCTION----------------
function autoIncrease(upgradeType: upgrade): void {
  // build increment timer that uses requestAnimationFrame and uses delta time
  let lastTime = performance.now();
  // updates count based on timeDelta
  const update = (currentTime: number) => {
    // compute delta time
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    // add fractional amount to count
    updateCount(count += upgradeType.rate * deltaTime);
    // schedule next frame
    requestAnimationFrame(update); // requestAnimationUpdate feeds currentTime to update function
  };
  // first call to requestAnimationFrame, subsequent calls made from within 'update' function
  requestAnimationFrame(update);
}

//-----------------------------------------------------------------------REFACTORED DISPLAY UPDATE FUNCTION--------------
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
    } Frogs, units: ${upgrade.units}`;
    upgradeButtons[upgrade.name].disabled = count < upgrade.cost;
  }
}
/*
const pondButton = document.createElement("button");
pondButton.id = "pondButton";

const swampButton = document.createElement("button");
swampButton.id = "swampButton";

const marshButton = document.createElement("button");
marshButton.id = "marshButton";

const bogButton = document.createElement("button");
bogButton.id = "bogButton";

const terraformerButton = document.createElement("button");
terraformerButton.id = "terraformerButton";

// -----------------------------------------------------CREATE BUTTON DICTIONARY--------------
const upgradeButtons: { [key: string]: HTMLButtonElement } = {
  pond: document.getElementById("pondButton") as HTMLButtonElement,
  swamp: document.getElementById("swampButton") as HTMLButtonElement,
  marsh: document.getElementById("marshButton") as HTMLButtonElement,
  bog: document.getElementById("bogButton") as HTMLButtonElement,
  terraformer: document.getElementById("terraformerButton") as HTMLButtonElement,
};

for (let i = 0; i < 5; i++) {
  upgradeButtons[availableUpgrades[i].name].textContent = `Buy ${availableUpgrades[i].name}, cost: ${availableUpgrades[i].cost.toFixed(2)} Frogs, units: ${
  availableUpgrades[i].units
  }`;
  upgradeButtons[availableUpgrades[i].name].disabled = true;
  //upgradeButtons[availableUpgrades[i].name].id = "${ava}Button";
  document.body.append(upgradeButtons[availableUpgrades[i].name]); // code for when button becomes clickable in "button click" listener
}
*/
/*
// ----------------------------------------------------------CREATE POND BUTTON--------------------------------
// create 'buy pond' button, its disabled until frogs = 10;
const pondButton = document.createElement("button");
pondButton.textContent = `Buy Pond, cost: 10.00 Frogs, units: ${
  availableUpgrades[0].units
}`;
pondButton.disabled = true;
pondButton.id = "pondButton";
document.body.append(pondButton); // code for when button becomes clickable in "button click" listener

// --------------------------------------------------------CREATE SWAMP BUTTON--------------------------------
// create 'buy swamp' button, its disabled until frogs = 100;
const swampButton = document.createElement("button");
swampButton.textContent = `Buy swamp, cost: 100.00 Frogs, units: ${
  availableUpgrades[1].units
}`;
swampButton.disabled = true;
swampButton.id = "swampButton";
document.body.append(swampButton); // code for when button becomes clickable in "button click" listener

// --------------------------------------------------------CREATE MARSH BUTTON--------------------------------
// create 'buy marsh' button, its disabled until frogs = 1000;
const marshButton = document.createElement("button");
marshButton.textContent = `Buy marsh, cost: 1000.00 Frogs, units: ${
  availableUpgrades[2].units
}`;
marshButton.disabled = true;
marshButton.id = "marshButton";
document.body.append(marshButton); // code for when button becomes clickable in "button click" listener

// --------------------------------------------------------CREATE BOG BUTTON--------------------------------
// create 'buy Bog' button, its disabled until frogs = 10000;
const bogButton = document.createElement("button");
bogButton.textContent = `Buy bog, cost: 10000.00 Frogs, units: ${
  availableUpgrades[3].units
}`;
bogButton.disabled = true;
bogButton.id = "bogButton";
document.body.append(bogButton); // code for when button becomes clickable in "button click" listener

// --------------------------------------------------------CREATE TERRAFORMER BUTTON--------------------------------
// create 'buy Bog' button, its disabled until frogs = 10000;
const terraformerButton = document.createElement("button");
terraformerButton.textContent = `Buy terraformer, cost: 50000.00 Frogs, units: ${
  availableUpgrades[4].units
}`;
terraformerButton.disabled = true;
terraformerButton.id = "terraformerButton";
document.body.append(terraformerButton); // code for when button becomes clickable in "button click" listener
*/

// ------------------------------------------------------------------------------------------------------------------------CREATE BUTTON LISTENERS--------------------------------------------------

// -------------------------------------------------CREATE LISTENERS FOR EACH BUTTON--------------
for (const upgrade of availableUpgrades) {
  upgradeButtons[upgrade.name].addEventListener("click", () => {
    updateCount(count -= upgrade.cost);
    autoIncrease(upgrade);
    upgrade.units++;
    upgrade.cost = upgrade.cost * COST_MULTIPLIER;
    growthRate = growthRate + upgrade.rate;
  });
}
