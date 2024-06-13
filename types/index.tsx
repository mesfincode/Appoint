
export  interface Profile {
    name: string;
    profileUrl:string;
    company: string
}

export interface profileRepCard {
    profileUrl: string;
    name: string;
    email:string;
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
    sidebar: boolean
}
export interface PaginationOptions {
    page: number;
    pageSize: number;
  }