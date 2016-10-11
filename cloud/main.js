Parse.Cloud.define('hello', function(req, res) {
   console.log(req);
   res.success('yes');
});

Parse.Cloud.define('addNewUser', function(req, res) {

   console.log(req);
   var username = req.params.info.username;
   var password = req.params.info.password;
   //var email = req.body.email;
   //var phone = req.body.phone;
   //var lastname = req.body.lastname;
   //var firstname = req.body.firstname;

   var user = new Parse.User();
   user.set('username', username);
   user.set('password', password);
   //user.set('email', email);
   //user.set('phone', phone);

   user.signUp(null, {
      success: function success(user) {
         var Student = Parse.Object.extend('Student');
         var student = new Student();
         student.set('username', username);
         student.save(null, {
            success: function success(user) {
               res.success(user);
            },
            error: function error(user, err) {
               res.error(err);
            }
         });
      },
      error: function error(user, err) {
         res.error(err);
      }
   });


});

Parse.Cloud.define('activeExistedUser', function(req, res) {

});

Parse.Cloud.define(null, function(req, res) {
});

Parse.Cloud.define('userLogIn', function(req, res) {
   var username = req.params.info.username;
   var password = req.params.info.password;

   Parse.User.logIn(username, password, {
      success: function success(user) {
         res.success(user);
      },
      error: function error(user, err) {
         res.error(err);
      }
   });
});

Parse.Cloud.define('userLogOut', function(req, res) {
   var currentUser = Parse.User.current();
   if (currentUser) {
      Parse.User
          .logOut()
          .then(function () {
             currentUser = Parse.User.current();
             if (currentUser === null) {
                res.success('success');
             } else {
                res.send('fail');
             }
          });
   } else {
      res.error('fail');
   }

});

Parse.Cloud.define('findUserById', function(req, res) {

});