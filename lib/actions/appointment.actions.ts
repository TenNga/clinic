'use server'

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config"
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        console.log("Database ID::: ",{DATABASE_ID, APPOINTMENT_COLLECTION_ID});
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        );

        return parseStringify(newAppointment)
    } catch (error) {
        console.log(error)
    }
};

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        );

        return parseStringify(appointment);
    } catch(error) {
        console.error(
            "An error occurred while retrieving the appointment details:",
            error
          );
    }
}

export const getRecentAppointmentList = async () => {
    try {
        const recentAppointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [
                Query.orderDesc('$createdAt')
            ]
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0
        }

        const counts = (recentAppointments.documents as Appointment[]).reduce((acc, apt) => {
            if(apt.status === 'scheduled'){
                acc.scheduledCount += 1;
            } else if(apt.status === 'pending'){
                acc.pendingCount += 1;
            } else if(apt.status === 'cancelled'){
                acc.cancelledCount += 1;
            } 

            return acc;
        },initialCounts)

        const data = {
            totalcount: recentAppointments.total,
            ...counts,
            documents: recentAppointments.documents
        }        

        return parseStringify(data);
    } catch (error) {
        console.log(error);
    }
}