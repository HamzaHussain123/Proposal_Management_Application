import React, { useState } from 'react';
import Axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const CreateForm = ({ getDeptFinancials }) => {
    
    const api = 'http://localhost:3001';

    const [Project, setProject] = useState('');
    const [Proposal, setProposal] = useState('');
    const [Quotations, setQuotations] = useState('');
    const [SignOff, setSignOff] = useState('');
    const [Quoted, setQuoted] = useState('');
    const [Invoiced, setInvoiced] = useState('');
    const [TimeProposal, setTimeProposal] = useState([null, new Date()]);
    const [TimeActual, setTimeActual] = useState([null, new Date()]);
    const [Status, setStatus] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isActualOpen, setIsActualOpen] = useState(false);

    const toggleTimeProposalCalendar = () => {
        setIsOpen(!isOpen);
    };

    const toggleTimeActualCalendar = () => {
        setIsActualOpen(!isActualOpen);
    };

    const handleTimeProposalChange = (ranges) => {
        setTimeProposal([ranges.selection.startDate,ranges.selection.endDate,]);
        setIsOpen(false);
    };

    const handleTimeActualChange = (ranges) => {
        setTimeActual([ ranges.selection.startDate,ranges.selection.endDate,]);
        setIsActualOpen(false);
    };

    const createProposal = () => {
        if (
            Project &&
            Proposal &&
            Quotations &&
            SignOff &&
            Quoted &&
            Invoiced &&
            TimeProposal &&
            TimeProposal[1] &&
            TimeActual &&
            TimeActual[1] &&
            Status
        ) {
            Axios.post(`${api}/createProposal`, {
                Project: Project,
                Proposal: Proposal,
                Quotations: Quotations,
                SignOff: SignOff,
                Quoted: Quoted,
                Invoiced: Invoiced,
                TimeProposal: [
                    TimeProposal[0]?.toString(),
                    TimeProposal[1]?.toString(),
                ],
                TimeActual: [
                    TimeActual[0]?.toString(),
                    TimeActual[1]?.toString()],
                Status: Status,
            })
                .then((res) => {
                    console.log(res.data);
                    getDeptFinancials();
                    setProject('');
                    setProposal('');
                    setQuotations('');
                    setSignOff('');
                    setQuoted('');
                    setInvoiced('');
                    setTimeProposal([null, new Date()]);
                    setTimeActual([null, new Date()]);
                    setStatus('')
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

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
    );

    return (
        <div>
            <div className="card">
                <h3 className="text-2xl">Create Proposal</h3>
                <div className="table-responsive">
                    <table className="table">
                        {tableHeaders}
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        onChange={(e) => setProject(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={Proposal}
                                        onChange={(e) => setProposal(e.target.value)}
                                    >
                                        <option value="-">-</option>
                                        <option value="Not Sent">Not Sent</option>
                                        <option value="Sent">Sent</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Declined">Declined</option>
                                        <option value="On Hold">On Hold</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={Quotations}
                                        onChange={(e) => setQuotations(e.target.value)}
                                    >
                                        <option value="-">-</option>
                                        <option value="Not Sent">Not Sent</option>
                                        <option value="Sent">Sent</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Declined">Declined</option>
                                        <option value="On Hold">On Hold</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={SignOff}
                                        onChange={(e) => setSignOff(e.target.value)}
                                    >
                                        <option value="-">-</option>
                                        <option value="Not Sent">Not Sent</option>
                                        <option value="Sent">Sent</option>
                                        <option value="Signed">Signed</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        placeholder="-"
                                        onChange={(e) => setQuoted(e.target.value)}
                                        defaultValue={'-'}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={Invoiced}
                                        onChange={(e) => setInvoiced(e.target.value)}>
                                        <option value="-">-</option>
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
                                    <div className="date-field">
                                        <input
                                            value={
                                                TimeProposal[0] && TimeProposal[1]
                                                    ? `${TimeProposal[0].toLocaleDateString()} - ${TimeProposal[1].toLocaleDateString()}`
                                                    : ''
                                            }
                                            onClick={toggleTimeProposalCalendar}
                                        />
                                        {isOpen && (
                                            <div className="calendar-container">
                                                <DateRange
                                                    onChange={handleTimeProposalChange}
                                                    ranges={[
                                                        {
                                                            startDate: TimeProposal[0],
                                                            endDate: TimeProposal[1],
                                                            key: 'selection',
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="date-field">
                                        <input
                                            value={
                                                TimeActual[0] && TimeActual[1]
                                                    ? `${TimeActual[0].toLocaleDateString()} - ${TimeActual[1].toLocaleDateString()}`
                                                    : ''
                                            }
                                            onClick={toggleTimeActualCalendar}
                                        />
                                        {isActualOpen && (
                                            <div className="calendar-container">
                                                <DateRange
                                                    onChange={handleTimeActualChange}
                                                    ranges={[
                                                        {
                                                            startDate: TimeActual[0],
                                                            endDate: TimeActual[1],
                                                            key: 'selection',
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <select
                                        value={Status}
                                        onChange={(e) => setStatus(e.target.value)}>
                                        <option value="-">-</option>
                                        <option value="On Track">On Track</option>
                                        <option value="Collection">Collection</option>
                                        <option value="Need Invoicing">Need Invoicing</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Overdue">Overdue</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={createProposal}>Create</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateForm;