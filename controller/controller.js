const express = require('express')
const router = express.Router()
const controllerRouter = require('../routes/post')

router.get('/', controllerRouter.getRouter )
router.post('/', controllerRouter.postRouter)
router.get('/:id', controllerRouter.Specific)
router.delete('/:id', controllerRouter.deletePost)
router.patch('/:id', controllerRouter.editPost)


module.exports = router