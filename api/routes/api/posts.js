const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../auth')
const post = mongoose.model('Post');             // switching between the two.

router.delete('/post/delete/:title', auth.optional, (req, res, next) => {
    if (req.params.title) {
        let title = req.params.title;
        let condition = {
            "title": title
        }
        console.log(title)
        console.log(condition)
        console.log(title)
        console.log(condition)
        console.log(title)
        console.log(condition)
        console.log(title)
        console.log(condition)
        console.log(title)
        console.log(condition)
        let finalPost = new post();
        post.findOneAndRemove(condition, function(err, result) {
            if(err) {
                return res.status(400).json({ "apiStatus": "failed", "msg":"Couldn't find the required document" });
            }
            return res.status(200).json({ "apiStatus": "Success", "msg": "Successfully Deleted"+JSON.stringify(result)});
        })
    }
    else {
        return res.status(400).json({ "apiStatus": "failed", "msg":"Unable to Delete." });
    }
});

router.post('/post/:uname', auth.optional, (req, res, next) => {
    if (req.body && req.params.uname) {
        let uname = req.params.uname;
        let postData = {
            user_name: uname,
            title: req.body.title ? req.body.title : 'EMPTY_TITLE',
            description: req.body.description,
            likes: req.body.likes ? req.body.likes : 0,
            timestamp: req.body.timestamp ? req.body.timestamp : Date.now
        }
        let finalPost = new post(postData);

        finalPost.save().then(() => {
            return res.status(200).json({ "apiStatus": "Success", "msg": "Successfully posted" });
        })
    }
    else {
        return res.status(400).json({ "apiStatus": "failed", "msg":"not Successfull in posting" });
    }
});

router.get('/posts', auth.optional, (req, res, next) => {
    post.find({}, function(err, postData) {
        if(err) {
            console.log(err, "Could not fetch alltransactions.")
            return res.status(400).json({ "apiStatus": "not Successfull in fetching all posts" });
        } else {
            console.log("All Posts count @ ",Date.now(),' is ', postData.length);
            return res.status(200).json({ "apiStatus": "Success", "data":postData, "msg": "Successfully posted" })
        }
    })
});

module.exports = router;