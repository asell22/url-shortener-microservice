var express = require('express');
var app = express();
var urlsObj = {};
var count = 0;

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

app.get('/new/:url(*)', function(req, res, next) {
   var host = req.hostname;
   var url = req.params.url;
   urlsObj[count] = url;
   
   app.use(setRoutes);
   
    res.send({
       original_url: url,
       short_url: host + '/' + count,
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