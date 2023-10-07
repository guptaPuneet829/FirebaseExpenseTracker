import { useState } from "react"
import { signOut } from "firebase/auth"
import { useGetUserInfo  } from "../../Hooks/useGetUserInfo"
import { useTransactions } from "../../Hooks/useTransactions"
import { useGetTransactions } from "../../Hooks/useGetTransactions"
import { useNavigate  } from "react-router-dom"

import { authentication } from "../../Config/firebase"
import "./style.css"

export const ExpenseTracker = () =>{
    const { addTransaction } = useTransactions();
    const { transactions,transactionTotals } = useGetTransactions();
    const { userName,userProfilePhotoURL } = useGetUserInfo();
    const {balance,expenses,income} = transactionTotals;
    const navigate = useNavigate();

    const [description,setDescription]=useState("");
    const [transactionType,setTransactionType]=useState("expense");
    const [transactionAmount,setTransactionAmount]=useState(0);

    const onSubmit = (e) =>{
        e.preventDefault();
        addTransaction({
            description,
            transactionType,
            transactionAmount,
        });

        setDescription("");
        setTransactionAmount("");

    };

    const signOutUser = async()=>{
        try{
            await signOut(authentication);
            localStorage.clear();
            navigate("/")
        }catch(err){
            console.log(err);
        }
    };

    return(
        <>
            <div className="userInfoAboutExpenseTracker">
                <div className="container">
                    <h1>{userName} expense tracker</h1>
                    <div className="balance">
                        <h3>your balance</h3>
                        {balance>=0 ? <h2>₹{balance}</h2> : <h2>-₹{balance * -1}</h2>}
                    </div>
                    <div className="summary">
                        <div className="expense">
                            <h3><span>e</span>xpenses</h3>
                            <p>₹{expenses}</p>
                        </div>
                        <div className="income">
                            <h3><span>i</span>ncome</h3>
                            <p>₹{income}</p>
                        </div>
                    </div>
                    <form className="addTransactions" onSubmit={onSubmit}>
                        <input type="text" className="IP" placeholder="Description" value={description} required onChange={(e)=>setDescription(e.target.value)}/> 
                        <input type="number" className="IP" placeholder="Amount" value={transactionAmount} required onChange={(e)=>setTransactionAmount(e.target.value)} />
                        <div className="transactionType">
                            <div className="type1">
                                <input type="radio" id="expense" value="expense" checked={transactionType==="expense"} onChange={(e)=>setTransactionType(e.target.value)}/>
                                <label htmlFor="expense">Expense</label>
                            </div>
                            <div className="type2">
                                <input type="radio" id="income"  value="income" checked={transactionType==="income"} onChange={(e)=>setTransactionType(e.target.value)}/>
                                <label htmlFor="income">Income</label>
                            </div>
                        </div>
                        <button type="submit">add transaction</button>
                    </form>
                </div>
                {userProfilePhotoURL && (
                    <div className="profile">
                        <img className="profilePhoto" src={userProfilePhotoURL} />
                        <button className="signOutBtn" onClick={signOutUser}>sign out</button>
                    </div>
                )}
            </div>

            <div className="transactionBox">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction) => {
                      const { description, transactionAmount, transactionType } =
                        transaction;
                      return (
                        <li>
                          <h4> {description} </h4>
                          <p>
                            ₹{transactionAmount} 
                            <label
                              style={{
                                color: transactionType === "expense" ? "#f1031c" : "green",
                                fontWeight:800,textTransform:"capitalize",fontStyle:"italic",
                              }}>{" "}
                              {transactionType}
                            </label>
                          </p>
                        </li>
                      );
                    })}
                </ul>
            </div>
        </>
    )
}
