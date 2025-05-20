// Keep track of all buttons created
const allButtons = [];
let waitForWipe = false;

function getHeaderHeight() {
    const headerContainer = document.getElementById("header-container");
    return headerContainer ? headerContainer.getBoundingClientRect().height : 0;
}

function positionButtons() {
    const headerHeight = getHeaderHeight();
    allButtons.forEach(({ button, originalY }) => {
        button.style.top = headerHeight + originalY + "px";
    });
}

function createButton(name, index, width, height, posX, posY, role, playerId, color) {
    const button = document.createElement("button");
    button.innerText = name;
    button.classList.add("card");
    if (color === "gray") button.classList.add("darken");

    button.style.position = "absolute";
    button.style.left = "50%";
    button.style.transform = "translateX(-50%)";

    document.body.appendChild(button);

    // Track the button and its original Y offset
    allButtons.push({ button: button, originalY: posY });

    // Reposition all buttons in case header is present
    positionButtons();

    button.onclick = function () {
        if (waitForWipe) return; // Do nothing if we're waiting for a wipe
        waitForWipe = true; // Lock further button presses

        socket.send(JSON.stringify({ type: "button", index: index, role: role, playerId: playerId }));
    };
}

function makeHeader(text, playerId) {
    let headerContainer = document.getElementById("header-container");
    if (!headerContainer) {
        headerContainer = document.createElement('div');
        headerContainer.id = "header-container";
        headerContainer.style.position = "relative";
        headerContainer.style.width = "100%";
        headerContainer.style.textAlign = "center";
        headerContainer.style.zIndex = "1000";
        document.body.appendChild(headerContainer);
    }

    const header = document.createElement('h1');
    header.textContent = text;
    header.style.margin = "0";
    headerContainer.appendChild(header);

    // Wait for DOM to update and remeasure header height
    setTimeout(positionButtons, 0);
}

// Optional: update button positions if window is resized (responsive design)
window.addEventListener("resize", () => {
    positionButtons();
});
