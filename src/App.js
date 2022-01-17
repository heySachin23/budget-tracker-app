import { useState } from 'react';
import './App.css'
import AddBudgetModal from './Components/modals/AddBudgetModal';
import AddExpenseModal from './Components/modals/AddExpenseModal';
import ExpenseCard from './Components/ExpenseCard/ExpenseCard';
import TotalExpenseCard from './Components/ExpenseCard/TotalExpenseCard';
import UncategorizedExpenseCard from './Components/ExpenseCard/UncategorizedExpenseCard';
import ViewExpensesModal from './Components/modals/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudget } from './Contexts/BudgetContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalForBudget, setAddExpenseModalForBudget] = useState(UNCATEGORIZED_BUDGET_ID)
  const [viewExpensesModalForBudget, setViewExpensesModalForBudget] = useState()
  const { budgets, getBudgetExpenses, expenses } = useBudget()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalForBudget(budgetId)
  }

  const isModalOpen = showAddBudgetModal || showAddExpenseModal || (viewExpensesModalForBudget != null) 

  return (
  <>
    <div className={`container ${isModalOpen ? 'block-scroll' : ''}`}>
      <div className="header">
        <h2 className="title">Budget Tracker</h2>
        <div className='header-btns'> 
          <button className="btn-header btn-primary" onClick={() => {setShowAddBudgetModal(true)}}>Add Budget</button>
          <button className="btn-header btn-outline" onClick={() => {openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}}>Add Expense</button>
        </div>
      </div>


      {(expenses.length > 0) || (budgets.length > 0) ? 
        <div className='cards-grid'>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            
            return <ExpenseCard
              key={budget.id} 
              title={budget.name} 
              amount={amount}
              maxAmount={budget.maxAmount}
              onAddExpenseClick = {() => {openAddExpenseModal(budget.id)}} 
              onViewExpensesClick = {() => {setViewExpensesModalForBudget(budget.id)}} 
            />
          })}
          <UncategorizedExpenseCard onAddExpenseClick = {() => {openAddExpenseModal()}} onViewExpensesClick = {() => {setViewExpensesModalForBudget(UNCATEGORIZED_BUDGET_ID)}}  />
          <TotalExpenseCard />
        </div> :
        <div className='img-container'>
          <img className='img-no-post' src={require('./images/add_post.png')} />
        </div>
      }
    </div>
    <AddBudgetModal show={showAddBudgetModal} handleClose={() => { setShowAddBudgetModal(false) }} />
    <AddExpenseModal show={showAddExpenseModal} handleClose={() => { setShowAddExpenseModal(false) }} defaultBudgetId={addExpenseModalForBudget} />
    <ViewExpensesModal handleClose={() => { setViewExpensesModalForBudget() }} budgetId={viewExpensesModalForBudget} />
  </>

  );
}

export default App;
