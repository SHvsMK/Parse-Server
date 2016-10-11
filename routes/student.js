var express = require('express');
var router = express.Router();

/**
 * GET /info Request
 * get the info of a student
 */
router.get('/info', function(req, res) {
    Parse.Cloud.run('findUserById', {info: req.body}, {
        success: function success(user) {
            res.json({code: 1, user: user});
        },
        error: function error(err) {
            res.json({code: 601, message: err.message});
        }
    });
});

/**
 * POST / request
 * add a new student
 */
router.post('/signup', function(req, res) {
    Parse.Cloud.run('addNewUser', {info: req.body}, {
        success: function success(user) {
            res.json({code: 1, user: user});
        },
        error: function error(err) {
            res.json({code: 602, message: err.message});
        }
    });
});

/**
 * POST /signin Request
 * sign in the student account
 */
router.post('/signin', function(req,res) {
    Parse.Cloud.run('userLogIn', {info: req.body}, {
        success: function success(user) {
            res.json({code: 1, user: user});
        },
        error: function error(err) {
            res.json({code: 603, message: err.message});
        }
    });
})

/**
 * POST /signout Request
 * sign out the student account
 */
router.post('/signout', function(req, res) {
    Parse.Cloud.run('userLogOut', {info: req.body}, {
        success: function success(suc) {
            res.json({code: 1, message: suc});
        },
        error: function error(err) {
            res.json({code: 604, message: err.message});
        }
    });
});

module.exports = router;