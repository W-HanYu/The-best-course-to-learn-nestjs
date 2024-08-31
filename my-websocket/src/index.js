const MyWebsocket = require("./ws");
const ws = new MyWebsocket({ port: 8080 });

ws.on("data", (data) => {
  console.log("receive data:" + data);
});

ws.on("close", (code, reason) => {
  console.log("close:", code, reason);
});
