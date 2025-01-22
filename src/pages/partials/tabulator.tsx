import React, { Component } from 'react';
import { Model } from 'survey-core';
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'survey-analytics/survey.analytics.tabulator.css';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Tabulator } from 'survey-analytics/survey.analytics.tabulator';

window.jsPDF = jsPDF;
window.XLSX = XLSX;

interface TableShowDataProps {
    surveyForm: any;
    surveyFormData: any[];
}

class TableShowData extends Component<TableShowDataProps> {
    private vizPanel!: Tabulator;

    componentDidMount() {
        const { surveyForm, surveyFormData } = this.props;
        const survey = new Model(surveyForm);
        this.vizPanel = new Tabulator(survey, surveyFormData);
        this.vizPanel.render('show_dashboard');
    }

    exportToJson = () => {
        if (!this.vizPanel) return;

        const data = this.vizPanel.data;
        const jsonString = JSON.stringify(data, null, 2);

        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'exported_data.json';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    render() {
        return (
            <div>
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary" onClick={this.exportToJson}>
                        Exporter en JSON
                    </button>
                </div>
                <div id="show_dashboard"></div>
            </div>
        );
    }
}

export default TableShowData;
