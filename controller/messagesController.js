const ErrorHandler = require("../utils/default/errorHandler");
const Messages = require("../models/MessagesModel");

exports.addMessages = async (req, res, next) => {
  const { message, receiver_id, sender_id, timestamp } = req.body;
  let timestamp_msg;
  //		timestamp
  timestamp_msg = Date.now();

  let createdMessages;
  try {
    createdMessages = await Messages.create({
      sender_id,
      receiver_id,
      message,
      timestamp: timestamp_msg,
    });
  } catch (err) {
    const error = new ErrorHandler(
      "Error while inserting new Messages data!",
      500
    );
    return next(err);
  }
  res.status(200);
  res.json({ message: "Data Inserted Successfully!", data: createdMessages });
};

exports.deleteMessages = async (req, res, next) => {
  const { message_id } = req.params;
  let deletedMessages;
  try {
     deletedMessages = await Messages.deleteMany({
      message_id,
    });
  } catch (err) {
    const error = new ErrorHandler("Error While Deleteing Messages Data!", 500);
    return next(error);
  }
  res.status(200);
  res.json({ messages: "Data Deleted Successfully!" });
};

exports.getMessages = async (req, res, next) => {
  const { receiver_id, sender_id } = req.params;
  let var_Messages_List;
  try {
    var_Messages_List = await Messages.find(
        {$or:[{receiver_id:receiver_id},
            {sender_id:sender_id}]
        },
      
      "receiver_id sender_id timestamp message_id message "
    );
  } catch (err) {
    const error = new ErrorHandler("Error While Finding Message Data!", 500);
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Selected Successfully!", data: var_Messages_List });
};

exports.updateMessages = async (req, res, next) => {
  const { message, receiver_id, sender_id } = req.body;
  const { message_id } = req.params;
  let updatedMessages;
  try {
     updatedMessages = await Messages.updateMany(
      {
        message_id,
      },
      {
        message: message,
        receiver_id: receiver_id,
        sender_id: sender_id,
      },
      { new: true }
    );
  } catch (err) {
    const error = new ErrorHandler("Error While Updating Messages Data!", 500);
    return next(error);
  }
  res.status(200);
  res.json({ message: "Data Updated Successfully!", data: updatedMessages });
};
