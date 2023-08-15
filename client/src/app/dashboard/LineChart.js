import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = () => {
    const [financials, setFinancials] = useState([]);

    // Fetch financial data from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3001/deptFinancial')
            .then(response => {
                const data = response.data;
                setFinancials(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Format a date to a short string format
    function formatDate(date) {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    // Map financial data to data points for proposal timeline
    const dataPointsProposal = financials.map(financial => ({
        y: [
            new Date(financial.TimeProposal[0]).getTime(),
            new Date(financial.TimeProposal[1]).getTime(),
        ],
        label: financial.Project,
    }));

    // Map financial data to data points for actual timeline
    const dataPointsActual = financials.map(financial => ({
        y: [
            new Date(financial.TimeActual[0]).getTime(),
            new Date(financial.TimeActual[1]).getTime()
        ],
        label: financial.Project,
    }));
    

    // Chart configuration options
    const options = {
        animationEnabled: true,
        backgroundColor: [
            'rgba(0, 0, 0, 0.2)',
        ],
        gridLines: {
            color: "rgba(204, 204, 204,0.1)"
        },
        title: {
            text: 'TimeLine',
            fontColor: 'white'
        },
        axisX: {
            title: 'Project',
            titleFontColor: 'white',
            gridLines: {
                color: "rgba(204, 204, 204,0.1)"
            },
            labelFontColor: 'white'
        },
        axisY: {
            title: 'Date Range',
            titleFontColor: 'white',
            gridLines: {
                color: "rgba(204, 204, 204,0.1)"
            },
            labelFontColor: 'white',
            labelFormatter: function (e) {
                const dateValue = new Date(e.value);
                const approximateStartDate = new Date(dateValue);

                approximateStartDate.setMonth(dateValue.getMonth() - 1);
    
                const approximateEndDate = new Date(dateValue);
                approximateEndDate.setMonth(dateValue.getMonth() + 1);
    
                return `${formatDate(approximateStartDate)} - ${formatDate(approximateEndDate)}`;
            },
        },

        toolTip: {
            shared: true,
            content: function (e) {
                const proposalPoint = e.entries[0].dataPoint;
                const actualPoint = e.entries[1].dataPoint;
                const project = financials.find(financial => financial.Project === proposalPoint.label);

                if (project) {
                    return `
                        <div>Project: ${project.Project}</div>
                        <div>Proposal Time: ${formatDate(new Date(project.TimeProposal[0]))} - ${formatDate(new Date(project.TimeProposal[1]))}</div>
                        <div>Actual Time: ${formatDate(new Date(actualPoint.y[0]))} - ${formatDate(new Date(actualPoint.y[1]))}</div>
                    `;
                } else {
                    return '';
                }
            },
        },

        legend: {
            fontColor: 'white',
        },

        data: [
            {
                type: 'rangeSplineArea',
                name: 'Proposal Time',
                showInLegend: true,
                dataPoints: dataPointsProposal,
            },
            {
                type: 'rangeSplineArea',
                name: 'Actual Time',
                showInLegend: true,
                dataPoints: dataPointsActual,
            },
        ],
    };

    // Render the LineChart component with the specified options
    return <CanvasJSChart options={options} />;
};

export default LineChart;
