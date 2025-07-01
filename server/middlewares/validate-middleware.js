const { startSession } = require("mongoose");

const validate = (schema) => async (req, res, next) => {
  try {
    const parsBody = await schema.parseAsync(req.body);
    req.body = parsBody;
    next();
  } catch (err) {
    const status = 422;

    const message = "Fill the Input Properly";
    const extraDetails = err.errors[0].message;
    const error = {
      status,
      message,
      extraDetails,
    };
    console.log(message);
    // res.status(400).json({ msg: message });
    next(error);
  }
};

module.exports = validate;
