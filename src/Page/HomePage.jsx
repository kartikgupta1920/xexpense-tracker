import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import PieChart from "../Components/Charts/PieChart/PieChart";
import BarChart from "../Components/Charts/BarChart/BarChart";
import AddBalanceForm from "../Components/Forms/AddBalanceForm/AddBalanceForm";
import ExpenseForm from "../Components/Forms/ExpenseForm/ExpenseForm";
import Card from "../Components/Card/Card";
import Modal from "../Components/Modal/Modal";
import TransactionList from "../Components/Transactions/TransactionList/TransactionList";


export default function HomePage() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [spentList, setSpentList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  //   const [isOpenMoney, setIsOpenMoney] = useState(false);
  const [isAddBalanceOpen, setIsAddBalanceOpen] = useState(false);
  //   const [isOpenSpent, setIsOpenSpent] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const [category, setCategory] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [countOfcategory, setCountOfCategory] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  useEffect(() => {
    const localMoney = localStorage.getItem("walletBalance");

    if(localMoney){
      setWalletBalance(Number(localMoney));
    }else {
      setWalletBalance(5000);
      localStorage.setItem("walletBalance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));

    setSpentList(items || []);
    setIsMounted(true)
  }, []);

  useEffect(() => {
    if(spentList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(spentList))
    }
    if(spentList.length > 0){
      setExpenses(
        spentList.reduce(
          (accumulator, currentValue) => 
            accumulator +  Number(currentValue.price),
          0
        )
      );
    } else {
      setExpenses(0);
    }

    let foodSpends = 0,
        entertainmentSpends = 0,
        travelSpends = 0;
    
        let foodCount = 0,
        entertainmentCount = 0,
        travelCount = 0;

        spentList.forEach((item) => {
          if(item.category == "food"){
            foodSpends += Number(item.price);
            foodCount++;
          }else if(item.category == "entertainment"){
            entertainmentSpends += Number(item.price);
            entertainmentCount++;
          }else if(item.category == "travel"){
            travelSpends += Number(item.price);
            travelCount++;
          }
        });

        setCategory({
          food: foodSpends,
          travel: travelSpends,
          entertainment: entertainmentSpends,
        }); 
        setCountOfCategory({
          food: foodCount,
          travel: travelCount,
          entertainment: entertainmentCount,
        });
  }, [spentList]);

  useEffect(() => {
    if(isMounted){
      localStorage.setItem("balance", walletBalance);
    }
  }, [walletBalance, isMounted]);

  return (
    <div className={styles.container}>
      <h1>Expence Tracker</h1>

      <div className={styles.cardWrap}>
        <Card className={styles.cardWidth}
          title="Wallet Balance"
          walletBalance={walletBalance}
          buttonText="+ Add income"
          buttonType="success"
          handleClick={() => {
            setIsAddBalanceOpen(true);
          }}
        />

        <Card className={styles.cardWidth}
          title="Expenses"
          walletBalance={expenses}
          buttonText="+ Add Expence"
          buttonType="failure"
          handleClick={() => {
            setIsAddExpenseOpen(true);
          }}
        />

        <PieChart 
            data={[
                {name: "Food", value: category.food},
                {name: "Entertainment", value: category.entertainment},
                {name: "Travel", value: category.travel},
            ]}
        />
      </div>

      <div className={styles.transactionWrap}>
        <TransactionList
            transactions={spentList}
            editTransactions={setSpentList}
            title="Recent Transactions"
            walletBalance={walletBalance}
            setWalletBalance={setWalletBalance}
        />

        <BarChart 
           data={[
            {name: "Food", value: category.food},
            {name: "Entertainment", value: category.entertainment},
            {name: "Travel", value: category.travel},
        ]}
        />
      </div>

      <Modal isOpen={isAddExpenseOpen} setIsOpen={setIsAddExpenseOpen}>
        <ExpenseForm
          setIsOpen={setIsAddExpenseOpen}
          spentList={spentList}
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          setSpentList={setSpentList}
          />
      </Modal>

      <Modal isOpen={isAddBalanceOpen} setIsOpen={setIsAddBalanceOpen}>
        <AddBalanceForm
           setIsOpen={setIsAddBalanceOpen} setWalletBalance={setWalletBalance}
          />
      </Modal>

    
    </div>
  );
}
