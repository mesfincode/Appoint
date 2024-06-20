
export  interface Profile {
    name: string;
    profileUrl:string;
    company: string
}
export enum NotificationType{
    APPOINTMENT_CREATED,
    APPOINTMENT_RECEIVED,
    APPOINTMENT_CONFIRMED
}
export interface profileRepCard {
    profileUrl: string;
    firstName:string;
    lastName:string;
    email:string;
    company: string;
    serviceDescription: string;
    onClick:()=>void;
}
export interface appointmentCardProp {
    profileUrl: string;
    
    company: string;
    date: string;
    color: string;
    sidebar: boolean;
    status: string;
    iRequested?:boolean;
    appointment?:any;
    onClick:()=>void;

}
export interface PaginationOptions {
    page: number;
    pageSize: number;
  }