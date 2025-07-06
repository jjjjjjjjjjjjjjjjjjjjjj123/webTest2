// Keep track of all buttons created
const allButtons = [];

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
    let button;

    if (role === "textInput") {
        button = document.createElement("input");
        button.type = "text";
        button.placeholder = name;
    } else {
        button = document.createElement("button");
        button.innerText = name;
        button.onclick = function () {
            if (role === "textSend") {
                // Find all inputs with role textInput and get their values concatenated (or first one)
                const textInputs = allButtons
                    .filter(b => b.button.tagName === "INPUT" && b.button.type === "text")
                    .map(b => b.button.value.trim())
                    .filter(val => val.length > 0);

                // For simplicity, join all values by comma if multiple inputs (can be changed if needed)
                const textValue = textInputs.join(",") || "";

                allButtons.forEach(b => {
                    if (b.button.tagName === "INPUT" && b.button.type === "text") {
                        b.button.value = ""; // Clear the text input
                    }
                });

                socket.send(JSON.stringify({ 
                    type: "button", 
                    index: index, 
                    role: role + (textValue ? "/" + textValue : ""), 
                    playerId: playerId 
                }));
            } else {
                socket.send(JSON.stringify({ type: "button", index: index, role: role, playerId: playerId }));
            }
        };
    }

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
