/* CREATE SERVER */
const express = require("express");
const app = express();
const csv = require('csv-stringify')
const cors = require("cors");
app.use(cors())
app.use(express.json())
const _port = process.env.PORT;

/* CONNECT TO DB */


const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Mongo_DB");

}).catch((err) => {
    console.log(err);

})
/* IMPORT DeptFinancials MODEL */
const DeptFinancialsModel = require('./models/DeptFinancials');

/**
 * Get all proposals records from the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @throws {Error} If there is an error querying the database.
 */
app.get("/deptFinancial", async (req, res) => {
    try {
        const deptFinancials = await DeptFinancialsModel.find();
        res.json(deptFinancials);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving department financial records" });
    }
});

/**
 * Create a new proposal and save it to the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @throws {Error} If there is an error saving the proposal to the database.
 */
app.post("/createProposal", async (req, res) => {
    try {
        const newProposal = new DeptFinancialsModel(req.body);
        await newProposal.save();
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ error: "Error creating department financial proposal" });
    }
});

/**
 * Delete a proposal from the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @throws {Error} If there is an error deleting the proposal from the database.
 */
app.delete("/deleteProposal/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedProposal = await DeptFinancialsModel.findByIdAndDelete(id);
        if (!deletedProposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        res.json({ message: "Deleted successfully", deletedProposal });
    } catch (error) {
        res.status(500).json({ error: "Error deleting department financial proposal" });
    }
});

/**
 * Update a proposal in the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @throws {Error} If there is an error updating the proposal in the database.
 */
app.put("/updateProposal/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { Project, Proposal, Quotations, SignOff, Quoted, Invoiced, TimeProposal, TimeActual, Status } = req.body;
        const updatedProposal = await DeptFinancialsModel.findByIdAndUpdate(id, {
            Project, Proposal, Quotations, SignOff, Quoted, Invoiced, TimeProposal, TimeActual, Status
        }, { new: true });
        res.json(updatedProposal);
    } catch (error) {
        res.status(500).json({ error: "Error updating department financial proposal" });
    }
});

/**
 * Export proposals records as a CSV file.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @throws {Error} If there is an error exporting the CSV data.
 */
app.get('/proposals.csv', (req, res) => {
    DeptFinancialsModel.find({}, (err, proposals) => {
        if (err) {
            res.send(err)
        } else {
            let data = proposals.map(proposal => [
                proposal.Project, proposal.Proposal, proposal.Quotations, proposal.SignOff,
                proposal.Quoted, proposal.Invoiced, proposal.TimeProposal, proposal.TimeActual, proposal.Status
            ]);
            data.unshift(['Project', 'Proposal', 'Quotations', 'SignOff', 'Quoted', 'Invoiced', 'TimeProposal', 'TimeActual', 'Status']);
            csv.stringify(data, function (err, csvString) {
                res.setHeader('Content-Type', 'csv');
                res.setHeader('Content-Disposition', 'attachment; filename=proposals.csv');
                res.send(csvString)
            });
        }
    })
});

/**
 * Start the server and listen for incoming requests.
 */
app.listen(_port, () => {
    console.log(`Server is runnnig on port ${_port}`);

})