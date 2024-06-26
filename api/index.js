const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const crypto = require('crypto')
const nodemailer = require('nodemailer')


const app = express()
const port = 8000
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const jwt = require('jsonwebtoken')

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

mongoose.connect('mongodb://localhost:27017/AsmRN2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err)
    })
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});


const User = require('./models/users')
const Order = require('./models/order')

const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "trungndph39729@fpt.edu.vn",
            pass: "krfx kdnq nzmk mtet"
        }
    })

    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: 'Email Verificaion',
        text: `Please click the following link to verify your email : http:///localhost:8000/verify/${verificationToken}`
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log('Error sending verificaion email ', error)
    }
}

// endpoint to register in the app
const Upload = require("./common/upload")
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered:", email); // Debugging statement
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create a new user
        const newUser = new User({ name, email, password });

        // Generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // Save the user to the database
        await newUser.save();

        // Debugging statement to verify data
        console.log("New User Registered:", newUser);

        // Send verification email to the user
        // Use your preferred email service or library to send the email
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({
            message:
                "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

//endpoint to verify the email
app.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({ verificationToken: token })

        if (!user) {
            return res.status(400).json({ message: 'Invalid verificaion token' })

        }

        user.verified = true
        user.verificationToken = undefined

        await user.save()

        res.status(200).json({ message: 'Email verify successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Email verify failed' })

    }
})

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
};

const secretKey = generateSecretKey();


//endpoint to login the user!
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        //generate a token
        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});

//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.addresses.push(address);

        await user.save();

        res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
        console.error('Lỗi khi thêm địa chỉ:', error);
        res.status(500).json({ message: "Error adding address" });
    }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const addresses = user.addresses;
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieveing the addresses" });
    }
});

//endpoint to store all the orders
app.post("/orders", async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
            req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //create an array of product objects from the cart Items
        const products = cartItems.map((item) => ({
            name: item?.title,
            quantity: item.quantity,
            price: item.price,
            image: item?.image,
        }));

        //create a new Order
        const order = new Order({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        });

        await order.save();

        res.status(200).json({ message: "Order created successfully!" });
    } catch (error) {
        console.log("error creating orders", error);
        res.status(500).json({ message: "Error creating orders" });
    }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the user profile" });
    }
});

app.get("/orders/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ user: userId }).populate("user");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" })
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
})
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.put("/update-profile-by-id/:id", Upload.single('avatar'), async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { file } = req
        console.log(data)
        const updateProfile = await User.findById(id);
        let result = null
        if (updateProfile) {
            updateProfile.name = data.name ?? updateProfile.name
            updateProfile.email = data.email ?? updateProfile.email
            updateProfile.phoneNo = data.phoneNo ?? updateProfile.phoneNo
            updateProfile.avatar = data.avatar ?? `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
            result = await updateProfile.save()

        }
        if (result) {
            res.json({
                status: 200,
                messenger: "tìm thấy id và update thành công",
                data: result,
            });
        } else {
            res.json({
                status: 400,
                messenger: "update thất bại",
                data: null,
            });
        }
    } catch (error) {
        console.log(error);
    }
});
