import React, { Component } from 'react';
// import { SurveyCreator } from 'survey-creator-react';
import 'survey-creator-core/survey-creator-core.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

interface EditDataModalProps {
    surveyFormJson: any;
    surveyDataJson: any[];
    isModalOpen: boolean;
    onClose: () => void;
}

class EditDataModal extends Component<EditDataModalProps> {
    componentDidMount(): void {
        // TODO
    }

    render() {
        const { isModalOpen, surveyDataJson, surveyFormJson } = this.props;
        const survey = new Model(surveyFormJson);
        survey.data = surveyDataJson;
        
        return (
            <div className="container mt-4">
                <div className={`modal ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> Modifier la fiche </h5>
                                <button type="button" className="btn-close" onClick={this.props.onClose}></button>
                            </div>
                            <div className="modal-body">
                                <Survey model={survey} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpen && <div className="modal-backdrop fade show"></div>}
            </div>
        );
    }
};

export default EditDataModal;