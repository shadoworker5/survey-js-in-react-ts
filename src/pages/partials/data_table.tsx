import React, { Component } from 'react';
// import { Pagination } from '@mantine/core';

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
];

interface ShowDataListState {
    show_type: string;
    currentPage: number;
    pageCount: number;
    currentData: any[]
}

// interface ShowDataListProps {
//     data: any[];
// }

const ITEMS_PER_PAGE = 5;


class ShowDataList extends Component<{}, ShowDataListState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            show_type: 'table',
            currentPage: 0,
            pageCount: 0,
            currentData: []
        };
    }

    componentDidMount(): void {
        const { currentPage } = this.state;
        const offset = currentPage * ITEMS_PER_PAGE;
        const data = surveyFormData.slice(offset, offset + ITEMS_PER_PAGE);
        const count = Math.ceil(surveyFormData.length / ITEMS_PER_PAGE);
        this.setState({ currentData: data, pageCount: count });
    }

    handlePageChange = ({ selected }: { selected: number }) => {
        this.setState({ currentPage : selected });
    };

    render() {
        const { currentData, pageCount } = this.state;
        return (
            <>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                    <tr>
                        <th>Nom</th>
                        <th>Loisirs</th>
                        <th>Genre</th>
                        <th>Pays</th>
                        <th>Aime SurveyJS</th>
                        <th>Satisfaction</th>
                        <th>Commentaires</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((entry, index) => (
                        <tr key={index}>
                        <td>{entry.nom}</td>
                        <td>{entry.hobbies.join(", ")}</td>
                        <td>{entry.genre}</td>
                        <td>{entry.pays}</td>
                        <td>{entry.aime_survey ? "Oui" : "Non"}</td>
                        <td>{entry.satisfaction}</td>
                        <td>{entry.feedback}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* <Pagination
                    total={Math.ceil(data.length / itemsPerPage)}
                    page={activePage}
                    onChange={setActivePage}
                    mt="lg"
                /> */}
            </>
        );
    }
}
export default ShowDataList;