function createButton(name, index, width, height, posX, posY, role, playerId, color) {
    var button = document.createElement("button");
    button.innerText = name;
    button.classList.add("card");
    if (color === "gray") {
        button.classList.add("darken");
    }

    button.style.position = "absolute";
    
    // Push all buttons below the header using a fixed offset
    const headerHeight = 80; // Adjust if your header is taller
    button.style.left = "50%";
    button.style.transform = "translateX(-50%)";
    button.style.top = headerHeight + posY + "px";

    button.onclick = function () {
        socket.send(JSON.stringify({ type: "button", index: index, role: role, playerId: playerId }));
    };

    document.body.appendChild(button);
}

function makeHeader(text, playerId) {
    // Check if header container exists, if not create it
    let headerContainer = document.getElementById("header-container");
    if (!headerContainer) {
        headerContainer = document.createElement('div');
        headerContainer.id = "header-container";
        headerContainer.style.position = "relative";
        headerContainer.style.width = "100%";
        headerContainer.style.textAlign = "center";
        headerContainer.style.zIndex = "1000"; // Ensure it's above other elements
        headerContainer.style.marginTop = "10px"; // Optional spacing
        document.body.appendChild(headerContainer);
    }

    const header = document.createElement('h1');
    header.textContent = text;
    header.style.margin = "0";
    headerContainer.appendChild(header);
}
