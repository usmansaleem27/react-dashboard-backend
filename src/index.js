import connect from "./db/index.js";
import app from "./app.js";
import { config } from "./config/config.js";
import cors from "cors"
import bodyParser from 'body-parser';
import User from "./modals/user.modals.js";
import jwt from 'jsonwebtoken';

app.use(cors({
  origin: ['http://localhost:3000', 'https://react-dashboard-eight-blue.vercel.app'], // Replace with your frontend URL if different
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));
app.use(bodyParser.json());

// Hardcoded credentials
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@mydashboard.com' && password === 'admin@123') {
    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

connect()
  .then(() => {
    app.listen(config.port, () => {
      console.log("\n Server start on !! Port:", config.port);
    });
  })
  .catch((error) => {
    console.log("Database connection faild ", error);
  });
