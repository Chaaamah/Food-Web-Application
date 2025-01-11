/*const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');


const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');


const app = express();
dotenv.config();
app.use(cors());


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


mongoose.set("strictQuery", false);

app.use('/', userRouter);
app.use('/', productRouter);



mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(result => app.listen(process.env.PORT, () => {
    console.log("Server running");
  }))
  .catch(error => console.log(error));*/

  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  const loginRouter = require("./routes/login.routes");
  const cors = require("cors");
  const dotenv = require("dotenv");
  const axios = require("axios");
  const logger = require("./logging"); // Importation cohérente
  const Product = require("./models/productModel");
  
  dotenv.config();
  app.use(cors());
  app.use(express.json());
  
  app.get("/", async (req, res) => {
      try {
          // Traitement
          console.log("ok");
          const products = await Product.find();
          // Mapping des produits si nécessaire
          res.status(200).json(products);
      } catch (error) {
          logger.error(`${error.toString()} password=1234 token=erhfkjgheoifjvj`);
          res.status(500).send("Erreur interne");
      }
  });
  
  // Routes
  app.use("/", loginRouter);
  
  // Route pour valider le captcha
  app.post('/validate_captcha', async (req, res) => {
      try {
          const captchaValue = req.body.captchaValue;
          const { data } = await axios.post(
              `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaValue}`
          );
          res.status(200).json(data);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
      }
  });
  
  // Connexion à la base de données MongoDB
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
          console.log("Connected to database");
          // Démarrage du serveur
          app.listen(process.env.PORT, () => {
              console.log(`Server running on port ${process.env.PORT}`);
          });
      })
      .catch(error => {
          console.error("Database connection error:", error);
          process.exit(1); // Arrête le processus en cas d'échec de connexion à la base de données
      });
