import { appointmentConfirmEmailString, html, nextDayEmailAlertString } from '@/components/EmailTemplate';
import { Appointment } from '@prisma/client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAppointmentEmail = async (email: string, appointmentId: string, senderName: string, receiverName: string,appointment:any) => {

  const { data, error } = await resend.emails.send({
    from: 'Appoint@appoint.victocode.com',
    to: email,
    subject: 'New Appointment',
    // html: `<p>${name} has sent you a new appointment. Click <a href="${appointmentLink}">here</a> to see the appointment !</p>`
    html: html({ senderName, receiverName, appointmentId,appointment })
  });
  if (error) {
    return console.error({ error });
  }

}

export const sendAppointmentConfirmedEmail = async (appointment: any) => {

  const { data, error } = await resend.emails.send({
    from: 'Appoint@appoint.victocode.com',
    to: appointment.requestedBy.email,
    subject: 'Appointment Confirmed',
    // html: `<p>${name} has sent you a new appointment. Click <a href="${appointmentLink}">here</a> to see the appointment !</p>`
    html: appointmentConfirmEmailString(appointment)
  });
  if (error) {
    return console.error({ error });
  }

}

export const sendNextDayEmailAlert = async (appointment: any,name:string,email:string) => {

  const { data, error } = await resend.emails.send({
    from: 'Appoint@appoint.victocode.com',
    to: email,
    subject: 'Appointment Alert',
    // html: `<p>${name} has sent you a new appointment. Click <a href="${appointmentLink}">here</a> to see the appointment !</p>`
    html: nextDayEmailAlertString(appointment,name)
  });
  if (error) {
    return console.error({ error });
  }

}