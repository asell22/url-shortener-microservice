var express = require('express');
var app = express();
var urlModule = require('url');
var urlsObj = {};
var count = 0;
var keys = [];

app.use(express.static('public'));

// Middleware for checking to see if url is in urlsObj

// Middleware to validate url
var setRoutes = function(req, res, next) {
    
    for (var num in urlsObj) {
        console.log(urlsObj[num]);
        app.get('/' + num, function(req, res) {
            res.redirect(urlsObj[num])
        });
    }
    next();
}

app.use(setRoutes);

app.get('/:num', function(req, res) {
    var num = req.params.num;
    console.log(keys);
    if (keys.indexOf(num * 1) === -1) {
        res.status('404').send({error: "No such url exists"})
    } else {
        res.redirect(urlsObj[num]);
    }
});



app.get('/new/:url(*)', function(req, res, next) {
   var host = req.hostname;
   var url = req.params.url;
   
 
   urlsObj[count] = url;
   keys.push(count);
   
   var short_url = req.protocol + "://" + host + '/' + count;
 
   res.send({
       original_url: url,
       short_url: short_url,
       obj: urlsObj
    });
    
    next();
});

var incrementCount = function(req, res, next) {
    count += 1;
    next();
}

app.use(incrementCount);



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server running on ", process.env.PORT);
});