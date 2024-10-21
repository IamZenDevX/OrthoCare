const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const MessagesSchema = new mongoose.Schema(
{
message_id: {
type: String, 
default : uuidv4

},
receiver_id: {
type: String, 
},
sender_id: {
type: String, 
},
message: {
type: String, 
},
timestamp: {
type: Date, 
},
},
);





module.exports = mongoose.model("Messages", MessagesSchema);
