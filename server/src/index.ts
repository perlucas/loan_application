import express, { json } from 'express';
import cors from 'cors'
import router from './routes';

const app: express.Application = express();

const port: number = 3000;

const corsOptions = {
	origin: 'http://localhost:4000',
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(json())

app.use((req, _, next) => {
	console.log(`Received request to ${req.url}, body: ${JSON.stringify(req.body)}`)
	next()
})

app.use(router)

app.listen(port, () => {
	console.log(`App server running in http://localhost:${port}`)
});
