var defaults = {
	selectedArrayType: 'number',
	inputArrayLength: 10,
	sortAlgos: ['selection', 'bubble'],
	searchAlgos: ['linear', 'binary'],
};

function updateSearchValueDisplay(select) {
	var selectedAlgo = select.options[select.selectedIndex].value;

	if (defaults.searchAlgos.includes(selectedAlgo)) {
		document.getElementById('bool-search-value').style.display = 'block';
	} else {
		document.getElementById('bool-search-value').style.display = 'none';
	}
}

function createArray() {
	var arrayType = document.getElementById('array-type');

	var selectedArrayType = arrayType.options[arrayType.selectedIndex].value;

	var inputArrayLength =
		parseInt(document.getElementById('input-array-length').value, 10) ||
		defaults.inputArrayLength;

	var createdArray = new Array(inputArrayLength);

	if (selectedArrayType === 'number') {
		createdArray.fill(0);
		createdArray = createdArray.map(createRandomNumber);
	} else {
		alert('No array type selected. Please select one and proceed.');
	}

	// add error handler here - if it is not defined

	/* Purposely not implemented - will add it in V2 stage
	else {
		createdArray.fill('');
		createdArray = createdArray.map(createRandomString);
	}
	*/

	document.getElementById('input-array').value = createdArray.toString();
}

function createRandomNumber() {
	var max = 100;
	var min = 1;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomString() {
	var max = 122;
	var min = 97;
	var maxStringLength = 5;
	var charArray = new Array(maxStringLength);

	charArray.fill('');
	charArray = charArray.map(() =>
		String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min)
	);

	return charArray.join('');
}

function deleteChild(id) {
	var e = document.getElementById(id);
	var child = e.lastElementChild;
	while (child) {
		e.removeChild(child);
		child = e.lastElementChild;
	}
}

function clearUI() {
	deleteChild('linear-search');
	deleteChild('binary-search');
	deleteChild('selection-sort');
	deleteChild('bubble-sort');
}

function resetUI() {
	document.getElementById('algorithm-type').selectedIndex = 0;
	document.getElementById('array-type').selectedIndex = 0;
	document.getElementById('input-array').value = '';
	document.getElementById('input-array-length').value = '';
	document.getElementById('search-value').value = '';
	updateSearchValueDisplay(document.getElementById('algorithm-type'));
}

function toggleUI() {
	resetUI();
	document.getElementById('main-form').style.display = 'block';
	document.getElementById('visualization-tab').style.display = 'none';
}

function startAlgorithmVisualization() {
	var select = document.getElementById('algorithm-type');
	var selectedAlgo = select.options[select.selectedIndex].value;
	var inputStringValue = document.getElementById('input-array').value;
	var inputArray = inputStringValue.split(',');
	var visualizationTab = document.getElementById('visualization-tab');
	var searchValue = document.getElementById('search-value').value;
	visualizationTab.style.display = 'block';
	// visualizationTab.scrollTo(1000, 0);

	clearUI();
	
	document.getElementById('main-form').style.display = 'none';

	if (selectedAlgo === 'linear') {
		startLinearSearchVisualization(inputArray, searchValue);
	} else if (selectedAlgo === 'binary') {
		startBinarySearchVisualization(inputArray, searchValue);
	} else if (selectedAlgo === 'bubble') {
		startBubbleSortVisualization(inputArray);
	} else if (selectedAlgo === 'selection') {
		startSelectionSortVisualization(inputArray);
	} else {
		alert('No algorithm selected. Please select one and proceed.');
	}
}
