module.exports = function(app, passport, db) {
const ObjectId = require('mongodb').ObjectID
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


//GET REQUESTS===============================================================
  //Home (index) page
  app.get('/index', function(req, res) {
    res.render('index.ejs');
  });

  function getDateString(dateString) {
    const date = new Date(dateString);
    // Format date example: 6/22/2022
    const formattedDate = `${(date.getMonth()+1)}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  }

  //Affirmations
  app.get("/affirmations", function (req, res) {
    db.collection('affirmations')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        const updatedResult = result.map(data => {
          const id = ObjectId(data._id)
          let object = {
            _id: id,
            affirmDate: getDateString(data.affirmDate),
            affirmString: data.affirmString
          };
          return object;
        });
        res.render("affirmations.ejs", {
          user : req.user,
          affirmation: updatedResult,
        });
      });
  });

  //Grattitude
  app.get("/gratitude", function (req, res) {
    db.collection('gratitude')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        const updatedResult = result.map(data => {
          const id = ObjectId(data._id)
          let object = {
            _id: id,
            gratitudeDate: getDateString(data.gratitudeDate),
            gratitudeString: data.gratitudeString
          };
          return object;
        });
        res.render("gratitude.ejs", {
          user : req.user,
          gratitude: updatedResult,
        });
      });
  });

  //meditation
  app.get("/meditation", function (req, res) {
    db.collection('meditation')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        const updatedResult = result.map(data => {
          const id = ObjectId(data._id)
          let object = {
            _id: id,
            meditationTime: data.meditationTime,
            meditationDate: getDateString(data.meditationDate)
          };
          return object;
        });
        res.render("meditation.ejs", {
          user : req.user,
          meditationTime: updatedResult,
        });
      });
  });

  app.get("/meditationData", function (req, res) {
    db.collection('meditation')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.send({
          user : req.user,
          meditationTime: result,
        })
      });
  });

  //journal
  app.get("/journal", function (req, res) {
    db.collection('journal')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        const updatedResult = result.map(data => {
          const id = ObjectId(data._id)
          let object = {
            _id: id,
            journalDate: getDateString(data.journalDate),
            journalString: data.journalString
          };
          return object;
        });
        res.render("journal.ejs", {
          user : req.user,
          journal: updatedResult,
        });
      });
  });

  //about
  app.get('/about', function(req, res) {
    res.render('about.ejs');
  });


  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs',{
      user: req.user
    })
  });


//POST REQUESTS===========================================================

// affirmations
app.post('/affirmationsList', (req, res) => {
  const currentDate =  new Date()
  db.collection('affirmations').save(
    {
      affirmDate: currentDate,
      affirmString: req.body.affirmString
    },
    (err, result) => {
    if (err) return console.log(err)
     console.log('saved to database')
    res.redirect('/index')
  })
})

  // // Gratitude
  app.post('/gratitude', (req, res) => {
    const currentDate =  new Date()
    db.collection('gratitude').save({
      gratitudeDate: currentDate,
      gratitudeString: req.body.gratitudeString
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/index')
    })
  })

  // // Meditation
  function calculateMeditationTime(start, end) {
    let startTimeComponents = start.split(":");
    let endTimeComponents = end.split(":");
    let startDate = new Date(0, 0, 0, startTimeComponents[0], startTimeComponents[1], 0);
    let endDate = new Date(0, 0, 0, endTimeComponents[0], endTimeComponents[1], 0);
    let timeDifference = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(timeDifference / 1000 / 60 / 60);
    timeDifference -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(timeDifference / 1000 / 60);
    let hoursToMinutes = hours * 60;
    let totalTime = hoursToMinutes + minutes;
    return Math.abs(totalTime);
  }

  app.post('/meditation', (req, res) => {
    let startTime = req.body.meditationTime[0]
    let endTime = req.body.meditationTime[1]
    let meditationMinutes = calculateMeditationTime(startTime, endTime)
    const currentDate =  new Date()
    db.collection('meditation').save({
      meditationDate: currentDate,
      meditationTime: meditationMinutes
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/index')
    })
  })

  //journal
  app.post('/journal', (req, res) => {
    const currentDate =  new Date()
    db.collection('journal').save({
      journalDate: currentDate,
      journalString: req.body.journalString
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/index')
    })
  })


//DELETE REQUESTS ============================================================

// affirmations
    app.delete('/affirmations', (req, res) => {
      console.log({affirmationId: req.body.id})
      const id = ObjectId(req.body.id)
      console.log({trash: id})
      db.collection('affirmations').findOneAndDelete({_id: id}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Affirmation deleted!')
      })
    })

//Gratitude
    app.delete('/gratitude', (req, res) => {
      const id = ObjectId(req.body.id)
      db.collection('gratitude').findOneAndDelete({_id: id}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Gratitude deleted!')
      })
    })

//meditation
    app.delete('/meditation', (req, res) => {
      const id = ObjectId(req.body.id)
      db.collection('meditation').findOneAndDelete({_id: id}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('meditation deleted!')
      })
    })

//Journal
    app.delete('/journal', (req, res) => {
      const id = ObjectId(req.body.id)
      db.collection('journal').findOneAndDelete({_id: id}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Journal deleted!')
      })
    })


    // AUTHENTICATE (FIRST LOGIN) ==================================================
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
