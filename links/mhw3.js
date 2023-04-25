// JavaScript source code

function OnResponse(response) {
	console.log('Risposta ricevuta');
	return response.json();
	
}

function createImage(src) {
	const image = document.createElement('img');
	image.src = src;
	return image;
}

function onThumbnailClick(event) {
	const image = createImage(event.currentTarget.src);
	document.body.classList.add('no-scroll');
	

	modalView.style.top = window.pageYOffset + 'px';
	modalView.appendChild(image);
	modalView.classList.remove('hidden');
	
	
}


function FillSide(json) {
	const lateral = document.querySelector('#lateral');
	frase = document.createElement('div');
	frase.textContent = json[0].content + '(' + json[0].author + ')';
	console.log(json);
	lateral.appendChild(frase);
}


function Example() {
	lateral = document.querySelector('#lateral');
	if (lateral != null) {

		fetch('https://api.quotable.io/quotes/random').then(OnResponse).then(FillSide);
	}

}


function onModalClick() {
	document.body.classList.remove('no-scroll');
	modalView.classList.add('hidden');
	modalView.innerHTML = '';
	
	
}
function GetToken(json) {

	token = json.access_token;
	console.log(token);
}

function onClickChat() {
	
	chatc = document.createElement('p');
	chat_text = document.createElement('span');
	chat_text.textContent = 'Ciao, hai qualche suggerimento  per migliorare la pagina?'
	answer = document.createElement('textarea');
	
	
	chat.appendChild(chatc);
	chatc.appendChild(chat_text);
	chat_text.appendChild(answer);
	
	chat.removeEventListener('click',onClickChat);
	chat.addEventListener('click',OnCloseChat);

}

function OnCloseChat() {
	if (event.target != event.currentTarget) return;
	chat.removeChild(chat.lastChild);
	chat.addEventListener('click',onClickChat);
	chat.removeEventListener('click',OnCloseChat);

}

function OnJson(json) {

    const art = document.querySelector('article');
	art.innerHTML = '';
	if (json.results.length == 0) {

		const frase = document.createElement('div');
		frase.textContent = 'Nessun risultato trovato';
		art.appendChild(frase);
		return;
	}


	for (let i = 0; i < json.results.length ; i++){ 
	
	const frase = document.createElement('div');
	frase.textContent=json.results[i].content + '('+ json.results[i].author +')';
	
	art.appendChild(frase);
	const br = document.createElement('br');
    art.appendChild(br);
}

}

function OnGIFJson(json) {
	console.log(json);
	const art = document.querySelector('article');
	art.innerHTML = '';
	if (json.found == 0) {

		const frase = document.createElement('div');
		frase.textContent = 'Nessun risultato trovato';
		art.appendChild(frase);
		return;
	}



	for (let i = 0; i <json.gfycats.length; i++) {
		
		const gif = document.createElement('img');
		gif.src = json.gfycats[i].content_urls.max1mbGif.url;
		gif.addEventListener('click', onThumbnailClick);
		

		art.appendChild(gif);
		
	}


}

function onSubmit(event){
	const form = document.querySelector('#bar');
	
	const value = encodeURIComponent(form.value);
	event.preventDefault();

	const tipo = document.querySelector('#tipo').value;
	if (tipo === "frase") {

		event.preventDefault();
		fetch(api_url + value).then(OnResponse).then(OnJson);


	} else if (tipo === "gif") {

		console.log('Sto cercando' + gif_endpoint + value)
		fetch(gif_endpoint + value + '&count=10', {

			headers:
			{
				'Authorization': 'Bearer ' + token
			}


		}).then(OnResponse).then(OnGIFJson);

	}
	const lat = document.querySelector('#lateral');
	lat.classList.add('hidden');

}



function onTokenResponse(response) {
	return response.json();
}

const form= document.querySelector('form');
form.addEventListener('submit', onSubmit);
const chat = document.querySelector('#chat')
chat.addEventListener('click', onClickChat)
const modalView = document.querySelector('#modal-view');
if(modalView!=null)
	modalView.addEventListener('click', onModalClick);
Example();
Example();

const api_url = " https://api.quotable.io/search/quotes" + '?query=' ;
const gif_url = 'https://api.gfycat.com/v1/oauth/token'
const gif_endpoint = 'https://api.gfycat.com/v1/gfycats/search?search_text='
const client_id_giphy = '2_wKQy0g'
const secret_giphy = 'UuyeVKJlKLSnBLqFhXKdwrpPJCoNx1ty2pKwrgD6FvRTfMYwdJz6jiX_XHJdEvHK'
let token;

fetch(gif_url, {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body:
		JSON.stringify({
		grant_type: "client_credentials",
		client_id: client_id_giphy,
		client_secret: secret_giphy
	})
	
	

}).then(onTokenResponse).then(GetToken);





