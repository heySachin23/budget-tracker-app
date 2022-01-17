import React from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudget } from '../../Contexts/BudgetContext'
import ExpenseCard from './ExpenseCard'

export default function UncategorizedExpenseCard(props) {
    const { getBudgetExpenses } = useBudget()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)
    
    if (amount === 0) return null 
    return (
        <ExpenseCard 
            {...props}
            title = "Uncategorized"
            isGray = {true} 
            amount = {amount}
        />
    )
}
