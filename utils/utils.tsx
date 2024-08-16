import { jwtVerify } from "jose";


export const timestampConversion = (inputDateString: string | Date) => {
    var inputDate = new Date(inputDateString);
    var monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var outputDateString =
        inputDate.getDate() +
        " " +
        monthNames[inputDate.getMonth()] +
        ", " +
        inputDate.getFullYear() +
        " " +
        inputDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    return outputDateString;
};

export const verifyUser = async (token: string) => {
    const secret = new TextEncoder().encode(
        `${process.env.JWT_TOKEN}`
    );
    try {
        await jwtVerify(token, secret);
        return true;
    } catch (error) {
        console.log("error: ", error);
        return false;
    }
};

export type ErrorType = {
    type: string;
    message: string;
    open: boolean;
};


export interface IPermission {
    create: boolean;
    view: boolean;
    edit: boolean;
}

export interface IProfile extends Document {
    profileName: string;
    _id: string,
    status: boolean;
    permission: {
        leads: IPermission;
        users: IPermission;
        calls: IPermission;
        profile: IPermission;
    };
    createdBy?: string;
    updatedBy?: string;
}

export type IOptions = {
    value: string;
    label: string;
}
