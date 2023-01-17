const express = require("express")
const bookmarks = express.Router()
const bookmarksArray = require('../models/bookmark.js')
const { validateURL } = require('../models/validations.js')


//GET ROUTE FOR /bookmarks (app.use in app.js handles the bookmarks)
bookmarks.get('/', (req, res) =>{
    res.json(bookmarksArray)
})

//bookmarks endpoint for POST
bookmarks.post("/",validateURL, (req, res)=>{
    bookmarksArray.push(req.body)
    res.json(bookmarksArray.at(-1))
})  //at -1 means end of array length - 1, so it will display the last element posted


//SHOW ROUTE
bookmarks.get('/:index', (req, res) =>{
    const {index} = req.params
    if(bookmarksArray[index]) {
       res.status(200).json(bookmarksArray[index])
    } else {
       res.status(404).json({error: "Not Found"})
    }
})

bookmarks.delete("/:index", (req,res) => {
 const deletedBookmark = bookmarksArray.splice (req.params.index, 1) 
 res.status(200).json(deletedBookmark) 
})


bookmarks.put("/:index", (req,res) => {
    if(bookmarksArray[req.params.index]) {
        bookmarksArray[req.params.index] =req.body
        res.status(200).json(bookmarksArray[req.params.index])
    } else {
        res.status(404).json({message: "Not Found"})
    }
   })

//same code as above with desconstructing
bookmarks.put("/:index", (req,res) => {
    const {index} = req.params
    if(bookmarksArray[index]) {
        bookmarksArray[index] =req.body
        res.status(200).json(bookmarksArray[index])
    } else {
        res.status(404).json({message: "Not Found"})
    }
   })

module.exports = bookmarks