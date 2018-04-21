var express = require("express");
var bodyParser = require("body-parser");
var app = express();


module.exports = (app) => {

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/google/trans',function(req,res){
  
 var url = "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBmBNjnnHCRvNv8pdo_90qo5Fu-hjdIz8M";
     // request module is used to process the yql url and return the results in JSON format
     request(url, function(err, resp, body) {
       body = JSON.parse(body);
       // logic used to compare search results with the input from user
       if (!err) {
         console.log(err);
       } else {
        console.log(resp);
       }
     });
    
  
  
  
  
  
  
  
  
//     var user_name=req.body.user;
//   var password=req.body.password;
//   console.log("User name = "+user_name+", password is "+password);
//   res.end("yes");
// });
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})


}