const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
	completed: { type: Boolean, required: true },
	id: { type: Number, required: true, unique: true },
	title: { type: String, required: true },
	owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Todo', schema)