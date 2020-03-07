

//Schema
const Post = require('../models/Post')


//get router show post
 const getRouter = ('/', async (req,res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.json({message:err})
    }
})

//post router submit post
const postRouter = ('/', async (req,res) => {
    const post = new Post({
       
        title: req.body.title,
        email: req.body.email,
        description: req.body.description
    })


    try{
    const savedPost = await post.save()
    res.json(savedPost)
    }catch(err){
        res.json({message: err})
    }   
   
})

//Specific post
 
// const Specific = ('/', async (req,res) => {
//     try{
//         const post = await Post.findById(req.params.Id)
//         res.json(post)
//     }catch(err) {
//         res.json({message: err})
//     }
   
// })
const Specific = (req,res,next) => {
    let id = req.params.id
    
    Post.findById(id)
        .then(contact => {
            res.status(200).json({
                contact
            })
        })

        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error',
                error: err
            })
            
        })
   
}

//Delete
const deletePost = (req,res,next) => {
    let id = req.params.id

    Post.findByIdAndRemove(id)
        .then(result => {
            res.json({
                message: 'Contact Delete',
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error',
                error: err
            })
            
        })
}


const editPost = (req,res,next) => {
    let id = req.params.id

    let updateContact = {
        title: req.body.title,
        email: req.body.email,
        description: req.body.description
    }

    Post.findByIdAndUpdate(id, {$set: updateContact})
        .then(contact => {
           
            Post.findById(contact._id)
                .then(newContact => {
                    res.json({
                        message: 'updated Success',
                        contact
                    })
                })
           
           
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error',
                error: err
            })
            
        })
}



module.exports = {
    getRouter,
    postRouter,
    Specific,
    deletePost,
    editPost
    
}

// const express = require('express')
// const router = express.Router()
// //Schema
// const Post = require('../models/Post')


// //get router show post
// router.get('/', async (req,res) => {
//     try{
//         const posts = await Post.find()
//         res.json(posts)
//     }catch(err){
//         res.json({message:err})
//     }
// })

// //post router submit post
// router.post('/', async (req,res) => {
//     const post = new Post({
       
//         title: req.body.title,
//         email: req.body.email,
//         description: req.body.description
//     })


//     try{
//     const savedPost = await post.save()
//     res.json(savedPost)
//     }catch(err){
//         res.json({message: err})
//     }   
   
// })

// //Specific post
 
// router.get('/:postId', async (req,res) => {
//     try {
//         const post = await Post.findById(req.params.postId)
//         res.json(post)
//     } catch(err) {
//         res.json({message: err})
//     }
   
// })

// //Delete
// router.delete('/:postId', async (req,res) => {
//     try {
//         const removedPost = await Post.remove({ _id: req.params.postId })
//         res.json(removedPost)
//     } catch(err) {
//         res.json({message: err})
//     }
   
// })
// //Update
// router.patch('/:postId', async (req,res) => {
//     try {
//         const updatedPost = await Post.updateOne(
//             { _id: req.params.postId },
//             {$set: { title: req.body.title } }
//             )

//         res.json(updatedPost)

//     } catch(err) {
//         res.json({message: err})
//     }
   
// })

// module.exports = router