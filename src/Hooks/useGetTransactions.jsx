import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { database } from "../Config/firebase";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals,setTransactionTotals] = useState({
    balance : 0.0,
    income : 0.0,
    expenses : 0.0,
  });

  const transactionCollectionReference=collection(database,"transactions");
  const { userId } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionReference,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome=0;
        let totalExpenses=0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if(data.transactionType === "expense"){
            totalExpenses+=Number(data.transactionAmount); 
          }
          else{
            totalIncome+=Number(data.transactionAmount);
          }
        });

        setTransactions(docs);
        let balance=totalIncome-totalExpenses;
        setTransactionTotals({
          balance,
          expenses : totalExpenses,
          income : totalIncome,
        })
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions,transactionTotals };
};