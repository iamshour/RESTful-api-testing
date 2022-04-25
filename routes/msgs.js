import express from "express"

const router = express.Router()

const msgs = [
	{
		id: "1",
		content: "Hey there my friends!",
	},
	{
		id: "2",
		content: "Hello hello hello!",
	},
	{
		id: "3",
		content: "I hope everything is great!",
	},
	{
		id: "4",
		content: "How are you today?",
	},
]

router.get("/", (req, res) => {
	res.send(msgs)
})

export default router
