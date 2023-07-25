
import bcrypt from "bcryptjs";
import {Toast} from "primereact/toast";
import {useRef} from "react";
import {useRouter} from "next/router";
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import {v} from "@fullcalendar/core/internal-common";
import {number} from "prop-types";




export const AllService = {
    hashPassword(password: string) {
        const hash = bcrypt.hashSync(password, "$2a$10$9GOanj.LRXEt.VEfaUZXsO");
        return hash
    },
    convertDatesToJson(obj: any) {
        return JSON.parse(
            JSON.stringify(obj, (key, value) => {
                if (value instanceof Date) {
                    return value.toISOString(); // convert Date to ISO string
                }
                return value;
            })
        );
    },
    convertDatesFormat(obj: any){
         return format(new Date(obj), 'dd-MM-yyyy HH:mm:ss', { locale: th })
    }

};
