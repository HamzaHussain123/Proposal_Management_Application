import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CreateForm from './CreateForm';
import ProposalTable from './PropsalTable';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const api = 'http://localhost:3001';

const App = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    getDeptFinancials();
  }, []);

  const getDeptFinancials = () => {
    Axios.get(`${api}/deptFinancial`)
      .then((res) => {
        setProposals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <CreateForm getDeptFinancials={getDeptFinancials} />
      <ProposalTable proposals={proposals} getDeptFinancials={getDeptFinancials} />
    </div>
  );
};

export default App;