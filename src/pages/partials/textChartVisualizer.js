import { SelectBasePlotly, VisualizationManager, localization } from 'survey-analytics';

function TextChartVisualizer(question, data, options) {
    const answers = [];

    const visualizer = new SelectBasePlotly(
        question,
        data,
        options,
        'textChartVisualizer'
    );
    visualizer.getCalculatedValuesCore = function () {
        const result = {};
        answers.length = 0;
        visualizer.surveyData.forEach(dataObj => {
            const answer = dataObj[visualizer.question.name];
            if (answer) {
                if (result[answer]) {
                    result[answer]++;
                } else {
                    result[answer] = 1;
                }
            }
        });

        answers.push.apply(answers, Object.keys(result));
        return [answers.map(answer => result[answer])];
    };
    visualizer.getValues = () => answers;
    visualizer.getLabels = () => answers;
    return visualizer;
}
VisualizationManager.registerVisualizer('text', TextChartVisualizer, 0);
localization.locales['en']['visualizer_textChartVisualizer'] = 'Chart';