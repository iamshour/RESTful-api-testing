import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import connectDb from "./utility/connectDb.js"
import msgsRoute from "./routes/msgs.js"

const app = express()
const port = process.env.PORT || 5000

dotenv.config()

const corsOptions = {
	origin: "*",
	"Access-Control-Allow-Origin": true,
	optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(helmet())
connectDb()

app.use("/msgs", msgsRoute)

app.get("/", (req, res) => {
	res.send("Welcome to our RESTful API!")
})

app.use((req, res, next) => {
	const error = new Error("Something went wrong")
	error.status = 404
	next(error)
})
app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message,
		},
	})
})

app.listen(port, (err) => {
	if (err) throw new Error("Error while connecting to the server")
	console.log(`Server is live and running at: http://localhost:${port}`)
})

export default app
