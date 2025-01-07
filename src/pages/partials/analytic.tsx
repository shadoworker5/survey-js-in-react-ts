import React, { Component } from 'react';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import 'survey-analytics/survey.analytics.min.css';
import 'survey-core/defaultV2.min.css';

interface ShowDataAnalyticProps {
    surveyForm: any;
    surveyFormData: any[];
}

class ShowDataAnalytic extends Component<ShowDataAnalyticProps> {
    componentDidMount(): void {
        const { surveyForm, surveyFormData } = this.props;
        const survey    = new Model(surveyForm);
        const vizPanel  = new VisualizationPanel(survey.getAllQuestions(), surveyFormData);
        vizPanel.render('show_dashboard');
    }

    render() {
        return (<div id="show_dashboard"></div>)
    }
}
export default ShowDataAnalytic;