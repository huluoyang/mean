var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017/test';
var dataList = []
var globalCount = 0

MongoClient.connect(url, {
        server: {
            poolSize: 50
        }
    },function(err, db) {
      if(err) throw(err)
      console.time('insert,10w');  
      for(var i=0; i<100000; i++){
            db.collection('test3').insert({
                 count:i
            }, function(err, r) {
                if(err) throw(err)
                globalCount++
                if(globalCount>=100000){
                    console.timeEnd('insert,10w');
                    process.exit(1);
                }
          });  
    }  
});for(var i=0;i<1000000;i++){db.bench.insert({count:i})};Date()