const {response} = require('express');
const Event = require('../models/Event');



const getEvents = async(req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    })
}

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    try{

        event.user = req.uid;
        const savedEvent = await event.save()

        res.json({
            ok: true,
            event: savedEvent
        })

    }catch (e){
        res.status(500).json({
            ok: false,
            msg: "There was an error at creating event"
        })
    }

}

const updateEvent = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'Updating events'
    })
}

const deleteEvent = async(req, res = response) => {
    res.json({
        ok: true,
        msg: 'Deleting events'
    })
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}