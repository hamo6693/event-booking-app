import React, { useState } from "react";
import { BOOKINGS,CANCEL_BOOKING } from "../queries";
import Error from "../components/Error";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import BookingItem from "../components/Bookingitem";
import Spinner from "../components/Spinner";

export default function BookingsPage() {
    const [alert,setAlert] = useState("")
    const client = useApolloClient()
    function BookingsList() {
        const {loading,error,data} = useQuery(BOOKINGS)
        if(loading) {return <Spinner />}
        if(error) {
            setAlert(error.message)
            return
        }
        client.refetchQueries({
            include:["Bookings"]
        })
        return(
            <div>
                <Error error={alert} />
               <div className="row">
                <div>
                    {data.bookings.map(booking => (
                        <BookingItem
                        key={booking._id}
                        {...booking}
                        onCancelBooking={() => {
                            cancelBooking({variables:{bookingId:booking._id}})
                        }}
                        />
                    ))}
                </div>
               </div>
            </div>
        )
    }
    const [cancelBooking] = useMutation(CANCEL_BOOKING,{
        onError:(error) => setAlert(error.message),
        onCompleted:() => setAlert("تم العاء الحجز")
    })
    return(
        <BookingsList />
    )
}