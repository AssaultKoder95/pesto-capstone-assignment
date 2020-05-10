function startSortVisualization(sortType, arr) {
	createSortUI(sortType, arr);
	sortValuesInArray(sortType);
}

function toInt(value) {
	return parseInt(value, 10);
}

async function sortElementsUsingBubbleSort(spans) {
	var containerDiv = document.getElementById('bubble-sort');
	var spanLength = spans.length;
	var iterationCount = 0;

	containerDiv.appendChild(createInfoUI('Is array sorted: false'));
	containerDiv.appendChild(createInfoUI('Iteration Count: ' + iterationCount));

	var swapped;
	do {
		swapped = false;
		
		containerDiv.removeChild(containerDiv.lastElementChild);
		iterationCount++;
		containerDiv.appendChild(createInfoUI('Iteration Count: ' + iterationCount));

		for (var index = 0; index < spanLength - 1; index++) {
			if (toInt(spans[index].innerText) > toInt(spans[index + 1].innerText)) {
				addSecondaryHighlight(spans[index].id);
				addSecondaryHighlight(spans[index + 1].id);

				await sleep(1200);

				var tmp = toInt(spans[index].innerText);
				spans[index].innerText = spans[index + 1].innerText;
				spans[index + 1].innerText = tmp;

				swapped = true;
			}

			await sleep(800);

			removeHighlight(spans[index].id);
			removeHighlight(spans[index + 1].id);
		}
	} while (swapped);
	
	containerDiv.removeChild(containerDiv.lastChild.previousElementSibling);
	containerDiv.appendChild(createInfoUI('Is array sorted: true'));
	addResetButtonDiv(containerDiv);
}

async function sortElementsUsingSelectionSort(spans) {
	var spanLength = spans.length;

	for (var index = 0; index < spanLength; index++) {
		addHighlight(spans[index].id);
		var minValue = toInt(spans[index].innerText);
		var minIndex = index;

		await sleep(1000);

		for (
			var secondaryIndex = index + 1;
			secondaryIndex < spanLength;
			secondaryIndex++
		) {
			if (minValue > toInt(spans[secondaryIndex].innerText)) {
				minValue = toInt(spans[secondaryIndex].innerText);
				minIndex = secondaryIndex;
			}
		}

		await sleep(1000);

		if (minValue !== toInt(spans[index].innerText)) {
			removeHighlight(spans[index].id);
			removeHighlight(spans[minIndex].id);

			addSecondaryHighlight(spans[index].id);
			addSecondaryHighlight(spans[minIndex].id);

			await sleep(1200);

			var tmp = toInt(spans[index].innerText);
			spans[index].innerText = spans[minIndex].innerText;
			spans[minIndex].innerText = tmp;
		}

		removeHighlight(spans[index].id);
		removeHighlight(spans[minIndex].id);
	}

	var containerDiv = document.getElementById('selection-sort');
	addResetButtonDiv(containerDiv);
}
