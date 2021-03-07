const express = require("express");
const { Store } = require("express-session");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", isAdmin, (req, res) => {
  // store.all((error, sessions) => {
  //   console.log(sessions)
  //   return sessions
  // })
  let temp = (JSON.parse(JSON.stringify(req.sessionStore.sessions)))
  console.log(req.sessionStore)
  console.log(temp)
  res.render("admin", {
    user: req.user,
    session: req.session,
    currentSessions: (JSON.parse(JSON.stringify(req.sessionStore.sessions))),
    activeSessions: (JSON.parse(JSON.stringify(req.sessionStore.sessions))),
  })
})

module.exports = router;
