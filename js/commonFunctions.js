function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function createInfoUI(val) {
	var infoDiv = document.createElement('div');

	var elementDiv = document.createElement('span');
	elementDiv.innerHTML = val;

	infoDiv.className = 'info';
	infoDiv.appendChild(elementDiv);

	return infoDiv;
}

function createBoxUI(searchType, arr, searchValue) {
	var mainDiv = document.createElement('div');
	var algorithmInfoDiv = createInfoUI('Algorithm Type:' + searchType);
	var arrayInfoDiv = createInfoUI('Array: ');
	var searchValueInfoDiv = createInfoUI('Search Value: ' + searchValue);

	var arrayElementDiv = document.createElement('div');
	arrayElementDiv.setAttribute('id', 'search-array-elements');

	arr.forEach(function (val, index) {
		var elementDiv = document.createElement('span');
		elementDiv.setAttribute('id', index);
		elementDiv.innerHTML = val;
		elementDiv.className = 'boxed-element';
		arrayElementDiv.appendChild(elementDiv);

		if(index % 23 === 0 && index !== 0) {
			var lineBreak = document.createElement("BR");
			var lineBreak2 = document.createElement("BR");
			arrayElementDiv.appendChild(lineBreak);
			arrayElementDiv.appendChild(lineBreak2);
		}
	});

	mainDiv.appendChild(algorithmInfoDiv);
	mainDiv.appendChild(searchValueInfoDiv);
	mainDiv.appendChild(arrayInfoDiv);
	mainDiv.appendChild(arrayElementDiv);

	return mainDiv;
}

function createUI(searchType, arr, searchValue) {

	if (searchType === 'binary-search') {
		arr = arr.map(e => parseInt(e, 10)).sort((a,b) => a - b);
	}

	var UI = createBoxUI(searchType, arr, searchValue);
	var searchElement = document.getElementById(searchType);
	searchElement.appendChild(UI);
	searchElement.style.display = 'block';
}

function addHighlight(id) {
	document.getElementById(id).classList.add('boxed-element-highlight');
}

function removeHighlight(id) {
	document.getElementById(id).classList.remove('boxed-element-highlight');
	document.getElementById(id).classList.add('boxed-element-unfocus');
}

function addElementFoundHighlight(id) {
	document.getElementById(id).classList.remove('boxed-element-highlight');
	document.getElementById(id).classList.add('boxed-element-found');
}

async function searchValueInArray(searchType, searchValue) {
	var spans = document
		.getElementById('search-array-elements')
		.getElementsByTagName('span');

	if (searchType === 'linear-search') {
		searchElementUsingLinearSearch(searchType, spans, searchValue);
	} else if (searchType === 'binary-search') {
		searchElementUsingBinarySearch(searchType, spans, searchValue);
	}
}

function displayResults(searchType) {
	var foundElement = document.getElementsByClassName('boxed-element-found');
	var resultDiv = document.createElement('div');
	var resultInfoDiv;

	if (!foundElement.length) {
		resultInfoDiv = createInfoUI('No element matches search value in array.');
	} else {
		resultInfoDiv = createInfoUI(
			'The search value is found at index: ' + foundElement[0].id
		);
	}

	resultDiv.append(resultInfoDiv);

	var resetButton = document.createElement('button');
	resetButton.innerHTML = 'Reset Form';
	resetButton.onclick = toggleVisualizationUI;
	resetButton.className = 'btn btn-info';
	resultDiv.append(resetButton);

	var searchElement = document.getElementById(searchType);
	searchElement.appendChild(resultDiv);
}
