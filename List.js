import React from 'react';
import Task from './Task';

const List = ({tasks, onCompletion, onDelete}) => {
  return (
    <div className="list">
        {tasks.map(task => (
            <Task 
                key={task.id} 
                task={task} 
                onCompletion={onCompletion} 
                onDelete={onDelete} />
            ))
        }
    </div>
  );
}

export default List;