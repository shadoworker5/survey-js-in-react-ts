import React, { Component } from 'react';
import { Pagination } from '@mui/material';

const surveyFormData = [
    {
        nom: "Jean Dupont",
        hobbies: ["Sport", "Lecture"],
        genre: "Homme",
        pays: "France",
        aime_survey: true,
        satisfaction: 5,
        feedback: "Super expérience avec SurveyJS !",
    },
    {
        nom: "Marie Curie",
        hobbies: ["Voyages", "Jeux vidéo"],
        genre: "Femme",
        pays: "Pologne",
        aime_survey: false,
        satisfaction: 3,
        feedback: "Peut être amélioré.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
    {
        nom: "Albert Einstein",
        hobbies: ["Lecture", "Voyages"],
        genre: "Homme",
        pays: "Allemagne",
        aime_survey: true,
        satisfaction: 4,
        feedback: "Bonne expérience, mais quelques bugs.",
    },
];

interface ShowDataListState {
    show_type: string;
    currentPage: number;
    currentData: any[]
}

interface ShowDataListProps {
    data: any[];
}

const ITEMS_PER_PAGE = 5;

class ShowDataList extends Component<ShowDataListProps, ShowDataListState> {
    constructor(props: ShowDataListProps) {
        super(props);

        this.state = {
            show_type: 'table',
            currentPage: 1,
            currentData: []
        };
    }

    componentDidMount(): void {
        this.setState({ currentData: surveyFormData });
    }

    getPaginatedData() {
        const { data }          = this.props;
        const { currentPage }   = this.state;
        const start_index       = (currentPage - 1) * ITEMS_PER_PAGE;
        const end_index         = currentPage *  ITEMS_PER_PAGE;
        return data.slice(start_index, end_index);
    }

    handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        this.setState({ currentPage : value });
    };

    renderTableHeader() {
        const { data } = this.props;
        if (data.length === 0) return null;
        const keys = Object.keys(data[0]);
        return (
            <thead className="table-dark">
                <tr>
                    {
                        keys.map((key, index) => (
                            <th key={index}>{key}</th>
                        )
                    )}
                </tr>
            </thead>
        );
    }

    renderTableBody(paginatedData: { [key: string]: any }[]) {
        return (
            <tbody>
                {paginatedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>
                                {
                                    Array.isArray(value) ? (
                                        JSON.stringify(value)
                                    ) : typeof value === 'object' ? (
                                        JSON.stringify(value)
                                    ) : (
                                        value
                                    )
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }

    render() {
        const { currentData, currentPage } = this.state;
        const paginatedData = this.getPaginatedData();
        
        return (
            <>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        {this.renderTableHeader()}
                        {this.renderTableBody(paginatedData)}
                    </table>
                </div>

                <Pagination
                    count={Math.ceil(currentData.length / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={this.handlePageChange}
                    color="primary"
                    sx={{ mt: 2 }}
                />
            </>
        );
    }
}
export default ShowDataList;