import { addDoc,collection,serverTimestamp } from "firebase/firestore"
import { database } from "../Config/firebase"
import { useGetUserInfo } from "./useGetUserInfo"

export const useTransactions = () => {
    const transactionCollectionReference=collection(database,"transactions");
    const { userId } = useGetUserInfo();
    const addTransaction = async({description,transactionAmount,transactionType,}) => {
        await addDoc(transactionCollectionReference,{
            userId,
            description,
            transactionAmount,
            transactionType,
            createdAt:serverTimestamp(),
        });
    };
    return {addTransaction};
};