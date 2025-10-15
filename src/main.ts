import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// create counter display
const display = document.createElement("div");

// create count variable to track number of frogs
let count: number = 0;

// create display update function
const displayUpdate = () => {
  display.textContent = `${count} Frogs`;
};

// call displayupdate() to get initial display of count (when count is zero)
displayUpdate();

// append display to body so it shows up
document.body.appendChild(display);

// Create the button element
const button = document.createElement("button");
//add css class "frogClicker" to button
button.classList.add("frogClicker");

// Append it to the body (or any container)
document.body.appendChild(button);

// Add a click event listener
// On click increase count by 1
button.addEventListener("click", () => {
  count++;
  display.textContent = `${count} Frogs`;
});

// create 'increment timer' function which increases # of frogs +1/second
const _incrementTimer = setInterval(() => {
  count++;
  displayUpdate();
}, 1000);
