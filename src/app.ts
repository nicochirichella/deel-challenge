import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getProfile } from "./middleware/getProfile";
import { sequelize } from "./models";
// import config from "./config";
// import routeExample from "./routes/route-example";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * FIX ME!
 * @returns contract by id
 */
 app.get('/contracts/:id',getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const contract = await Contract.findOne({where: {id}})
    if(!contract) return res.status(404).end()
    res.json(contract)
})
// app.use("/route-example", routeExample);

// app.listen(config.PORT, () => {
//   console.log(`Application is running on port ${config.PORT}.`);
// });

export default app;