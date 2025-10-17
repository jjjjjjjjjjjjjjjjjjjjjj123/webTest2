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

        // Clear previous content
        button.innerHTML = "";

        // Parse the name for color codes in the format: {color|text}
        // Example: "Click {#FF0000|Here}!"
        const regex = /\{(#?\w+)\|([^}]+)\}/g;
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(name)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                button.appendChild(document.createTextNode(name.substring(lastIndex, match.index)));
            }

            // Add colored text
            const span = document.createElement('span');
            span.textContent = match[2];
            span.style.color = match[1];
            button.appendChild(span);

            lastIndex = regex.lastIndex;
        }

        // Add any remaining text after the last match
        if (lastIndex < name.length) {
            button.appendChild(document.createTextNode(name.substring(lastIndex)));
        }

        button.onclick = function () {
            if (role === "textSend") {
                const textInputs = allButtons
                    .filter(b => b.button.tagName === "INPUT" && b.button.type === "text")
                    .map(b => b.button.value.trim())
                    .filter(val => val.length > 0);

                const textValue = textInputs.join(",") || "";

                allButtons.forEach(b => {
                    if (b.button.tagName === "INPUT" && b.button.type === "text") {
                        b.button.value = ""; // Clear input
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

    allButtons.push({ button: button, originalY: posY });

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
    header.style.margin = "0";

    // Parse the text for color codes in the format: {color|text}
    // Example: "Hello {red|World}!"
    const regex = /\{(#?\w+)\|([^}]+)\}/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            header.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
        }

        // Add colored text
        const span = document.createElement('span');
        span.textContent = match[2];
        span.style.color = match[1];
        header.appendChild(span);

        lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last match
    if (lastIndex < text.length) {
        header.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    headerContainer.appendChild(header);

    // Wait for DOM to update and remeasure header height
    setTimeout(positionButtons, 0);
}


// Optional: update button positions if window is resized (responsive design)
window.addEventListener("resize", () => {
    positionButtons();
});
