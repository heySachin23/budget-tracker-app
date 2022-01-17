import React from 'react'
import { currencyFormatter } from '../../utils'
import './ExpenseCard.css'

function ExpenseCard({title, amount, maxAmount, isGray = false, onAddExpenseClick, onViewExpensesClick, hideButtons}) { 

    const barWidth = (amount*100)/maxAmount;
    const barColor = () => {
        if(barWidth < 50) return '#506AD4'
        else if(barWidth < 75) return '#FFCC00'
        else return '#CC3300' 
    }

    const progressBarStyle = {
        'width': `${barWidth}%`,
        'backgroundColor': `${barColor()}`
    }

    const cardBackground = () => {
        if(isGray) return 'whitesmoke'
        else if(barWidth > 100) return '#fff4f0'
    }

    return (
        <div className='card' style={{'background-color' : `${cardBackground()}`}}>
            <div className='card-body'>
                <div className='card-title'>{title}</div>
                <div className='card-amount'>
                    {currencyFormatter.format(amount)} 
                    {maxAmount ? <span className='card-max-amt'>/ {currencyFormatter.format(maxAmount)}</span> : null}
                </div>
            </div>
            {maxAmount && <div className='card-bar-parent'>
                <div className='card-bar' style={progressBarStyle}></div>
            </div>}
            {!hideButtons &&<div className='card-actions'>
                <button className='btn-card btn-outline' onClick={onAddExpenseClick}>Add Expense</button>
                <button className='btn-card btn-outline muted' onClick={onViewExpensesClick}>View Expenses</button>
            </div>}
        </div>
    )
}

export default ExpenseCard
