const {
  orderWatcher,
  strategiesWatcher,
  MarketOrder,
} = require("./controllers/strategyController.js");
// const { marketQuotes } = require("./controllers/userController");

module.exports = function (io) {
  let interval;
  io.on("connection", (socket) => {
    // console.log("socket Connected...");

    socket.on("get:market-quotes", function (data) {
      let start = 9,
        end = 20;
      if (interval) {
        clearInterval(interval);
      }

      interval = setInterval(function () {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        if (
          hour >= start &&
          hour <= end &&
          ((hour != start && hour != end) ||
            (hour == start && minutes > 15) ||
            (hour == end && minutes < 30))
        ) {
          // marketQuotes();
          strategiesWatcher();

          orderWatcher();
        } else {
          if (hour > start) {
            if (interval) {
              clearInterval(interval);
            }
          }
        }
      }, 1000);
    });
  });
};
