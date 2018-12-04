const express = require('express');
const router = express.Router();
const passport = require('passport');


//Add route
router.get('/bestyrelse', function(req, res) {
    res.render('bestyrelse');
});

//Add Submit POST Route
router.post('/add', function(req, res){
    //Rules express-validatior
    req.checkBody('title', 'Title is required').notEmpty();
    //req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    //Get Errors
    let errors = req.validationErrors();
    if(errors){
        res.render('add_news', {
            title:'Add news',
            errors:errors
        });
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.user._id;
        article.body = req.body.body;

        article.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success','news Added')
                res.redirect('/');
            }
        });    
    }
});

//Load Edit form
router.get('/edit/:id', function(req, res){

      res.render('edit_news', {
          title:'Rediger news',
          article:article
      });
});
    

//Update Submit POST Route
router.post('/edit/:id', function(req, res){
    let article= {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}
  
    Article.update(query, article, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Updated')
            res.redirect('/');
        }
    })
  });

// Delete Article
router.delete('/:id', function(req, res){
    if(!req.user._id){
        res.status(500).send();
    }

    let query = {_id:req.params.id}

    Article.findById(req.params.id, function(err, article){
        if(article.author != req.user._id){
            res.status(500).send(); 
        } else {
            Article.remove(query, function(err){
                if(err){
                    console.log(err)
                }
                res.send('Success');
            });
        }
    });
});

// Get Single Article
router.get('/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        User.findById(article.author, function(err, user){
            res.render('article', {
                article:article,
                author: user.name   
        });
      
      });
    });
        
});


module.exports = router;