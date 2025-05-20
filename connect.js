function handleSocketOpen(socket, url, name) {
    console.log("Connected to Unity WebSocket Server:", url);
    //document.getElementById("status").innerText = "Connected to " + url;
    socket.send(JSON.stringify({ 
        type: "join", 
        playerName: name, 
        screenWidth: window.innerWidth, 
        screenHeight: window.innerHeight 
    }));
    // Enable buttons after successful connection
    document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}
function handleSocketClose() {
    //document.getElementById("status").innerText = "Disconnected";
    console.log("WebSocket Disconnected");
}
function handleSocketError(error) {
    console.log("WebSocket Error:", error);
    //document.getElementById("status").innerText = "Connection Error";
}
//test remote repository