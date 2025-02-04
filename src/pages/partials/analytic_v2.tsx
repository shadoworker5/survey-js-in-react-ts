import React, { useState, useEffect, FC } from 'react';
import { Model } from 'survey-core';
import { VisualizationPanel, VisualizationManager, NpsVisualizer } from 'survey-analytics';
import 'survey-analytics/survey.analytics.min.css';
import 'survey-core/defaultV2.min.css';
import './textChartVisualizer.js';
import './pollVisualizer.js';

interface ShowDataAnalyticProps {
    surveyForm: any;
    surveyFormData: any[];
}

VisualizationManager.registerVisualizer('rating', NpsVisualizer);

const ShowDataAnalyticV2: FC<ShowDataAnalyticProps> = ({ surveyForm, surveyFormData }) => {
    const [filters, setFilters]             = useState<{ field: string; value: string }[]>([]);
    const [filteredData, setFilteredData]   = useState<any[]>(surveyFormData);
    const [variables, setVariables]         = useState<any[]>();
    const [formValue, setFormValue]         = useState<{ index: any; value: string[] }[]>([]);

    useEffect(() => {
        const survey        = new Model(surveyForm);
        const questionNames = survey.getAllQuestions().map(question => question.name);
        const vizPanel      = new VisualizationPanel(survey.getAllQuestions(), filteredData);
        vizPanel.render('analytics-table');
        setVariables(questionNames);

        return () => vizPanel.destroy();
    }, [filteredData, surveyForm]);

    const addFilter = () => {
        setFilters([...filters, { field: '', value: '' }]);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number, key: 'field' | 'value') => {
        let value = event.target.value;
        const updated_filters = [...filters];

        if (value === 'Veuillez choisir une variable') value = '';
        updated_filters[index][key] = value;
        setFilters(updated_filters);
        if (key === 'field') {
            getVariableValues(index, value);
        }
    };

    const getVariableValues = (key: number, field: string) => {
        let get_data = [...surveyFormData];
        let data: any[] = [];
        get_data.map((item, _) => {
            let result = item[field];
            if (typeof(result) === 'string') {
                data.push(result);
            } else {
                result = new Set(result);
                [...result].map((value, __) => data.push(value))
            }
        });
        let get_unique_value = new Set(data);
        setFormValue([...formValue, { index: key, value: [...get_unique_value] }]);
    };

    const applyFilters = () => {
        let updated_data = [...surveyFormData];
        filters.forEach((filter) => {
        if (filter.field && filter.value) {
            updated_data = updated_data.filter((item) => {
                return String(item[filter.field]).toLowerCase().includes(filter.value.toLowerCase());
            });
        }
        });
        setFilteredData(updated_data);
    };
    
    const resetFilters = () => {
        setFilters([]);
        setFormValue([]);
        setFilteredData([...surveyFormData]);
    };
    
    return (
        <div className="container mt-4">
            <div className="filters-section mb-4">
                {filters.map((filter, index) => (
                    <div className="row mb-2" key={index}>
                        <div className="col-md-5">
                            <select className="form-control" value={filter.field} onChange={e => handleOnChange(e, index, 'field')} >
                                <option key="key"> Veuillez choisir une variable </option>
                                {variables?.map((name, key) => (
                                    <option key={key} value={name}> {name} </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-5">
                            <select className="form-control" value={filter.value} onChange={e => handleOnChange(e, index, 'value')} >
                                <option key="key"> Veuillez choisir une valeur </option>
                                {formValue?.filter((__, i) => i == index ).map((name, item) => (
                                    name.value.map((value, j) => (
                                        <option key={++j} value={value}> {value} </option>
                                    ))
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-md-2">
                            <button
                                className="btn btn-danger"
                                onClick={() => setFilters(filters.filter((_, i) => i !== index))}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
                <button className="btn btn-primary" onClick={addFilter}>
                    Ajouter un filtre
                </button>
                {filters.length > 0 && (
                    <>
                        <button className="btn btn-danger ms-2" onClick={resetFilters}>
                            Supprimer tous les filtres
                        </button>
                        <button className="btn btn-success ms-2" onClick={applyFilters}>
                            Appliquer les filtres
                        </button>
                    </>
                )}
            </div>

            <div id="analytics-table"></div>
        </div>
    );
};
export default ShowDataAnalyticV2;