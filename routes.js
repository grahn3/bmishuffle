module.exports = function Routes(app,_) {
	// Include query controller
	var sqlQuery = require("./controllers").sqlQuery;
	var pool = require("./controllers").pool;

	// Render complaint page
	app.get("/", function(req, res) {
		res.render("index", { title: "BMIShuffle" });
    });

	app.get("/validate", function(req, res) {
		var subject = req.query.subject;
		sqlQuery("SELECT gid FROM users AS users WHERE subject="+subject, function(result) {
			if ( result == undefined || null ) {
				res.render("index", { title: "BMIShuffle", error: "error" });
				return;
			}
			else if ( !result.length ) {
				res.render("index", { title: "BMIShuffle", error: "error" });
				return;
			}
			else if ( result !== null ) {
				res.render("player", { title: "BMIShuffle" });
			}
			group = result[0].gid
		});
	});

	app.post("/sfetch", function(req, res) {
		var uID = req.body.uID;
		sqlQuery("SELECT title,songs.id,format,source FROM songs INNER JOIN users ON songs.gid = users.gid WHERE users.subject="+uID, function(list) {
			// console.log(JSON.parse(JSON.stringify(list)));
			res.send(list);
		});
	});

	app.post('/sevent', function (req, res) {
	    var uID = req.body.uID,
			sID = req.body.sID,
	        date = req.body.date,
	        time = req.body.time;
	    if (!req.body) return res.sendStatus(400)
		pool.query("INSERT INTO sevents (uid,sid,date,time) VALUES ('"+uID+"','"+sID+"','"+date+"','"+time+"')", function(err, results) {
			// Error feedback here
			// console.log(results[0]);
		});
	});
	app.post('/qevent', function (req, res) {
	    var sID = req.body.sID;
	    if (!req.body) return res.sendStatus(400)
		pool.query("SELECT id,question,option1,option2 FROM questions WHERE sid="+sID, function(err, results) {
			qID = results[0].id,
			qText = results[0].question,
			opt1 = results[0].option1,
			opt2 = results[0].option2;
			res.send({id:qID, question:qText, option1:opt1, option2:opt2});
		});
	});
	app.post('/aevent', function (req, res) {
		var uID = req.body.uID,
			qID = req.body.qID,
			answer = req.body.answer;
	    if (!req.body) return res.sendStatus(400)
		pool.query("INSERT INTO qevents (uid,qid,input) VALUES ('"+uID+"','"+qID+"','"+answer+"')", function(err, results) {
			// Error feedback here
			// console.log(results[0]);
		});
	});
};
