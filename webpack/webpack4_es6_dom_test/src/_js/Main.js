import Test from './Test';

class Main {
	constructor() {
		//querySelector
		let title = document.querySelector('.intro .title');
		console.log(title);

		//getElementsByClassName
		let menu = document.getElementsByClassName('menu')[0];
		console.log(menu);

		let menu2 = document.getElementsByClassName('menu2')[0];

		//-----------------------DOMの操作-----------------------
		//https://qiita.com/uhyo/items/1c565b61d934cbb88c2e
		//https://itstudio.co/2018/10/19/8141/
		//first
		let first = menu.firstChild; //liではなく、改行が入ってしまう
		console.log(first);

		//prepend:一番最初に代入
		var ele = document.createElement('li');
		ele.innerHTML = 'hoge';
		menu.prepend(ele);

		//before:要素の前に代入
		var ele2 = document.createElement('li');
		ele2.textContent = 'hogeの前';
		ele.before(ele2);

		//after:要素の後に代入
		var ele3 = document.createElement('li');
		ele3.textContent = 'hogeの後';
		ele.after(ele3);

		//replaceWith:差し替え
		var ele4 = document.createElement('li');
		ele4.textContent = 'hoge(差し替え)';
		ele.replaceWith(ele4);

		//append:一番最後に代入
		var ele = document.createElement('li');
		ele.innerHTML = 'fuga';
		menu.append(ele);

		//テキストの変更
		ele.textContent = 'fuga2';

		var ele = document.createElement('li');
		ele.innerHTML = '見出し1.5';
		menu.children[3].after(ele);

		//removeChild
		// menu.removeChild(btns[0]);
		// menu.removeChild(btns[0]);
		// menu.removeChild(btns[0]); //すでに0,1が削除されているので、btns[2]だとエラー

		//menuからmenu2に要素を移動
		let btns = menu.getElementsByTagName('li');
		let btn = menu.removeChild(btns[0]);
		menu2.appendChild(btn);

		//-----------------------mouse event-----------------------
		//getElementsByTagName
		for (var i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', this.btnClickHandler.bind(this));
		}

		//-----------------------fetch(api)テスト-----------------------
		var url =
			'http://geoapi.heartrails.com/api/json?method=searchByPostal&postal=' +
			encodeURI('1530063');
		this.apiGetTest(url);

		var fileField = document.querySelector("input[type='file']");
		fileField.addEventListener('change', this.changeFile.bind(this));
		document.test_form.btn.addEventListener(
			'click',
			this.submitForm.bind(this)
		);

		//1.1.1.1 -> 1[.]1[.]1[.]1
		var defangIPaddr = function(address) {
			return address.replace(/\./g, '[.]');
		};

		console.log(defangIPaddr('1.1.1.1'));

		//
		var numJewelsInStones = function(J, S) {
			var j = J.split('A').length - 1;
			var s = S.split('A').length - 1;
			return j + s;
		};
		console.log(numJewelsInStones('aA', 'aAAbbbb'));

		//
		var toLowerCase = function(str) {
			let lowerCase = '';

			for (let letter of str) {
				const index = letter.charCodeAt(0);
				if (index >= 65 && index <= 90) {
					console.log(index + ':' + letter);
					letter = String.fromCharCode(index + 32);
				}
				lowerCase += letter;
			}

			return lowerCase;
		};
		console.log(toLowerCase('aaBB'));

		//

		function Person() {
			console.log(1);
		}
		var person1 = Person();
		var person2 = new Person();
		console.log(person1);
		console.log(person2);

		//
		new Test();

		//
		Array.prototype.duplicate = function() {
			return this.concat(this);
		};
		console.log([1, 2, 3, 4, 5].duplicate());

		//
		let flag = true;
		let hoge = flag ? true : false;
		console.log(hoge);
	}

	//-----------------------------mosue event test-----------------------------
	btnClickHandler(e) {
		console.log(e.target);
	}

	//-----------------------------api test-----------------------------
	//https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
	apiGetTest(url) {
		fetch(url, {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(response) {
				console.log(response);
			});
	}

	apiPostTest(url, data) {
		fetch(url, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(response) {
				console.log(response);
			});
	}

	submitForm(e) {
		if (!document.test_form.name.value) {
			alert('名前が入力されていません');
			return;
		}
		if (!document.test_form.file.files[0]) {
			alert('ファイルが選択されていません');
			return;
		}
		this.apiPostFileTest();
	}

	changeFile(e) {
		console.log(e.target.files[0].name + 'を選択しました。');
	}

	apiPostFileTest() {
		var formData = new FormData();
		var file = document.test_form.file.files[0];
		formData.append('username', document.test_form.name.value);
		formData.append('avatar', file);

		fetch('https://example.com/profile/avatar', {
			method: 'POST',
			body: formData
		})
			.then(response => console.log('Success:', JSON.stringify(response)))
			.catch(error => console.error('Error:', error));
	}
}

document.addEventListener('DOMContentLoaded', function(event) {
	new Main();
});
