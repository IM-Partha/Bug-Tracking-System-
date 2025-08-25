const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projects.routes');
const issueRoutes = require('./routes/issues.routes');
const authRoutes = require('./routes/auth.routes');
const authenticate = require('./middleware/auth.middleware');
dotenv.config();

const index = express();
const PORT = process.env.PORT || 5000;

index.use(cors());
index.use(express.json());
index.get('ping',(req,res)=>{
  res.send("Pong")
})
index.use('/api/auth', authRoutes);
index.use('/api/projects',authenticate, projectRoutes);
index.use('/api/issues',authenticate, issueRoutes);

index.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
