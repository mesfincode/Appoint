
import {
    render,
    Tailwind,
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";

  interface EmailTemplateProps {
    senderName: string;
    receiverName:string;
    appointmentId:string;
    appointment:any

  }
  
const Email = ({
    senderName,receiverName,appointmentId,appointment
  }: EmailTemplateProps) => {
    const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : "";
    return (
        <Html>
        <Head />
        <Preview>
          The appointment app 
        </Preview>
        <Body style={main}>
          <Container style={container}>
            {/* <Img
              src={`https://appoint.victocode.com/_next/image?url=%2Fimages%2Flogo-image.png&w=96&q=75`}
              width="170"
              height="50"
              alt="Koala"
              style={logo}
            /> */}
            <Text style={paragraph}>Hi {receiverName},</Text>
            <Text style={paragraph}>
             {senderName} has sent you a new Appointment
            </Text>
            <Text style={paragraph}>
             Appointment Type: {appointment.appointmentType} 
            </Text>
            <Text style={paragraph}>
             Reason: {appointment.reason} 
            </Text>
           
            <Text style={paragraph}>
             Description: {appointment.notes} 
            </Text>
            <Section style={btnContainer}>
              <Button style={button} href={`${baseUrl}/home/received-appointment`}>
                See appointment
              </Button>
            </Section>
            <Text style={paragraph}>
              Best,
              <br />
             The Appoint Team
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Addis Ababa Ethiopia
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  const AppointmentConfirmedEmail = ({appointment}:{appointment:any}) => {
    const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : "";
    return (
        <Html>
        <Head />
        <Preview>
          The appointment app 
        </Preview>
        <Body style={main}>
          <Container style={container}>
            {/* <Img
              src={`https://appoint.victocode.com/_next/image?url=%2Fimages%2Flogo-image.png&w=96&q=75`}
              width="170"
              height="50"
              alt="Koala"
              style={logo}
            /> */}
            <Text style={paragraph}>Hi {appointment.requestedBy.name},</Text>
            <Text style={paragraph}>
             {appointment.requestedFor.name} has Confirmed the appointment request
            </Text>
            <Text style={paragraph}>
             Appointment Type: {appointment.appointmentType} 
            </Text>
            <Text style={paragraph}>
             Reason: {appointment.reason} 
            </Text>
           
            <Text style={paragraph}>
             Description: {appointment.notes} 
            </Text>
            <Section style={btnContainer}>
              <Button style={button} href={`${baseUrl}/home/requested-appointment`}>
                See appointment
              </Button>
            </Section>
            <Text style={paragraph}>
              Best,
              <br />
             The Appoint Team
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Addis Ababa Ethiopia
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };

  export const html = ({
    senderName,receiverName,appointmentId,appointment
  }: EmailTemplateProps)=>{
    return render(<Email appointment={appointment} senderName={senderName} receiverName={receiverName} appointmentId={appointmentId} />,{pretty:true})
  }

  export const appointmentConfirmEmailString = (appointment:any)=>{
    return render(<AppointmentConfirmedEmail appointment={appointment} />,{pretty:true})
  }
export const emalHtmlTemplet=()=>{

}
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#47689A",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };