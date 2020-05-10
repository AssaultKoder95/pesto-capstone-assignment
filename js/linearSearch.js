function createInfoUI(val) {
    var infoDiv = document.createElement('div');

    var elementDiv = document.createElement('span');
    elementDiv.innerHTML = val;

    infoDiv.className = 'info';
    infoDiv.appendChild(elementDiv);

    return infoDiv;
}

function createBoxUI(arr, searchValue) {
    var mainDiv = document.createElement('div');
    var algorithmInfoDiv = createInfoUI('Algorithm Type: Linear Search');
    var arrayInfoDiv = createInfoUI('Array: ');
    var searchValueInfoDiv = createInfoUI('Search Value: ' + searchValue);

    var arrayElementDiv = document.createElement('div');
    arrayElementDiv.setAttribute('id', 'search-array-elements');

    arr.forEach(function(val, index) {
        var elementDiv = document.createElement('span');
        elementDiv.setAttribute('id', index);
        elementDiv.innerHTML = val;
        elementDiv.className = 'boxed-element';
        arrayElementDiv.appendChild(elementDiv);
    });

    mainDiv.appendChild(algorithmInfoDiv);
    mainDiv.appendChild(searchValueInfoDiv);
    mainDiv.appendChild(arrayInfoDiv);
    mainDiv.appendChild(arrayElementDiv);

    return mainDiv;
}

function createUI(arr, searchValue) {
    var UI = createBoxUI(arr, searchValue);
    var linearSearchElement = document.getElementById('linear-search');
    linearSearchElement.appendChild(UI);
    linearSearchElement.style.display = 'block';
}

function addHighlight(id) {
    document.getElementById(id).className = 'boxed-element-highlight';
}

function removeHighlight(id) {
    document.getElementById(id).className = 'boxed-element';
}

function addElementFoundHighlight(id) {
    document.getElementById(id).className = 'boxed-element-found';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function searchValueInArray(searchValue) {
    var spans = document.getElementById('search-array-elements').getElementsByTagName('span');

    for(var i = 0, l = spans.length; i < l; i++){
        addHighlight(spans[i].id);        
        await sleep(500);
        if(spans[i].innerText === searchValue ) {
            addElementFoundHighlight(spans[i].id);
            break;
        }
        await sleep(500);
        removeHighlight(spans[i].id);
    }

    displayResults();
}

function displayResults() {
    var foundElement = document.getElementsByClassName('boxed-element-found');
    var resultDiv = document.createElement('div');
    var resultInfoDiv;

    if(!foundElement.length) {
        resultInfoDiv = createInfoUI('No element matches search value in array.');
    } else {
        resultInfoDiv = createInfoUI('The search value is found at index: ' + foundElement[0].id);
    }

    resultDiv.append(resultInfoDiv);

    var resetButton = document.createElement("BUTTON");
    resetButton.innerHTML = "Reset Form";
    resetButton.onclick = toggleUI;
    resetButton.className = 'btn btn-info';
    resultDiv.append(resetButton);

    var linearSearchElement = document.getElementById('linear-search');
    linearSearchElement.appendChild(resultDiv);
}

function startLinearSearchVisualization(arr, searchValue) {
    createUI(arr, searchValue);
    searchValueInArray(searchValue);
}