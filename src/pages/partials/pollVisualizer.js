import { SelectBase, VisualizationManager, localization } from 'survey-analytics';

function PollVisualizer(question, data, options) {
	function renderContent(contentContainer, visualizer) {
		visualizer.getAnswersData().then((vizData) => {
			const polls = vizData.datasets;
			const choices = vizData.labels;
			const percentages = vizData.texts;

			if (polls.length === 0 || polls[0].length === 0) {
				const emptyResultsHtml = `<p>` + localization.getString('noResults') + `</p>`;
				contentContainer.insertAdjacentHTML('beforeend', emptyResultsHtml);
				return;
			}

			polls.forEach((poll, idx) => {
				const tableNode = document.createElement('table');
				tableNode.classList.add('sa-poll-table');
				tableNode.style.backgroundColor = visualizer.backgroundColor;

				poll.forEach((voteCount, index) => {
					const textRow =
						`<tr>
							<td class="sa-poll-table__cell">` +
										choices[index] + " - " + percentages[idx][index] + "%" + " (" + voteCount + " votes)" + `
							</td>
						</tr>`;

					const graphRow =
						`<tr>
							<td class="sa-poll-table__cell" colspan="3">
							<div class="sa-poll-sparkline">
								<div class="sa-poll-sparkline-value" style="width:` + percentages[idx][index] + "%" + `"></div>
							</div>
							</td>
						</tr>`;

					tableNode.insertAdjacentHTML('beforeend', textRow);
					tableNode.insertAdjacentHTML('beforeend', graphRow);
				});
				contentContainer.appendChild(tableNode);
			});
		});
	};

	const visualizer = new SelectBase(
		question,
		data,
		{ renderContent: renderContent, dataProvider: options.dataProvider },
		'pollVisualizer'
	);
	visualizer.answersOrder = 'asc';
	visualizer.showPercentages = true;
	return visualizer;
}
VisualizationManager.registerVisualizer('radiogroup', PollVisualizer, 0);
localization.locales['en']['visualizer_pollVisualizer'] = 'Poll Visualizer';