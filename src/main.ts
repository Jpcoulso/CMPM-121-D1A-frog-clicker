import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;
// Create the button element
const button = document.createElement("button");
//add css class "frogClicker" to button
button.classList.add("frogClicker");

// Add a click event listener
button.addEventListener("click", () => {
  console.log("Button was clicked!");
});

// Append it to the body (or any container)
document.body.appendChild(button);
