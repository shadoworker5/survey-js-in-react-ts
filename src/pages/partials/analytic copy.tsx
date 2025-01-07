import React, { Component } from 'react';
import { Model } from 'survey-core';
import { VisualizationPanel, VisualizationManager, NpsVisualizer } from 'survey-analytics';
import 'survey-analytics/survey.analytics.min.css';
import 'survey-core/defaultV2.min.css';
import surveyForm from '../form.json';
import surveyFormData from '../data.json';


interface ShowDataAnalyticState {
    show_type: string;
    isLoaded: boolean;
}

const surveyResults = [ {
        nom: "Jean Dupont",
        hobbies: ["Sport", "Lecture"],
        genre: "Homme",
        pays: "France",
        aime_survey: true,
        satisfaction: 5,
        feedback: "Super expérience avec SurveyJS !"
    }, {
        nom: "Marie Curie",
        hobbies: ["Voyages", "Jeux vidéo"],
        genre: "Femme",
        pays: "Pologne",
        aime_survey: false,
        satisfaction: 3,
        feedback: "Peut être amélioré."
    }, {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs."
    },
];

const surveyJson = {
    title: "Exemple de questionnaire",
    description: "Voici les résultats d'un questionnaire SurveyJS.",
    questions: [
        { type: "text", name: "nom", title: "Nom" },
        { type: "checkbox", name: "hobbies", title: "Loisirs" },
        { type: "radiogroup", name: "genre", title: "Genre" },
        { type: "dropdown", name: "pays", title: "Pays" },
        { type: "boolean", name: "aime_survey", title: "Aime SurveyJS ?" },
        { type: "rating", name: "satisfaction", title: "Satisfaction" },
        { type: "comment", name: "feedback", title: "Commentaires" },
    ]
};
  
class ShowDataAnalytic extends Component<{}, ShowDataAnalyticState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            show_type: 'table',
            isLoaded: true,
        };
    }

    componentDidMount(): void {
        const survey = new Model(surveyJson);
        const dataFromServer = surveyResults;
    }

    render() {
        const { isLoaded } = this.state;
        const mainStyle = !isLoaded ? { display: "none" } : {};

        // const creatorOptions = {
        //     haveCommercialLicense: true
        // };
        // const survey = new Model(surveyForm);
        // const visPanel = new VisualizationPanel(survey.getAllQuestions(), surveyFormData, creatorOptions);
        // visPanel.state = JSON.parse(JSON.stringify(surveyFormData));
        // visPanel.locale = 'fr';
        return (
            <>
                { isLoaded ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                        <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                    ) : (
                        <div id="show_dashboard">.</div>  
                    // <div ref={this.mainDiv} style={mainStyle} >
                    //     <div className="tabs">
                    //         {tabs}
                    //     </div>
                    //     <div className="tabcontent" ref={this.vizPanelContainer} ></div>
                    // </div>
                )}
            </>
        );
    }
}
export default ShowDataAnalytic;