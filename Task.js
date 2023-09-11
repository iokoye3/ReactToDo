import React from 'react';

const Task = ({task, onCompletion, onDelete}) => {
  return (
    <div className="task">
        <input 
            type="checkbox" 
            checked={task.completed}
            onChange={() => onCompletion(task.id)} 
        />
        <span className={task.completed ? 'completed-task' : ''}>{task.text}</span>
        <span className={task.completed ? 'completed-task' : ''}>{task.dueDate}</span>
        <span className={task.completed ? 'completed-task' : ''}>{task.priority}</span>
        <button 
            className={task.completed ? 'completed-btn' : ''} 
            onClick={() => onDelete(task.id)}
            disabled={task.completed}>DELETE</button>
    </div>
  );
}

export default Task;