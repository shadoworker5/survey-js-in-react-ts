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
    componentDidMount() {
        const { surveyForm, surveyFormData } = this.props;
        const survey    = new Model(surveyForm);
        const vizPanel  = new Tabulator(survey, surveyFormData);
        vizPanel.render('show_dashboard');
    }
    render() {
        return (<div id="show_dashboard"></div>)
    }
}
export default TableShowData;