const appointments = require('../models/appointments');
const slots = require('../models/slots');


exports.saveSlots = (req, res) => {
    var slot = new slots(req.body);
    slot.save().then(reg => {
        res.status(200).send({ status: 'success', resCode: 200, count: reg.length, data: reg });
    }).catch(function (error) {
        res.status(403).send({ status: 'error', resCode: 403, msg: 'Internal Server Error...!', data: error });
    });
}

exports.getSlots = (req, res) => {
    var slot = new slots(req.body);
    slots.find({}).then(reg => {
        res.status(200).send({ status: 'success', resCode: 200, count: reg.length, data: reg });
    }).catch(function (error) {
        res.status(403).send({ status: 'error', resCode: 403, msg: 'Internal Server Error...!', data: error });
    });
}

exports.getAllSlots = (req, res) => {
    const date = new Date(req.query.date).setHours(0, 0, 0, 0);
    slots.find({ date: date }).then(reg => {
        res.status(200).send({ status: 'success', resCode: 200, count: reg.length, data: reg });
    }).catch(function (error) {
        res.status(403).send({ status: 'error', resCode: 403, msg: 'Internal Server Error...!', data: error });
    });
}

exports.saveAppointments = async (req, res) => {
    let dateParts = req.body.date.split("/");
    req.body.date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    let datas = await appointments.find({ date: (req.body.date).setHours(0, 0, 0, 0) });
    let dupData = datas.filter(dep => dep.slotNo == req.body.slotNo);
    if (dupData.length == 0) {
        var appos = new appointments(req.body);
        appos.save().then(reg => {
            res.status(200).send({ status: 'success', resCode: 200, count: reg.length, data: reg });
        }).catch(function (error) {
            res.status(403).send({ status: 'error', resCode: 403, msg: 'Internal Server Error...!', data: error });
        });
    } else res.status(400).send({ status: 'already exists', resCode: 400, msg: 'The slot is already booked...!', data: null });
}

exports.getAppointments = (req, res) => {
    const date = new Date(req.query.date).setHours(0, 0, 0, 0);
    appointments.find({ date: date }).then(reg => {
        res.status(200).send({ status: 'success', resCode: 200, count: reg.length, data: reg });
    }).catch(function (error) {
        res.status(403).send({ status: 'error', resCode: 403, msg: 'Internal Server Error...!', data: error });
    });
}