export type Calls = {
    _id?:string;
    stock: string;
    action: string;
    type: string;
    quantity: number;
    entry: number;
    target1:number;
    target2:number;
    stopLoss: number;
    booked:number;
    roi:number;
    PandL:number;
    status:string;
    createdAt?: string;
    updatedAt?: string;
};
  