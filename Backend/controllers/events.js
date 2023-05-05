const {response} = require('express');
const Event = require('../models/Event');


// Get all the Events
const getEvents = async(req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    })
}

// Create a new Event
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

// Update an Event
const updateEvent = async(req, res = response) => {

    const eventID = req.params.id;
    const uid = req.uid;
    
    try{
        const event = await Event.findById(eventID);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "No event found matching given the ID"
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "Don't have permission to modify this event"
            })
        }

        const newEvent = {...req.body, user: uid }

        const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, {new: true});

        res.json({
            ok: true,
            event: updatedEvent
        })
    }catch (e) {
        res.status(500).json({
            ok: false,
            msg: "An error occurred when updating event"
        })
    }
}

// Delete an Event
const deleteEvent = async(req, res = response) => {

    const eventID = req.params.id;
    const uid = req.uid;

    try{
        const event = await Event.findById(eventID);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: "No event found matching given the ID"
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "Don't have permission to delete this event"
            })
        }

        const deletedEvent = await Event.findByIdAndDelete(eventID, {new: true});

        res.json({
            ok: true,
            msg: `Successfully deleted event with ID: ${event.user.toString()}`
        })
    }catch (e) {
        res.status(500).json({
            ok: false,
            msg: "An error occurred when deleting event"
        })
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}