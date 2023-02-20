import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { EVENTS,BOOK_EVENT } from "../queries";
import {NavLink} from "react-router-dom";
import EventItem from "../components/Eventitem";
import SimpleModel from "../components/SimpleModel";
import AuthContext from "../context/auth-context";


export default function EventsPage() {
    const [selectedEvent,setSelectedEvent] = useState(null)
    const value = useContext(AuthContext)


    function EventList() {

        const { loading,error,data } = useQuery(EVENTS)
        if(loading) return <p>Loading...</p>;
        if(error) return error.message;
        const showDetailHandler = eventId => {
            const clickedEvent = data.events.find(event => event._id === eventId)

            setSelectedEvent(clickedEvent)
    }
    return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                {data.events.map(event => (
                <EventItem 
                key={event._id}
                {...event}
                onDetail={showDetailHandler}
                />
                    ))}
                </div>
                
            </div>
           
        )
        
    }

    const [bookEventHandler , {loading,error,data}] = useMutation(BOOK_EVENT,{
        onError:(error) => {
            setSelectedEvent(null)
            console.log(error.message)

        },
        onCompleted:() => {
            setSelectedEvent(null)
            console.log("تم الحجز بنجاح")
        }
    })

    return(
        <div>
            {value.token && (
                <div className="events-control pt-2 text-center pb-3">
                    <h2>شارك مناسبتك الخاصة</h2>
                    <button className="btn">
                        انشاء مناسبة
                    </button>
                </div>
            )}
            <div>
                <h1 className="mb-3 text-center">المناسبات من حولك</h1>
            <EventList />
            </div>
            {selectedEvent && (
                    <SimpleModel
                    title="حجز مناسبة"
                    onCancel={() => {setSelectedEvent(null)}}
                    onConfirm={() => {bookEventHandler({variables:{eventId:selectedEvent._id } })} }
                    confirmText={value.token ? "احجز" : <NavLink to ="/login">سجل دخولك للحجز</NavLink>}
                    isDisabled={selectedEvent.creator._id === value.userId ? true : false}
                    >
                        <h4 className="mb-4">{selectedEvent.title}</h4>
                        <h4 className="mb-4">
                            ${selectedEvent.price} - {""}
                            {selectedEvent.date.split('.')[0]}
                        </h4>
                        <p>{selectedEvent.description}</p>
                        </SimpleModel>
                
            )}
        </div>
    )
}