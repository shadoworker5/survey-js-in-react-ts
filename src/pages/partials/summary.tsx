import React from 'react';

interface SummaryProps {
    countQuestion: number;
}

const Summary: React.FC<SummaryProps> = ({ countQuestion }) =>{
    return (
        <div className="tab-pane fade show active">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> Informations sur la fiche </h5>
                                <hr />
                                <p className="card-text" key={'01'}>
                                    <p key={'011'}> Statut : Publié</p>
                                    <p key={'012'}> Questions : {countQuestion} questions </p>
                                    <p key={'013'}> Propriétaire : Moi </p>
                                </p>
                                <hr />
                                <p className="card-text" key={'02'}>
                                    <p key={'021'}> Dernière modification : 20/01/2025 </p>
                                    <p key={'022'}> Dernier déploiement : 20/01/2025 </p>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> Soumissions </h5>
                                <hr />
                                <p className="card-text">
                                    <p key={1}> 7 derniers jours </p>
                                    <p key={2}> 31 derniers jours </p>
                                    <p key={3}> 3 derniers mois </p>
                                    <p key={4}> 6 derniers mois </p>
                                    <p key={5}> 12 derniers mois </p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Summary;