import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Axios from 'axios';
import LineChart from './LineChart';

const api = 'http://localhost:3001';

const Dashboard = () => {

  // State variables for various data
  const [proposals, setProposals] = useState([]);
  const [startCount, setStart] = useState(0);
  const [onTrackCount, setOnTrackCount] = useState(0);
  const [collectionCount, setcollectionCount] = useState(0);
  const [invoicingCount, setInvoicingCount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [TotalQuoted, setTotalQuoted] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  // Fetch department financial data when component mounts
  useEffect(() => {
    getDeptFinancials();
  }, []);

  // Fetch department financial data from the server
  const getDeptFinancials = () => {
    Axios.get(`${api}/deptFinancial`)
      .then((res) => {
        setProposals(res.data);

        const startProposals = res.data.filter((proposal) => proposal.Status === "-");
        setStart(startProposals.length);

        const onTrackProposals = res.data.filter((proposal) => proposal.Status === "On Track");
        setOnTrackCount(onTrackProposals.length);

        const collectionProposals = res.data.filter((proposal) => proposal.Status === "Collection");
        setcollectionCount(collectionProposals.length);

        const invoicingProposals = res.data.filter((proposal) => proposal.Status === "Need Invoicing");
        setInvoicingCount(invoicingProposals.length);

        const paidProposals = res.data.filter((proposal) => proposal.Status === "Paid");
        setPaidCount(paidProposals.length);

        const overdueProposals = res.data.filter((proposal) => proposal.Status === "Overdue");
        setOverdueCount(overdueProposals.length);

        const quotedValues = res.data.map((proposal) => proposal.Quoted);
        const totalQuoted = quotedValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalQuoted(totalQuoted);

        const totalProjects = res.data.length;
        setTotalProjects(totalProjects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Calculate progress percentage based on start and end dates
  const calculateProgress = (startDate, endDate) => {

    const start = Math.floor(new Date(startDate) / (1000 * 60 * 60 * 24));
    const deadline = Math.floor(new Date(endDate) / (1000 * 60 * 60 * 24));

    const currentDate = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));

    if (currentDate > deadline) {
      return 100;
    } else if (currentDate < start) {
      return 0;
    } else {
      const elapsedDays = currentDate - start;
      const totalDays = deadline - start;
      const progress = (elapsedDays / totalDays) * 100;
      return progress;
    }
  };

  // Determine the color of the progress bar based on progress
  const calculateProgressColor = (progress) => {
    if (progress >= 90) {
      return 'danger';  
    } else if (progress >= 75) {
      return 'warning'; 
    } else {
      return 'success'; 
    }
  };

  // Sort proposals alphabetically by project name
  const sortedProposals = [...proposals].sort((a, b) => a.Project.localeCompare(b.Project));

  return (
    <div>
      {/* Display statistics for different proposal states */}
      <div className="row">
        <div className="col-xl-2 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h1 className="mb-0">{startCount}</h1>
                  </div>
                </div>
              </div>
              <h5 className="text-muted font-weight-normal">Not Start Yet</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h1 className="mb-0">{onTrackCount}</h1>
                  </div>
                </div>
              </div>
              <h5 className="text-muted font-weight-normal">On Track State</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h1 className="mb-0">{collectionCount}</h1>
                  </div>
                </div>
              </div>
              <h5 className="text-muted font-weight-normal">Collection State</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h1 className="mb-0">{invoicingCount}</h1>
                  </div>
                </div>
              </div>
              <h5 className="text-muted font-weight-normal">Need Invoicing State</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h1 className="mb-0">{paidCount}</h1>
                  </div>
                </div>
              </div>
              <h5 className="text-muted font-weight-normal">Paid State</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h1 className="mb-0">{overdueCount}</h1>
                  </div>
                </div>
              </div>
              <h5 className="text-muted font-weight-normal">Overdue State</h5>
            </div>
          </div>
        </div>
      </div>

       {/* Display total project count and quoted amount */}
      <div className="row">
        <div className="col-sm-5 grid-margin" >
          <div className="card" style={{ marginBottom: '20px' }} >
            <div className="card-body">
              <h5>Total Project</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">{totalProjects}</h2>
                  </div>
                  <h6 className="text-muted font-weight-normal">number of project</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="card" >
            <div className="card-body">
              <h5>Quoted</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">{TotalQuoted} SAR</h2>
                  </div>
                  <h6 className="text-muted font-weight-normal">of all projects</h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display line chart */}
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <LineChart />
            </div>
          </div>
        </div>

      {/* Display follow-up table */}
      </div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Follow-Up Table</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th> Id </th>
                    <th> Project name </th>
                    <th> Timeline </th>
                    <th> Amount </th>
                    <th> Propsal Time </th>
                    <th> Deadline </th>
                  </tr>
                </thead>
                {sortedProposals.map((proposal, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{proposal.Project} </td>
                      <td>
                        <ProgressBar
                          variant={
                            calculateProgressColor(calculateProgress(proposal.TimeProposal[0], proposal.TimeProposal[1]))
                          }
                          now={calculateProgress(proposal.TimeProposal[0], proposal.TimeProposal[1])}
                        />
                      </td>
                      <td>{proposal.Quoted} SAR</td>
                      <td>{new Date(proposal.TimeProposal[0]).toISOString().slice(0, 10)}</td>
                      <td>{new Date(proposal.TimeProposal[1]).toISOString().slice(0, 10)}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Display proposals status table */}
      <div className="row ">
      <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Propsals Status</h4>
              <div className="table-responsive">
                <table className="table">
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
                    </tr>
                  </thead>
                  {sortedProposals.map((proposal) => (
                    <tbody>
                      <tr>
                        <td>{proposal.Project}</td>
                        <td>{proposal.Proposal}</td>
                        <td>{proposal.Quotations}</td>
                        <td> {proposal.SignOff}</td>
                        <td> {proposal.Quoted}</td>
                        <td> {proposal.Invoiced}</td>
                        <td> {`${new Date(proposal.TimeProposal[0]).toISOString().slice(0, 10)} - ${new Date(
                          proposal.TimeProposal[1]
                        ).toISOString().slice(0, 10)}`}</td>
                        <td>
                          {`${new Date(proposal.TimeActual[0]).toISOString().slice(0, 10)} - ${new Date(
                            proposal.TimeActual[1]
                          ).toISOString().slice(0, 10)}`}
                        </td>
                        <td>
                          <div className={`badge ${proposal.Status === 'On Track' ? 'badge-outline-primary' : (proposal.Status === 'Collection' ? 'badge-outline-warning' : (proposal.Status === 'Need Invoicing' ? 'badge-outline-info' : (proposal.Status === 'Paid' ? 'badge-outline-success' : 'badge-outline-danger')))}`}>{proposal.Status}</div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Dashboard;