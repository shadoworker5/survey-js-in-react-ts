import { VisualizationManager, HistogramPlotly, GaugePlotly, PlotlySetup } from 'survey-analytics';

VisualizationManager.unregisterVisualizer('rating', HistogramPlotly);

function generateValues(maxValue, stepsCount) {
	const values = [];

	for (let i = 0; i < stepsCount; i++) {
		values.push(maxValue / stepsCount);
	}
	values.push(maxValue);

	return values;
}

function getData(visualizer, level, arrowColor) {
	const { question, name } = visualizer;
	const { rateMin, rateMax } = question;
	const stepsCount = GaugePlotly.stepsCount;
	const values = generateValues(rateMax, stepsCount);
	const text = ['Most likely', 'Likely', 'Neutral', 'Unlikely', 'Most unlikely'];
	const colors = visualizer.generateColors(rateMax, rateMin, stepsCount);

	return [
		{
			type: 'scatter',
			name: name,
			text: level,
			x: [0],
			y: [0],
			marker: {
				size: 20,
				color: arrowColor
			},
			showlegend: false,
			hoverinfo: 'text+name'
		}, {
			type: 'pie',
			values: values,
			rotation: 90,
			text: text,
			textinfo: 'text',
			textposition: 'inside',
			marker: {
				colors: colors
			},
			hole: 0.55,
			showlegend: false,
			hoverinfo: 'skip'
		}
	];
}

function getLayout(visualizer, level, arrowColor) {
	const maxValue = visualizer.question.rateMax;
	const degrees = maxValue - level;
	const radius = 0.5;
	const radians = (degrees * Math.PI) / maxValue;
	const x = radius * Math.cos(radians);
	const y = radius * Math.sin(radians);

	const mainPath = 'M -.0 -0.025 L .0 0.025 L ';
	const pathX = String(x);
	const space = ' ';
	const pathY = String(y);
	const pathEnd = ' Z';
	const path = mainPath.concat(pathX, space, pathY, pathEnd);

	const layout = {
		title: level,
		height: 600,
		width: 600,
		shapes: [{
			type: 'path',
			path: path,
			fillcolor: arrowColor,
			line: {
				color: arrowColor
			}
		}],
		plot_bgcolor: visualizer.backgroundColor,
		paper_bgcolor: visualizer.backgroundColor,

		xaxis: {
			zeroline: false,
			showticklabels: false,
			showgrid: false,
			range: [-1, 1]
		},

		yaxis: {
			zeroline: false,
			showticklabels: false,
			showgrid: false,
			range: [-1, 1]
		}
	};

	return layout;
}

PlotlySetup.onPlotCreating.add((visualizer, options) => {
	if (visualizer.chartType !== 'gauge')
		return;
	const arrowColor = '#4e6198';
	const level = options.data[0].value;
	options.data = getData(visualizer, level, arrowColor);
	options.layout = getLayout(visualizer, level, arrowColor);
});