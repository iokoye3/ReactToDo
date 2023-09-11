import React, { useState } from 'react';
import List from './components/List';
import Tab from './components/Tab';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTab, setCurrentTab] = useState('To-do');
  const [taskText, setTaskText] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [nextTaskId, setNextTaskId] = useState(0);
  const [sortOrder, setSortOrder] = useState(true);

  // Handles task completion logic for the checkbox
  
  const handleCompletion = (taskID) => {
    const currentList = tasks.map(task => 
      task.id === taskID ? {...task, completed: !task.completed} : task
    );
    setTasks(currentList);
  }

  // Delete individual tasks

  const handleDelete = (taskID) => {
    const currentList = tasks.filter((task) => task.id !== taskID);
    setTasks(currentList);
  }
  
  // Handle new task input

  const handleNewTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: nextTaskId,
      text: taskText,
      dueDate: formatDate(taskDueDate),
      priority: taskPriority,
      completed: false,
    }

    setTasks([...tasks, newTask]);
    setTaskText('');
    setTaskDueDate('');
    setTaskPriority('Low');
    setNextTaskId(nextTaskId + 1);
  }

  // Sort tasks by order they were entered

  const sortTasksByID = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => a.id - b.id);
    setTasks(sortedTasks);
    setSortOrder(!sortOrder);
  };

  // Sort tasks by due date

  const sortTasksByDate = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      return sortOrder ? new Date(a.dueDate) - new Date(b.dueDate) : new Date(b.dueDate) - new Date(a.dueDate); 
    });
    setTasks(sortedTasks);
    setSortOrder(!sortOrder);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  // Delete all tasks
  
  const clearTasks= () => {
    setTasks([]);
  }

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="main">
      <h1>To-Do List</h1>
      <div className="input-container">
        <form className='fields' onSubmit={handleNewTask}>
          <input
            type='text'
            placeholder='Task'
            value={taskText}
            onChange={e => setTaskText(e.target.value)}
            required
          />
          <input
            type="date"
            value={taskDueDate}
            onChange={e => setTaskDueDate(e.target.value)}
            required
          />
          <select
            value={taskPriority}
            onChange={e => setTaskPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type='submit'>Add New Task</button>
        </form>
        {tasks.length > 0 && (
          <>
          <div className='tabs'>
            <Tab
              label="To-Do"
              onClick={() => setCurrentTab('To-Do')}
              isCurrent={currentTab === 'To-Do'}
            />
            <Tab
              label="Completed"
              onClick={() => setCurrentTab('Completed')}
              isCurrent={currentTab === 'Completed'}
            />
          </div>
          <div className='columns'>
            <input type='checkbox' disabled />
            <button onClick={sortTasksByID}>Task</button>
            <button onClick={sortTasksByDate}>Due Date</button>
            <button>Priority</button>
            <button className='disable-btn'>DELETE</button>
          </div>
          <div className='tasklist'>
            <List 
            tasks={currentTab === 'To-Do' ? activeTasks : completedTasks}
            onCompletion={handleCompletion} 
            onDelete={handleDelete}
            />
          </div>
          <div className='clear'>
            <button onClick={clearTasks}>CLEAR TASKS</button>
          </div>
          </>
        )}
      </div>  
    </div>
  );
}

export default App;
