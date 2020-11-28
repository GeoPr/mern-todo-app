require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/default')

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/todos', require('./routes/todo.routes'))

async function start() {
	try {
		await mongoose.connect(config.mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})

		app.listen(config.port, () => {
			console.log(`The app has been started on ${config.port} port`)
		})
	} catch (e) {
		console.log('server error', e.message)
		process.exit(1)
	}
}

start()
