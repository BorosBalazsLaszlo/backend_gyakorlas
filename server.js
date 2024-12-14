import fs from 'fs/promises';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import productRoutes from './routes/products.js';
import { DbInit } from './database.js';

const app = express();
const PORT = 3000;

async function startServer() {
  try {
    const swaggerFile = await fs.readFile(
      new URL("./swagger_output.json", import.meta.url),
      'utf-8'
    );
    let swaggerDocument;

    try {
      swaggerDocument = JSON.parse(swaggerFile);
    } catch (err) {
      throw new Error("Érvénytelen JSON a swagger outputban");
    }

    app.use(bodyParser.json());
    app.use(cors());
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use("/api", productRoutes);

    await DbInit();
    console.log("Adatbázis csatlakoztatva");
    app.listen(PORT, () => {
      console.log(`A szerver fut a localhost/${PORT}-on`);
    });
  } catch (err) {
    console.log("valami baj van cigany xd", err);
  }
}

startServer();