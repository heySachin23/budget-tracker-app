import React, { useRef } from 'react'
import { useBudget } from '../../Contexts/BudgetContext'
import './modals.css'

export default function AddBudgetModal({show, handleClose}) {
    const nameRef = useRef()
    const maxBudgetRef = useRef()
    const {addBudget} = useBudget()
    function handleSubmit(e) {
        e.preventDefault()
        addBudget({
            name : nameRef.current.value,
            maxAmount : parseInt(maxBudgetRef.current.value)
        })
        handleClose()
    }

    return (
        show ? 
        <div className='overlay'>
            <div className='modal'>
                <div className='modal-header'>
                    <h3>New Budget</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <label for="name">Name</label>
                    <input type="text" ref={nameRef} id="name" name="name" required />

                    <label for="maxBudget">Maximum Spending</label>
                    <input type="number" ref={maxBudgetRef} id="maxBudget" name="maxBudget" required min={0} />

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
