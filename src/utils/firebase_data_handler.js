import { collection, doc, getDoc, getDocs, setDoc, } from "firebase/firestore";
import { db } from "./firebase";
export async function uploadData(data, path) {

    try {

        // doc ref
        const docRef = doc(collection(db, path));

        // add data to docRef
        await setDoc(docRef, data, { merge: true });

        // get the document 
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                message: "success",
                data: {
                    id: docSnap.id,
                    ...docSnap.data()
                }
            }
        } else {
            return {
                message: "error",
                data: "No such document!"
            };
        }
    }
    catch (err) {
        console.log(err);
        return {
            message: "error",
            data: err
        }
    }
}

export async function getAllData(path) {
    try {
        const querySnapshot = await getDocs(collection(db, path));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return {
            message: "success",
            data
        }
    }
    catch (err) {
        console.log(err);
        return {
            message: "error",
            data: err
        }
    }
}

export async function getDataById(path) {
    try {
        const docRef = doc(db, path);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                message: "success",
                data: {
                    id: docSnap.id,
                    ...docSnap.data()
                }
            }
        } else {
            return {
                message: "error",
                data: "No such document!"
            };
        }
    }
    catch (err) {
        console.log(err);
        return {
            message: "error",
            data: err
        }
    }
}

export async function getAllSubcollections(collectionName, subCollectionNames) {
    try {
        const collectionData = await getAllData(collectionName);
        if (collectionData.message === "success") {
            let data = collectionData.data;
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < subCollectionNames.length; j++) {
                    const subCollectionData = await getAllData(`${collectionName}/${data[i].id}/${subCollectionNames[j]}`);
                    if (subCollectionData.message === "success") {
                        data[i][subCollectionNames[j]] = subCollectionData.data;
                    }
                }
            }
            return {
                message: "success",
                data
            }
        }



    } catch (err) {
        console.log(err);
        return {
            message: "error",
            data: err,
        };
    }
}

export async function getSubcollectionById(collectionName, id, subCollectionNames) {
    try {
        const collectionData = await getDataById(`${collectionName}/${id}`);
        if (collectionData.message === "success") {
            let data = collectionData.data;
            for (let j = 0; j < subCollectionNames.length; j++) {
                const subCollectionData = await getAllData(`${collectionName}/${id}/${subCollectionNames[j]}`);
                if (subCollectionData.message === "success") {
                    data[subCollectionNames[j]] = subCollectionData.data;
                }
            }
            return {
                message: "success",
                data
            }
        }
    } catch (err) {
        console.log(err);
        return {
            message: "error",
            data: err,
        };
    }
}


