import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// create counter display
const display = document.createElement("div");
display.textContent = "0";
// append display to body so it shows up
document.body.appendChild(display);

// create count variable to track number of frogs
let count: number = 0;

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


