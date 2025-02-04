import React, { useEffect, useState, useTransition } from 'react';
import ShowDataList from './partials/data_table.tsx';
import ShowDataAnalytic from './partials/analytic.tsx';
import ShowDataAnalyticV2 from './partials/analytic_v2.tsx';
import OpenStreetMap from './partials/map.tsx';
import TableShowData from './partials/tabulator.tsx';
import surveyFormJson from './form.json';
import surveyFormData from './data.json';
import { Model } from 'survey-core';
import Summary from './partials/summary.tsx';

const ShowData: React.FC = () => {
    const [showType, setShowType]               = useState('table');
    const [isPending, startTransition]          = useTransition();
    const [activeTab, setActiveTab]             = useState('home');
    const [countQuestions, setCountQuestions]   = useState(0);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        startTransition(() => {
            setShowType(selectedType);
        });
    };

    useEffect(() => {
        const survey = new Model(surveyFormJson);
        const allQuestions = survey.getAllQuestions();
        setCountQuestions(allQuestions.length);
    }, []);

    return (
        <>
            <title> Survey js data </title>
            <div className="container mt-4">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                            onClick={() => handleTabClick('home')}
                        >
                            Sommaire
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'data' ? 'active' : ''}`}
                            onClick={() => handleTabClick('data')}
                        >
                            Données
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                            onClick={() => handleTabClick('settings')}
                        >
                            Paramètres
                        </button>
                    </li>
                </ul>

                <div className="tab-content mt-3">
                    {activeTab === 'home' && (
                        <Summary countQuestion={countQuestions} />
                    )}
                    {activeTab === 'data' && (
                        <div className="tab-pane fade show active">
                            <div className="d-flex mb-3">
                                <select
                                    className="form-select form-select-md"
                                    onChange={handleOnChange}
                                    value={showType}
                                >
                                    <option value="table"> Liste des données </option>
                                    <option value="tabulator"> Vue Tabulaire </option>
                                    <option value="analytic"> Dashboard </option>
                                    <option value="analytic_v2"> Dashboard avec filtre </option>
                                    <option value="map"> Carte </option>
                                </select>
                            </div>

                            {isPending && (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '50px' }}>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Chargement...</span>
                                    </div>
                                </div>
                            )}
                            { !isPending && (
                                <div className="card">
                                    <div className="card-body">
                                        {showType === 'table' && <ShowDataList data={surveyFormData} surveyForm={surveyFormJson} />}
                                        {showType === 'tabulator' && (
                                            <TableShowData
                                                surveyForm={surveyFormJson}
                                                surveyFormData={surveyFormData}
                                            />
                                        )}
                                        {showType === 'analytic' && (
                                            <ShowDataAnalytic
                                                surveyForm={surveyFormJson}
                                                surveyFormData={surveyFormData}
                                            />
                                        )}
                                        {showType === 'analytic_v2' && (
                                            <ShowDataAnalyticV2
                                                surveyForm={surveyFormJson}
                                                surveyFormData={surveyFormData}
                                            />
                                        )}
                                        {showType === 'map' && <OpenStreetMap />}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div className="tab-pane fade show active">
                            <h4>Paramètres</h4>
                            <p>Voici le contenu de la page Paramètres.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShowData;