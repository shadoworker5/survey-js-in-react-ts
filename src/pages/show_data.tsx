import React, { Component } from 'react';
import ShowDataList from './partials/data_table.tsx';
import ShowDataAnalytic from './partials/analytic.tsx';
import OpenStreetMap from './partials/map.tsx';
import surveyFormJson from './form.json';
import surveyFormData from './data.json';

interface ShowDataState {
    show_type: string;
    isLoaded: boolean;
}

class ShowData extends Component<{}, ShowDataState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            show_type: 'table',
            isLoaded: false
        };
    }

    handleOnChange = event => {
        this.setState({ show_type: event.target.value });
    }

    render() {
        const { show_type } = this.state;
        return (
            <div className="container mt-4">
                <div className="d-flex mb-3">
                    <select className="form-select form-select-md" onChange={e => this.handleOnChange(e)}>
                        <option value="table"> Liste des données </option>
                        <option value="analytic"> Tableau de bord </option>
                        <option value="map"> Carte </option>
                    </select>
                </div>

                <div className="card">
                    <div className="card-body">
                        { show_type === 'table' && <ShowDataList /> }
                        { show_type === 'analytic' && <ShowDataAnalytic surveyForm={surveyFormJson} surveyFormData={surveyFormData} /> }
                        { show_type === 'map' && <OpenStreetMap /> }
                    </div>
                </div>
            </div>
        );
    }
}
export default ShowData;