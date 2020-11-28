const { Router } = require('express')
const Todo = require('../models/Todo')
const authMiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', authMiddleware, async (request, response) => {
  try {
    const { id, title } = request.body

    const existing = await Todo.findOne({ id })

    if (existing) {
      return response.json({ todo: existing })
    }

    const todo = new Todo({
      completed: false,
      id,
      title,
      owner: request.user.userId,
    })

    await todo.save()

    response.status(201).json({ todo })
  } catch (e) {
    response.status(400).json({
      message: 'Something went wrong, try to relogin',
    })
  }
})

router.post('/remove', authMiddleware, async (request, response) => {
  try {
    const { id } = request.body

    await Todo.findOneAndDelete({ id })

    response.status(200).send()
  } catch (e) {
    response.status(400).json({
      message: 'Something went wrong, try again',
    })
  }
})

router.post('/change', authMiddleware, async (request, response) => {
	try {
    const { id, isCompleted } = request.body

    await Todo.findOneAndUpdate(
      { id },
      { $set: { completed: !isCompleted } }
    )

    response.status(200).send()
	} catch (e) {
		response.status(400).json({
      message: 'Something went wrong, try again',
    })
	}
})

router.get('/', authMiddleware, async (request, response) => {
  try {
    const todos = await Todo.find({ owner: request.user.userId })

    response.json(todos)
  } catch (e) {
    response.status(500).json({
      message: 'Something went wrong, try again',
    })
  }
})

module.exports = router
