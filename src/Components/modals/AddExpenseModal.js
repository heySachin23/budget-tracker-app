import React, { useRef } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudget } from '../../Contexts/BudgetContext'
import './modals.css'

export default function AddExpenseModal({show, handleClose, defaultBudgetId}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const {addExpense, budgets} = useBudget()

    function handleSubmit(e) {
        e.preventDefault()
        if((descriptionRef.current.value) === "" || amountRef.current.value === null) {handleClose(); return}
        addExpense({
            description : descriptionRef.current.value,
            amount : parseInt(amountRef.current.value),
            budgetId : budgetIdRef.current.value
        })
        handleClose()
    }

    return (
        show ? 
        <div className='overlay'>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>New Expense</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <label for="description">Description</label>
                    <input type="text" ref={descriptionRef} id="description" name="description" required />

                    <label for="amount">Amount</label>
                    <input type="number" ref={amountRef} id="amount" name="amount" required min={0} />

                    <label for="budget">Budget</label>
                    <select id='budget' name='budget' ref={budgetIdRef} defaultValue={defaultBudgetId} required> 
                        <option key={ UNCATEGORIZED_BUDGET_ID } id={ UNCATEGORIZED_BUDGET_ID }>Uncategorized</option>
                        {
                            budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))
                        }
                    </select>

                    <div className='modal-actions'>
                        <button type='button' onClick={handleClose}>Close</button>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
            <div className='filler'></div>
        </div> : null
    )
}
