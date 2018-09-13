var db = require('./db');

// find user, render their profile page
app.get('/users/:id', function(req, res, next) {
  db.findUserById(req.params.id, function(err, user) {
    if (err) return next(err);
    res.render('show_user.html', { user: user });
  });
});

// insert user
app.post('/users', function(req, res, next) {
  // TODO: ensure they submit a form to us with fields: username, password

  var data = {
    username: req.body.username,
    password: req.body.password
  };

  db.insertUser(data, function(err, user) {
    if (err) return next(err);
    // user was successfully created
    res.render('show_user.html', { user: user });
  });
});