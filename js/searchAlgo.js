function startSearchVisualization(searchType, arr, searchValue) {
	createSearchUI(searchType, arr, searchValue);
	searchValueInArray(searchType, searchValue);
}

async function searchElementUsingLinearSearch(searchType, spans, searchValue) {
	for (var i = 0, l = spans.length; i < l; i++) {
		addHighlight(spans[i].id);
		await sleep(500);

		if (spans[i].innerText === searchValue) {
			addElementFoundHighlight(spans[i].id);
			break;
		}

		await sleep(500);
		removeHighlight(spans[i].id);
	}

	displayResults(searchType);
}

async function searchElementUsingBinarySearch(searchType, spans, searchValue) {
	var lowIndex = 0;
	var highIndex = spans.length - 1;

    while (lowIndex <= highIndex) {
        var midIndex = Math.floor((lowIndex + highIndex) / 2);
        addHighlight(spans[midIndex].id);
        await sleep(1200);

		if (spans[midIndex].innerText === searchValue) {
			addElementFoundHighlight(spans[midIndex].id);
			break;
		} else if (spans[midIndex].innerText < searchValue) {
            for(index = lowIndex; index <= midIndex; index++) {
		        removeHighlight(spans[index].id);
            }

            lowIndex = midIndex + 1;
		} else if (spans[midIndex].innerText > searchValue) {
            for(index = highIndex; index >= midIndex; index--) {
		        removeHighlight(spans[index].id);
            }
            highIndex = midIndex - 1;
		}
	}

	displayResults(searchType);
}
