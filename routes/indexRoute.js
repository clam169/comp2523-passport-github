const express = require("express");
const { MemoryStore, Store } = require("express-session");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
// const { store, getSessions } = require("../models/userSession");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", isAdmin, (req, res) => {
  res.render("admin", {
    user: req.user,
    sessions: req.sessionStore.sessions,
  });
});

router.get("/admin/revoke/:sessionID", (req, res) => {
const sessionID = req.params.sessionID;
req.sessionStore.destroy(sessionID);
res.redirect("/admin");
});

module.exports = router;
