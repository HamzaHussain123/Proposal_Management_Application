import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const EditForm = ({ editProposal, setEditProposal, updateProposal }) => {

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
        <div className="card">
            <h3 className="text-2xl">Edit Proposal</h3>
            <div className="table-responsive">
                <table className="table">
                    {tableHeaders}
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    value={editProposal.Project}
                                    onChange={(e) => setEditProposal({ ...editProposal, Project: e.target.value })}
                                />
                            </td>
                            <td>
                                <select value={editProposal.Proposal} onChange={e => setEditProposal({ ...editProposal, Proposal: e.target.value })}>
                                    <option value="-">-</option>
                                    <option value="Not Sent">Not Sent</option>
                                    <option value="Sent">Sent</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Declined">Declined</option>
                                    <option value="On Hold">On Hold</option>
                                </select>
                            </td>
                            <td>
                                <select value={editProposal.Quotations} onChange={e => setEditProposal({ ...editProposal, Quotations: e.target.value })}>
                                    <option value="-">-</option>
                                    <option value="Not Sent">Not Sent</option>
                                    <option value="Sent">Sent</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Declined">Declined</option>
                                    <option value="On Hold">On Hold</option>
                                </select>
                            </td>
                            <td>
                                <select value={editProposal.SignOff} onChange={e => setEditProposal({ ...editProposal, SignOff: e.target.value })}>
                                    <option value="-">-</option>
                                    <option value="Not Sent">Not Sent</option>
                                    <option value="Sent">Sent</option>
                                    <option value="Signed">Signed</option>
                                </select>
                            </td>
                            <td>
                                <input type="text" value={editProposal.Quoted} onChange={e => setEditProposal({ ...editProposal, Quoted: e.target.value })} />
                            </td>
                            <td>
                                <select value={editProposal.Invoiced} onChange={e => setEditProposal({ ...editProposal, Invoiced: e.target.value })}>
                                    <option value="Invoiced to Finance Dep. ">Invoiced to Finance Dep. </option>
                                    <option value="Invoiced">Invoiced</option>
                                    <option value="Invoiced (Annual)">Invoiced (Annual)</option>
                                    <option value="Paid">Paid</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Declined ">Declined</option>
                                    <option value="1st 25% invoiced">1st 25% invoiced</option>
                                    <option value="1st 25% Paid">1st 25% Paid</option>
                                    <option value="1st 50% invoiced">1st 50% invoiced</option>
                                    <option value="1st 50% Paid">1st 50% Paid</option>
                                    <option value="2nd 50% invoiced">2nd 50% invoiced</option>
                                    <option value="2nd 50% Paid">2nd 50% Paid</option>
                                    <option value="Invoice Canceled">Invoice Canceled</option>
                                </select>
                            </td>
                            <td>
                            <DatePicker
                                    selected={editProposal.TimeProposal && editProposal.TimeProposal[0] ? new Date(editProposal.TimeProposal[0]) : null}
                                    onChange={dates => setEditProposal({ ...editProposal, TimeProposal: [dates[0], dates[1]] })}
                                    selectsRange
                                    startDate={editProposal.TimeProposal && editProposal.TimeProposal[0] ? new Date(editProposal.TimeProposal[0]) : null}
                                    endDate={editProposal.TimeProposal && editProposal.TimeProposal[1] ? new Date(editProposal.TimeProposal[1]) : null}
                                    placeholderText="Select date range"
                                />
                            </td>
                            <td>
                                <DatePicker
                                    selected={editProposal.TimeActual && editProposal.TimeActual[0] ? new Date(editProposal.TimeActual[0]) : null}
                                    onChange={dates => setEditProposal({ ...editProposal, TimeActual: [dates[0], dates[1]] })}
                                    selectsRange
                                    startDate={editProposal.TimeActual && editProposal.TimeActual[0] ? new Date(editProposal.TimeActual[0]) : null}
                                    endDate={editProposal.TimeActual && editProposal.TimeActual[1] ? new Date(editProposal.TimeActual[1]) : null}
                                    placeholderText="Select date range"
                                />
                            </td>
                            <td>
                                <select value={editProposal.Status} onChange={e => setEditProposal({ ...editProposal, Status: e.target.value })}>
                                    <option value="-">-</option>
                                    <option value="On Track">On Track</option>
                                    <option value="Collection">Collection</option>
                                    <option value="Need Invoicing">Need Invoicing</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Overdue">Overdue</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => updateProposal(editProposal._id)}>Save</button>
                                <button onClick={() => setEditProposal(null)}>Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                </div>
            </div>
        </div>
    );
};
export default EditForm;