var index = 99;

function handleSocketMessage(event) {
    console.log("Received from Unity:", event.data);
    console.log("Index:", index);

    try {
        // Parse the received JSON message
        var data = JSON.parse(event.data);

        // Ensure the message contains the expected vector data
        if (data.type === "vectorData" && data.vector1 && data.vector2 && Number.isInteger(data.index)) {
            if ((data.playerId === index)||data.playerId === 99){//valid player id
                let width = Math.abs(data.vector1.x); // Ensure width is positive
                let height = Math.abs(data.vector1.y); // Ensure height is positive

                let posX = data.vector2.x;
                let posY = data.vector2.y;

                let index = data.index; // Capture the index
                let name = data.name;
                let role = data.role;
                let playerId = data.playerId;

                let color = data.color;

                createButton(name, index, width, height, posX, posY, role, playerId, color);
            }
        } else if (data.type === "msg" && data.message && Number.isInteger(data.playerId)) {
            if ((data.playerId === index)||data.playerId === 99)//valid player id
                makeHeader(data.message, data.playerId);

        }  else if (data.type === "wipe") {
            if ((data.playerId === index)||data.playerId === 99){//valid player id
                
                waitForWipe = false; // Allow button presses again
                // Remove all buttons
                const buttons = document.querySelectorAll("button");
                buttons.forEach(button => {
                    button.remove();
                });

                // Remove all header elements (h1–h6)
                const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
                headers.forEach(header => {
                    header.remove();
                });
            }

        } else if (data.type === "index"){
            if (index===99){
                index = data.index;
            }
        } else {
            console.warn("Invalid message format:", data);
        }
    } catch (error) {
        console.error("Error parsing message:", error);
    }
}
