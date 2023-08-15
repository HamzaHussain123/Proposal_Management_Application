import React, { useState } from 'react';
import Axios from 'axios';
import EditForm from './EditForm';

const ProposalTable = ({ proposals, getDeptFinancials }) => {
    const api = 'http://localhost:3001';
    const [editProposal, setEditProposal] = useState(null);

    const deleteProposal = (id) => {
        Axios.delete(`${api}/deleteProposal/${id}`)
            .then((res) => {
                console.log(res.data);
                getDeptFinancials();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateProposal = async (id) => {
        try {
            const res = await Axios.put(`${api}/updateProposal/${id}`, editProposal);
            console.log(res.data);
            setEditProposal(null);
            getDeptFinancials();
        } catch (err) {
            console.error(err);
        }
    };

    const generateCSV = () => {
        const headers = [
            'Projects',
            'Proposal',
            'Quotations',
            'SignOff',
            'Quoted',
            'Invoiced',
            'TimeProposal',
            'TimeActual',
            'Status',
        ];

        const csvRows = [
            headers.join(','), // Add the header row
            ...proposals.map((proposal) => {
                const row = [
                    proposal.Project,
                    proposal.Proposal,
                    proposal.Quotations,
                    proposal.SignOff,
                    proposal.Quoted,
                    proposal.Invoiced,
                    `${new Date(proposal.TimeProposal[0]).toISOString().slice(0, 10)} - ${new Date(
                        proposal.TimeProposal[1]
                    ).toISOString().slice(0, 10)}`,
                    `${new Date(proposal.TimeActual[0]).toISOString().slice(0, 10)} - ${new Date(
                        proposal.TimeActual[1]
                    ).toISOString().slice(0, 10)}`,
                    proposal.Status,
                ];
                return row.join(',');
            }),
        ];

        const csvString = csvRows.join('\n');

        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'proposals.csv';
        link.click();
    };

    const sortedProposals = [...proposals].sort((a, b) => a.Project.localeCompare(b.Project));

    const tableHeaders = (
        <thead>
            <tr>
                <th>Projects</th>
                <th>Proposal</th>
                <th>Quotations</th>
                <th>SignOff</th>
                <th>Quoted</th>
                <th>Invoiced</th>
                <th>TimeProposal</th>
                <th>TimeActual</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
    )

    return (
        <div>
            <div className="card">
                <h3 className="text-2xl">Manage Proposals</h3>
                <div className="table-responsive">
                    <table className="table">
                        {tableHeaders}
                        <tbody>
                            {sortedProposals.map((proposal) => (
                                <React.Fragment key={proposal._id}>
                                    <tr>
                                        <td>{proposal.Project}</td>
                                        <td>{proposal.Proposal}</td>
                                        <td>{proposal.Quotations}</td>
                                        <td>{proposal.SignOff}</td>
                                        <td>{proposal.Quoted}</td>
                                        <td>{proposal.Invoiced}</td>
                                        <td>
                                            {`${new Date(proposal.TimeProposal[0]).toISOString().slice(0, 10)} - ${new Date(
                                                proposal.TimeProposal[1]
                                            ).toISOString().slice(0, 10)}`}
                                        </td>
                                        <td>
                                            {`${new Date(proposal.TimeActual[0]).toISOString().slice(0, 10)} - ${new Date(
                                                proposal.TimeActual[1]
                                            ).toISOString().slice(0, 10)}`}
                                        </td>
                                        <td>{proposal.Status}</td>
                                        <td>
                                            <button onClick={() => setEditProposal(proposal)}>Edit</button>
                                            <button onClick={() => deleteProposal(proposal._id)}>Delete</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <button className="csv" onClick={generateCSV}>Export CSV</button>
                </div>
            </div>
            {editProposal && (<EditForm editProposal={editProposal} setEditProposal={setEditProposal} updateProposal={updateProposal} />)}
        </div>
    );
};

export default ProposalTable;