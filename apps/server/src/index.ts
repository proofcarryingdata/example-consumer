import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv"
import cors from "cors"

dotenv.config({ path: `${process.cwd()}/../../.env` })

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

// Middlewares.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Store a color on a NodeJS environment variable.
app.post('/color/set', (req: Request, res: Response) => {
  try {
    if (!req.body.color) {
      console.error(`[ERROR] No color specified!`)

      res.status(400).send()
    } else {
      // Set the color on NodeJS `COLOR` environment variable.
      process.env['COLOR'] = req.body.color;

      console.debug(`[OKAY] color has been set to ${process.env.COLOR}`)

      res.status(200).send()
    }
  } catch (error: any) {
    console.error(`[ERROR] ${error}`)
    res.send(500)
  }
});

// Get the color stored on the NodeJS environment variable.
app.get('/color/get', (req: Request, res: Response) => {
  try {
    if (!process.env.COLOR) {
      console.error(`[ERROR] No color has been saved yet!`)

      res.status(404).send()
    } else {
      console.debug(`[OKAY] color ${process.env.COLOR} has been successfully sent`)

      res.json({ color: process.env.COLOR }).status(200);
    }
  } catch (error: any) {
    console.error(`[ERROR] ${error}`)
    res.send(500)
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
