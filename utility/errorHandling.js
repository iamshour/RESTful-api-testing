export const errorHandler = (res, error) => {
	res.status(500).json({
		msg: error,
	})
}
