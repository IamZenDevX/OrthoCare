const express = require("express");
const router = express.Router();

const {addMessages, deleteMessages, getMessages, updateMessages} = require("../controller/messagesController");



router.post("/addmessages",  addMessages);

router.delete("/deletemessages/message_id/:message_id",  deleteMessages);

router.get("/getmessages/receiver_id/:receiver_id/sender_id/:sender_id",  getMessages);

router.put("/updatemessages/message_id/:message_id",  updateMessages);

module.exports = router;