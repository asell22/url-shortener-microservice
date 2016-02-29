var express = require('express');
var app = express();
var urlsObj = {};
var count = 1;

app.use(express.static('public'));

app.get('/:url(*)', function(req, res) {
   var requestUrl = req.hostname;
   var url = req.params.url;
   urlsObj[count] = url;
   
   res.send({
       original_url: url,
       short_url: requestUrl + "/" + count
   });
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server running on ", process.env.PORT);
});