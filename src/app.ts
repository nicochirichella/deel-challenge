import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getProfile } from "./middleware/getProfile";
import sequelize from "./db/dbSetup";
import { associate } from "./db/models";
// import config from "./config";

// routes
import contracts from "./routes/contracts";
import jobs from "./routes/jobs";

const app = express();
associate();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use('/contracts', getProfile, contracts);
app.use('/jobs', getProfile, jobs);

export default app;