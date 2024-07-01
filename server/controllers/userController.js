import User from "../models/User.js";
import dotenv from 'dotenv'
dotenv.config();

// Register User
exports.register = async (req, res) => {
  const {
    name,
    email,
    password,
    mobileNo,
    alternativeMobile,
    dob,
    address,
    pincode,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobileNo,
      alternativeMobile,
      dob,
      address,
      pincode,
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); // 7 days
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
