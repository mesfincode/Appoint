import cron from 'node-cron';
import { db } from '@/lib/db';
import { parseISO } from 'date-fns/fp';
import { format, addDays, startOfDay, endOfDay } from 'date-fns';
import { sendNextDayEmailAlert } from '@/lib/mail';

export async function GET(req: Request) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
    return Response.json({ error: "Unauthorized",}, { status: 401 })
  }

  cron.schedule('0 20 * * *',async () => {
    console.log('-----Running a task every minute'); //runs at 8:00 PM

    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStart = startOfDay(nextDay);
    const nextDayEnd = endOfDay(nextDay);

   db.appointment.findMany({
      where: {
        appointmentDate:{
          gte: nextDayStart,
          lt: nextDayEnd,
        },
      },
      include: {
        requestedFor: true,
        requestedBy:true

    }
    }).then((appointments)=>{
      console.log(appointments.length)
      for(let apointment of appointments){
        console.log(apointment.id)
        sendNextDayEmailAlert(apointment,`${apointment.requestedFor.firstName} ${apointment.requestedFor.lastName}`,apointment.requestedFor.email)
        sendNextDayEmailAlert(apointment,`${apointment.requestedBy.firstName} ${apointment.requestedBy.lastName}`,apointment.requestedBy.email)

      }

    });
  
    
    console.log('Running a task every day ended----->'); //runs every night

    // Add your cron job logic here
  });

  
  cron.schedule('0 7 * * *',async () => {
    console.log('-----Running a task every day'); // runs at 7:00 AM

    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStart = startOfDay(nextDay);
    const nextDayEnd = endOfDay(nextDay);

   db.appointment.findMany({
      where: {
        appointmentDate:{
          gte: nextDayStart,
          lt: nextDayEnd,
        },
      },
      include: {
        requestedFor: true,
        requestedBy:true

    }
    }).then((appointments)=>{
      console.log(appointments.length)
      for(let apointment of appointments){
        console.log(apointment.id)
        sendNextDayEmailAlert(apointment,`${apointment.requestedFor.firstName} ${apointment.requestedFor.lastName}`,apointment.requestedFor.email)
        sendNextDayEmailAlert(apointment,`${apointment.requestedBy.firstName} ${apointment.requestedBy.lastName}`,apointment.requestedBy.email)

      }

    });
  
    
    console.log('Running a task every day ended----->'); //runs every night

    // Add your cron job logic here
  });



  return Response.json({ success: "Job created successfully " }, { status: 200 })
}