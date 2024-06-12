import { html } from '@/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAppointmentEmail = async (email:string,appointmentId:string,senderName:string, receiverName:string)=>{
    const appointmentLink = `http://localhost:3000/home/received-appointment/${appointmentId}`;

    const { data, error } = await resend.emails.send({
        from: 'noreplay@appoint.victocode.com',
        to: email,
        subject: 'New Appointment',
        // html: `<p>${name} has sent you a new appointment. Click <a href="${appointmentLink}">here</a> to see the appointment !</p>`
        html: html({senderName,receiverName,appointmentId,appointmentLink})
  });
    if (error) {
    return console.error({ error });
  }

  console.log({ data });
}