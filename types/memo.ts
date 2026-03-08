import { type Timestamp } from "firebase/firestore"

interface Memo{
    id?:string,
    bodyText:string,
    updatedAt:Timestamp,
    fileId?:string
}

export type{Memo}