
export  interface Profile {
    name: string;
    profileUrl:string;
    company: string
}

export interface profileRepCard {
    profileUrl: string;
    name: string;
    company: string;
    serviceDescription: string;
    onClick:()=>void;
}
export interface appointmentCardProp {
    profileUrl: string;
    name: string;
    company: string;
    date: string;
    color: string
}