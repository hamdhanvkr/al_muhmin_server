const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const Login = require('./models/login');
const Member = require('./models/memberdetails')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
	origin: process.env.FRONTEND_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true
}));
connectDB();




// Routes

const Logins = require('./routes/login');
const MemberDetails = require('./routes/memberdetails');

// Routes API

app.use('/api', Logins)
app.use('/api', MemberDetails)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
