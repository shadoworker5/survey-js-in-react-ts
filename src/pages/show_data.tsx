import React, { useState, useTransition } from 'react';
import ShowDataList from './partials/data_table.tsx';
import ShowDataAnalytic from './partials/analytic.tsx';
import OpenStreetMap from './partials/map.tsx';
import TableShowData from './partials/tabulator.tsx';
import surveyFormJson from './form.json';
import surveyFormData from './data.json';

const ShowData: React.FC = () => {
    const [showType, setShowType] = useState('table');
    const [isPending, startTransition] = useTransition();

    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        startTransition(() => {
            setShowType(selectedType);
        });
    };

    return (
        <div className="container mt-4">
            <div className="d-flex mb-3">
                <select
                    className="form-select form-select-md"
                    onChange={handleOnChange}
                    value={showType}
                >
                    <option value="table"> Liste des données </option>
                    <option value="tabulator"> Vue Tabulaire </option>
                    <option value="analytic"> Dashboard </option>
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
                        {showType === 'map' && <OpenStreetMap />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowData;