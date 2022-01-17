import React from 'react'
import { useBudget } from '../../Contexts/BudgetContext'
import ExpenseCard from './ExpenseCard'

export default function TotalExpenseCard() {
    const { expenses } = useBudget()

    const amount = expenses
                        .reduce((total, expense) => total + expense.amount, 0)
    
    if(amount === 0) return null
    
    return (
        <ExpenseCard amount={amount} title="Total" isGray hideButtons />
    )
}
