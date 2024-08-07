import styles from './ExpenseForm.module.css';
import Button from '../../Button/Button';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

function ExpenseForm({setIsOpen, spentList , walletBalance, setWalletBalance, editId, setSpentList}){

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price:'',
        date:'',
    })

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        const name = e.target.name
        setFormData(prev => ({...prev, [name] : e.target.name}))
    }

    const handleAdd = (e) => {
        e.preventDefault()

        if (walletBalance < Number(formData.price)) {
            enqueueSnackbar("Price should be less than the wallet balance", {variant: "warning"})
            setIsOpen(false)
            return
        }

        setWalletBalance(prev => prev - Number(formData.price))
        const lastId = spentList.length > 0 ? spentList[0].id : 0
        setSpentList(prev => [{...formData, id: lastId + 1 }, ...prev])

        setFormData({
            title: '',
            category: '',
            price: '',
            date: '',
        })

        setIsOpen(false)
    }

    const handleEdit = (e) => {
        e.preventDefault()

        const updated = spentList.map(item => {
            if(item.id == editId) {
                const priceDifference = item.price - Number(formData.price)

                if(priceDifference < 0 && Math.abs(priceDifference) > walletBalance) {
                    enqueueSnackbar("Price should not exceed the wallet balance", {variant: "warning"})
                    setIsOpen(false)
                    return {...item}
                }

                setWalletBalance(prev => prev + priceDifference)
                return { ...formData, id: editId }
            }
            else {
                return item
            }
        })

        setSpentList(updated)
        setIsOpen(false)
    }

    useEffect(() => {

        if(editId){
            const spentData = spentList.find(item => item.id == editId)

            setFormData({
                title: spentData.title,
                category: spentData.category,
                price: spentData.price,
                date: spentData.date,
            })
        }
    }, [editId])

    return (
        <div className={styles.formWrapper}>
            <h3>{editId ? 'Edit Expense' : 'Add Expense'}</h3>
            <form onSubmit={editId ? handleEdit : handleAdd}>
                <input type='text' name='title' placeholder='Title'
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input type='number' name='price' placeholder='Price'
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <select name='category'
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value='' disabled>Select category</option>
                    <option value='food' >Food</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='travel'>Travel</option>
                </select>
                <input name='date' type='date'
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <Button type="submit" style="primary" shadow>{editId ? 'Edit Expense' : 'Add Expense'}</Button>

                <Button style='secondary' shadow
                    handleClick={()=> setIsOpen(false)}
                    >
                        Cancel
                    </Button>

            </form>
        </div>
    )

}

export default ExpenseForm;