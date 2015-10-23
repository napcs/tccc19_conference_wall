// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "deps/phoenix/web/static/js/phoenix";

let socket = new Socket("/socket", {});

socket.connect();

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("walls:" + window.topic, {});
let tweets = document.getElementById('tweets');
let chatWindow = document.getElementById('chat_window');
let messageBox = document.getElementById('message_box');


messageBox.addEventListener('keydown', event => {
  if (event.which === 13) {
    channel.push("new_msg", {body: messageBox.value})
      .receive("ok", payload => {
        let el = document.createElement('div');
        el.innerHTML = "Me: " + payload.body;
        chatWindow.appendChild(el);
        messageBox.value = "";
      })
      .after(2000, () => console.log("waited for 2s"));

  }
});

channel.on('new_msg', (payload) => {
  let el = document.createElement('div');
  el.innerHTML = "Anonymous: " + payload.body;
  chatWindow.appendChild(el);
});


channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
