import React, { Component } from 'react';
import { Pagination } from '@mui/material';
import EditDataModal from '../edit_data.tsx'

interface ShowDataListState {
    show_type: string;
    currentPage: number;
    currentData: any[];
    isModalOpen: boolean;
    selectedRowData: any | null;
}

interface ShowDataListProps {
    data: any[];
    surveyForm: any;
}

const ITEMS_PER_PAGE = 5;

class ShowDataList extends Component<ShowDataListProps, ShowDataListState> {
    constructor(props: ShowDataListProps) {
        super(props);

        this.state = {
            show_type: 'table',
            currentPage: 1,
            currentData: [],
            isModalOpen: false,
            selectedRowData: null,
        };
    }

    componentDidMount(): void {
        const { data } = this.props;
        this.setState({ currentData: data });
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

    handleEditData = (data: any) => {
        this.setState({ isModalOpen: true, selectedRowData: data });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false, selectedRowData: null });
    };

    renderTableBody(paginatedData: { [key: string]: any }[]) {
        return (
            <tbody>
                {paginatedData.map((row, rowIndex) => (
                    <tr key={rowIndex} onClick={ e => this.handleEditData(row) }>
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
        const { currentData, currentPage, isModalOpen, selectedRowData } = this.state;
        const { surveyForm } = this.props;
        const paginatedData = this.getPaginatedData();
        // return <EditDataModal surveyFormJson={data} surveyDataJson={data} isModalOpen={true} />
        
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

                {isModalOpen && (
                    <EditDataModal
                        surveyFormJson={surveyForm}
                        surveyDataJson={selectedRowData}
                        isModalOpen={isModalOpen}
                        onClose={this.closeModal}
                    />
                )}
            </>
        );
    }
}
export default ShowDataList;