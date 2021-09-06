import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase_config";

export const getNotes = async ( uid ) => {
    const notes = [];
    const querySnapshot =  await getDocs(collection(db, `${uid}/journal/notes`));

    querySnapshot.forEach(doc => {
        notes.push({
            id:doc.id,
            ...doc.data(),
        });
    });
    return notes;
}
