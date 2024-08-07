import { enqueueSnackbar, useSnackbar } from 'notistack';
import styles from './AddBalanceForm.module.css';
import  Button from '../../Button/Button';
import React, { useState } from 'react';

function AddBalanceForm({setIsopen, setWalletBalance}){
    const [income, setIncome] =useState('');
    const { enqueueSnackbar} = useSnackbar();
 
    const handleSubmit = (e) => {
        e.preventDefault()

        if(Number(income) < 0) {
            enqueueSnackbar("Income should be greater than 0", {variant: "warning"})
            setIsopen(false)
            return
        }

        setWalletBalance(prev => prev + Number(income))
        setIsopen(false)
    }

    return (
        <div className={styles.formWrap}>
            <h3>Add Balance</h3>
            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    placeholder="Income Aomunt"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    required
                />
                <Button type="submit" style="primary"></Button>
                
            </form>
        </div>
    )
}

export default AddBalanceForm;