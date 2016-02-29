var express = require('express');
var app = express();
var urlsObj = {};
var count = 1;

app.use(express.static('public'));



app.get('/new/:url(*)', function(req, res) {
   var requestUrl = req.hostname;
   var url = req.params.url;
   count += "";
   urlsObj[count] = url;
   
   for (var num in urlsObj) {
        console.log(urlsObj[num]);
    app.get('/' + num, function(req, res) {
        res.redirect(urlsObj[num]);
    });
}
   
   res.send({
       original_url: url,
       short_url: requestUrl + "/" + count,
       obj: urlsObj
   });
});




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server running on ", process.env.PORT);
});