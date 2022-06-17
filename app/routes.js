module.exports = function(app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('about.ejs');
  });



  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('signup');
  });


//GET REQUESTS
  //Home (index) page
  app.get('/index', function(req, res) {
    res.render('index.ejs');
  });

  //Affirmations
  app.get('/affirmations', function(req, res) {
    res.render('affirmations.ejs');
  });

  //Grattitude
  app.get('/gratitude', function(req, res) {
    res.render('gratitude.ejs');
  });

  //about
  app.get('/about', function(req, res) {
    res.render('about.ejs');
  });

  //meditation
  app.get('/meditation', function(req, res) {
    res.render('meditation.ejs');
  });

  //journal
  app.get('/journal', function(req, res) {
    res.render('journal.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs',{
      user: req.user
    })
  });


//POST REQUESTS

// affirmations
  app.post('/affirmations', (req, res) => {
    console.log(req.body.affirmString)
    console.log("testingggg")
    console.log(req.user.local.email)
    db.collection('affirmations').save({
      affirmString: req.body.affirmString,
      email: req.user.local.email
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
  })


  // Gratitude
  // app.post('/gratitude', (req, res) => {
  //   db.collection('gratitude').save({
  //       res.redirect('/profile')
  //     })
  //   })



    // app.put('/down', (req, res) => {
    //   db.collection('messages')
    //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //     $set: {
    //       thumbUp:req.body.thumbUp - 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })

    // app.delete('/messages', (req, res) => {
    //   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    //     if (err) return res.send(500, err)
    //     res.send('Message deleted!')
    //   })
    // })

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) don't touch this and sign up ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {
      res.render('login.ejs', {
        message: req.flash('loginMessage')
      });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function(req, res) {
      res.render('signup.ejs', {
        message: req.flash('signupMessage')
      });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/profile', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
      var user = req.user;
      user.local.email = undefined;
      user.local.password = undefined;
      user.save(function(err) {
        res.redirect('/profile');
      });
    });

  };

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/');
  }
