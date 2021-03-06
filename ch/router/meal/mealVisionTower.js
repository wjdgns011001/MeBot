/**
 * Created by chlee1001 on 2017-10-31.
 */
module.exports.visionTower = function (callback) {

	var request = require("request");
	require('date-utils');

	const token = 'cszpNImsBWU2aNpyPGAxQA10HBA5LbvcTH0cudcGD0yUMagTcR';
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD');
	console.log(today);
	var options = {
		url: 'https://bds.bablabs.com:443/openapi/v1/campuses/iaSfflZqCl/stores/MjEzMTc3NDg5?date=' + today,
		method: 'GET',
		headers: {
			'accesstoken': token,
			'babsession': 'meal'
		}
	};

	request.get(options, function (error, response, body) {
		//request 성공했으면..
		if (!error && response.statusCode == 200) {
			//json 파싱
			var objBody = JSON.parse(response.body);
			//필요한 부분만 추출
			var name = objBody.store.name;
			var menuDescription = objBody.store.menus[0].description;

			var menuName1 = objBody.store.menus[0].name;
			var menuDetail1 = objBody.store.menus[1].description;
			var menuName2 = objBody.store.menus[3].name;
			var menuDetail2 = objBody.store.menus[3].description;

			result = name + '\n' + menuDescription + '\n' + menuName1 + '\n' + menuDetail1 + '\n\n' + menuName2 + '\n' + menuDetail2;
			console.log(result);

			//console.log(name,'-', menuDescription);
			//	console.log(menuName1,'\n',menuDetail1,'\n');
			//	console.log(menuName2,'\n',menuDetail2);


			//카톡으로 번역된 메시지를 전송하기 위한 메시지
			let message = {
				"message": {
					"text": result
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"창조관",
						"아름관",
						"돌아가기"
					]
				}
			};
			//카톡에 메시지 전송
			return callback(message);
		}
	});
}