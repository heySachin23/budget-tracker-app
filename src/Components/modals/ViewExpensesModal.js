import React from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudget } from '../../Contexts/BudgetContext'
import { currencyFormatter } from '../../utils'
import './modals.css'

export default function ViewExpensesModal({budgetId, handleClose }) {
    const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } = useBudget()

    const budget = budgetId === UNCATEGORIZED_BUDGET_ID ? {
        name : "Uncategorized",
        id : UNCATEGORIZED_BUDGET_ID
    } : budgets.find(b => b.id === budgetId)

    const expenses = getBudgetExpenses(budgetId)

    return (
        budgetId != null ? 
        <div className='overlay'>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>Expenses - {budget?.name}</h3>
                </div>
                <div className='modal-body'>
                    <div className='expenses'>
                        {
                            expenses.map(expense => (
                                <div className='expense' key={expense.id}>
                                    <div className='expense-details'>
                                        <h4>{expense.description}</h4>
                                        <p>{currencyFormatter.format(expense.amount)}</p>
                                    </div>
                                    <button onClick={() => deleteExpense(expense)}>X</button>
                                </div>
                            ))
                        }
                    </div>
                    <div className='modal-actions'>
                        <button onClick={handleClose}>Close</button>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && <button onClick={() => {
                            deleteBudget(budget)
                            handleClose()
                        }}>Delete Budget</button>}
                    </div>
                </div>
            </div>
            <div className='filler'></div>
        </div> : null
    )
}
