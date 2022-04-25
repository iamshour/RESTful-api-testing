import Message from "../models/message.js"
import { errorHandler } from "../utility/errorHandling.js"

export const getMsgs = async (req, res) => {
	try {
		const msgs = await Message.find()

		res.status(201).json(msgs)
	} catch (error) {
		errorHandler(res, error)
	}
}

export const addMsg = async (req, res) => {
	try {
		const newMsg = await Message.create({ content: req.body.content })
		res.status(201).json(newMsg)
	} catch (error) {
		errorHandler(res, error)
	}
}

export const updateMsg = async (req, res) => {
	try {
		await Message.findByIdAndUpdate(
			req.params.msgId,
			{ $set: req.body },
			{
				new: true,
			}
		)
		res.status(200).json("Message has been updated successfully!")
	} catch (error) {
		errorHandler(res, error)
	}
}

export const deleteMsg = async (req, res) => {
	try {
		let msg = await Message.findById(req.params.msgId)

		if (!msg)
			return res.status(404).json({
				msg: "msg Not Found",
			})

		await msg.remove()

		res.status(200).json("Msg has been deleted successfully!")
	} catch (err) {
		errorHandler(res, err)
	}
}
