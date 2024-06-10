import express, {Request, Response} from 'express'
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

app.listen(6000, () => {
    console.log(`Server is running on http://localhost:6000`);
});