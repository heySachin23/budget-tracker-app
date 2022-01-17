import React, { useContext } from 'react'
import { v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudget() {
    return useContext(BudgetContext)
}

export const BudgetProvider = ({children}) => {

    const newBudget = (name, maxAmount) => {
        return {
            id : uuidV4(),
            name,
            maxAmount
        }
    }
    const newExpense = (amount, budgetId, description) => {
        return {
            id : uuidV4(),
            amount,
            budgetId,
            description
        }
    }

    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({amount, budgetId, description}) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, newExpense(amount, budgetId, description)]
        })
    }

    function addBudget({name, maxAmount}) {
        setBudgets(prevBudgets => {
            return [...prevBudgets, newBudget(name, maxAmount)]
        })
    }

    function deleteBudget({id}) {
        setBudgets(curBudgets => {
            return curBudgets.filter(budget => budget.id !== id)
        })
        setExpenses(expenses => {
            return expenses.map(expense => {
                let newExpense = expense
                if(expense.budgetId === id) newExpense.budgetId = UNCATEGORIZED_BUDGET_ID
                return newExpense
            })
        })
    }

    function deleteExpense({id}) {
        setExpenses(curExpenses => {
            return curExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>
    )
}