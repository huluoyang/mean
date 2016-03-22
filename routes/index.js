var express = require('express');
var router = express.Router();
var user = require('../database/db').user;

var checkin = require('../database/db').checkin;
var lucky = require('../database/db').lucky;

//设置跨域访问
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/* GET home page. */
router.get('/',function(req,res){
  res.render('index',{title:'Express'});
});
router.get('/ng-show',function(req,res){
  res.render('ng-show',{title:'ng-show'});
});
router.get('/reg',function(req,res){
  res.render('reg',{title:'reg'});
});
router.get('/ucenter',function(req,res){
  res.render('ucenter',{title:'用户中心'});
});

router.get('/cart',function(req,res){
  res.render('cart',{title:'cart'});
});
/*Get login page. */
router.get('/login',function(req,res){
	res.render('login',{title:'login'});
})
router.get('/profile',function(req,res){
	res.render('profile',{title:'profile'});
})
router.get('/bingo',function(req,res){
	res.render('bingo',{title:'bingo'});
})
router.get('/lucky',function(req,res){
	res.render('lucky');
})
router.get('/data-binding',function(req,res){
	res.render('data-binding');
})
router.get('/model',function(req,res){
	res.render('model');
})

router.route('/update').post(function(req,res){
	var query	= {username:req.body.username,password:req.body.password};
	user.update(query,{$set:{username:req.body.username,password:req.body.password}},false,true,function(err,doc){
		res.send(doc);
	})
})
/*Provide reg interface. */
router.route('/reg').post(function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var query	= {username:username};
	var kitty = new user({username:username,password:password});
	console.log(kitty);
	user.count(query,function(err,doc){
		if(doc ==0){
			console.log(username + ':注册成功' + password);
			kitty.save();
			res.send({status:200});
		}else{
			console.log(username + ':用户名已存在' + password);
			res.send({status:300});
		}
	})

})

/*Provide login interface. */
router.route('/login').post(function(req,res){
	var query	= {username:req.body.username,password:req.body.password};
	user.count(query,function(err,doc){
		if(doc>=1){
			console.log(query.username + ':登录成功' + query.password);
			res.render('ucenter',{username:query.username});
		}else{
			console.log(query.username + ':登录失败' + query.password);
			res.redirect('/');
		}
	})

})

/*Provide records interface.*/
router.route('/huxiaodong').post(function(req,res){
	var select = {username:req.body.username};
	console.log(select);
	checkin.find(select,function(err,doc){
		if(err){
			console.log('err:' + err);
		}
		console.log(doc);
		res.send(doc);
	})
})

router.route('/detail').get(function(req,res){
	lucky.find({},{department:true,name:true},function(err,doc){
		res.send(doc);
	})
})
router.route('/getName').post(function(req,res){
	lucky.find({},{name:true,"_id":false},function(err,doc){
		console.log(doc);
		res.send(doc);
	})
})

	function setCookie(){
		var obj = {};
		var arr = [];
		var url = document.cookie.split(';');
		for(var i = 0;i<url.length;i++){
			arr = url[i].split('=');
			obj[arr[0]]=arr[1];
		}
		return obj; 
	}




/*Get ucenter page. */
router.post('/ucenter',function(req,res){
	var query = {username:req.body.username,password:req.body.password};
	(function(query){
		user.count(query,function(err,doc){
			if(doc>=1){
				console.log(query.username + ':登录成功' + query.password);
				res.render('ucenter',{username:query.username});
			}else{
				console.log(query.username + ':登录失败' + query.password);
				res.redirect('/');
			}
		})
	})(query)
})

module.exports = router;
