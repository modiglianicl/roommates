import express from 'express';
import { router } from './routes/router.js';

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Routes
app.use('/', router)


app.listen(PORT, () => console.log(
    `Server UP on : http://localhost:${PORT}`));