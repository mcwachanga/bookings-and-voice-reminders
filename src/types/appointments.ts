export interface appointment{
    id?: string;
    reason: string;
    customer: string;
    bookedOn: Date;
    phone: string;
    reminded: boolean
}