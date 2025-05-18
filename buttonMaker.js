function createButton(name, index, width, height, posX, posY, role, playerId, color) {
    var button = document.createElement("button");
    button.innerText = name;
    button.classList.add("card");
    if (color=="gray")
        button.classList.add("darken");
    // Set the position to absolute
    button.style.position = "absolute";
    
    // Set the position based on the percentage of the screen width and height
    button.style.left = "50%";
    button.style.transform = "translateX(-50%)";
    button.style.top = 20 + posY + "px";
    

    button.onclick = function () {
        //alert("Button clicked: " + label);
        socket.send(JSON.stringify({ type: "button", index: index, role: role, playerId: playerId}));
    };

    // Append the button to the body or any other container
    document.body.appendChild(button);
}

function makeHeader(text, playerId) {
    const header = document.createElement('h1');
    header.textContent = text;

    // Style it to be centered
    header.style.textAlign = 'center';
    header.style.marginTop = '5px'; // Optional spacing

    document.body.appendChild(header);
}
