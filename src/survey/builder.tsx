import React, { Component } from 'react';
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react';
import { surveyLocalization, StylesManager } from 'survey-core';
import { editorLocalization } from 'survey-creator-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'survey-core/defaultV2.min.css';
import 'survey-creator-core/survey-creator-core.css';

class SurveyrBuilder extends Component {
    render() {
        const creatorOptions = {
            showLogicTab: true,
            isAutoSave: false,
            showTranslationTab: true,
            haveCommercialLicense: false,
        };
        const creator = new SurveyCreator(creatorOptions);

        surveyLocalization.supportedLocales = ['en', 'fr'];
        editorLocalization.currentLocale = 'fr';
        StylesManager.applyTheme('defaultV2');

        return (
            <div className="container mt-4">
                <div className="card">
                    <div className="card-body">
                        <SurveyCreatorComponent creator={creator} />
                    </div>
                </div>
            </div>
        );
    }
}
export default SurveyrBuilder;