module.exports = io => {
  io.on("connection", socket => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on("add-group-note", data => {
      socket.broadcast.emit("add-group-note", data);
    });

    socket.on("assign-user", data => {
      socket.broadcast.emit("assign-user", data);
    });

    socket.on("add-date-group", data => {
      socket.broadcast.emit("add-date-group", data);
    });

    socket.on("group-created", data => {
      socket.broadcast.emit("group-created", data);
    });

    socket.on("add-observation", data => {
      socket.broadcast.emit("add-observation", data);
    });

    socket.on("update-students", data => {
      socket.broadcast.emit("update-students", data);
    });

    socket.on("disconnect", () => {
      console.log(`Connection ${socket.id} has left the building`);
    });
  });
};
