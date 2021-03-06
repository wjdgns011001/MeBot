/**
 * Created by chlee1001 on 2017-10-17.
 */
module.exports = function (app, fs) {
	// User Modules
	var main = require('./functions/main'); // 메인화면으로..

	// 키보드
	app.get('/keyboard', function (req, res) {
		fs.readFile(__dirname + "/../data/" + "keyboard.json", 'utf8', function (err, data) {
			console.log(data);
			res.end(data);
		});
	});

	// 메시지
	app.post('/message', function (req, res) {
		const _obj = {
			user_key: req.body.user_key,
			type: req.body.type,
			content: req.body.content
		};
		console.log(_obj.content)

		if (_obj.content == '시작하기') {
			let message = {
				"message": {
					"text": '안녕 나는 미봇이야'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"학식",
						"번역기",
						"시간",
						"사진",
						"돌아가기"
					]
				}
			};

			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == "학식") {
			let message = {
				"message": {
					"text": '식당을 골라주세요! (컴온)'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"비전타워",
						"창조관",
						"아름관",
						"돌아가기"
					]
				}
			};
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
		} else if (_obj.content == "비전타워") {
			var result = '';
			var meal = require('./meal/mealVisionTower');
			meal.visionTower(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == "창조관") {
			var result = '';
			var meal = require('./meal/test');
			meal.test(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == "돌아가기") {
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(main()));

		} else if (_obj.content == "시간") {
			var time = require('./time')();

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(time));

		} else if (_obj.content == '/취소') {
			flag = 0;

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(main()));
		} else if (_obj.content == '번역기') {
			let massage = {
				"message": {
					"text": "안녕 나는 미봇번역기야! 사용방법 !말, (돌아갈려면 '/취소')"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(massage));

		} else if (_obj.content.indexOf('!') > -1) {
			var result;
			var content = _obj.content;
			var translate = require('./functions/translate');
			translate.papago(content, function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})
		} else if (_obj.content == '사용방법') {
			let message = {
				"message": {
					"text": "나는 미봇.. 도움말은 준비중",
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/MeBot/img/tmp.jpg',
						"width": 640,
						"height": 640
					}
				},

				"keyboard": {
					"type": "buttons",
					"buttons": [
						"시작하기",
						"사용방법",
						"문의하기"
					]
				}
			};
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
		} else if (_obj.content == '문의하기') {
			var qna = require('./qna')();

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(qna));
		}

	});

	app.post('/friend', (req, res) => {
		const user_key = req.body.user_key;
		console.log(`${user_key}님이 채팅방에 참가했습니다.`);

		res.set({
			'content-type': 'application/json'
		}).send(JSON.stringify({
				success: true
			}));
	});

	app.delete ('/chat_room/:user_key', (req, res) => {
		user_key = req.params.user_key;
		console.log(`${user_key}님이 채팅방에서 나갔습니다.`);

		res.set({
			'content-type': 'application/json'
		}).send(JSON.stringify({
				success: true
			}));
	});
}