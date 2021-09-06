import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase_config"

export const loadListToDo = async ( uid ) => {
    const notes = [];
        const querySnapshot = await getDocs(collection(db, `${uid}/journal/toDoList`));
        querySnapshot.forEach(doc =>{
            notes.push({
                id:doc.id,
                ...doc.data(),
            });
        });
        return notes;
}
