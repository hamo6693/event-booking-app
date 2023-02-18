const Event = require("../models/event")
const Booking = require("../models/bookings")
const {transformEvent,transformBooking} = require("./transform")
const {UserInputError,AuthenticationError} = require("apollo-server-express")
const {combineResolvers} = require("graphql-resolvers")
const {isLoggedIn} = require("../middlewares/isLogin")

const bookingResolver = {
    Query:{
        //جلب جمبع الحجوزات
    bookings:combineResolvers(isLoggedIn, async(_,__,context) => {
        try{
            const bookings = await Booking.find({user: context.user._id}).populate("event").populate("user")
            return bookings.map(booking => transformBooking(booking))
        } catch(err) {
            throw err
        }
    })
},
    Mutation:{
        bookEvent:combineResolvers(isLoggedIn, async(_,args,context) => {
            const existingBooking = await Booking.find({event:args.eventId}).find({user: context.user})
            if(existingBooking.length > 0) {
                throw new AuthenticationError("لديك حجز مسبقا")
            } 
            const fetchedEvent = await Event.findOne({_id:args.eventId})
            const booking = new Booking({
                user: context.user._id,
                event:fetchedEvent
            })
            try{
                await booking.save()
                return transformBooking(booking)
            } catch(err) {
                throw err
            }
        }),
        cancelBooking:combineResolvers(isLoggedIn, async(_,args) => {
            try{
                const booking = await Booking.findById(args.bookingId).populate("event")
                const event = transformEvent(booking.event)
                await Booking.deleteOne({_id:args.bookingId})
                return event
            } catch(err) {
                throw err
            }
        }),
    }
}

module.exports = {bookingResolver}