import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal, updateGoal } from '../features/goals/goalSlice';

function GoalItem({ goal }) {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='goal'>
      <div>{new Date(goal.updatedAt).toLocaleString('en-LT')}</div>
      {editing ? (
        <>
          <input
            type='text'
            id='text'
            name='text'
            value={text}
            style={{width: '80%', height: '80%'}}
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button
            className='close'
            style={{ right: 'auto', left: '0', marginLeft: '15px' }}
            onClick={() => {dispatch(updateGoal({id: goal._id, text}))}}
          >Confirm</button>
          <button className='close' onClick={() => setEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2>{goal.text}</h2>
          <button
            className='close'
            style={{ right: 'auto', left: '0', marginLeft: '15px' }}
            onClick={() => setEditing(true)}
          >
            EDIT
          </button>
          <button
            className='close'
            onClick={() => dispatch(deleteGoal(goal._id))}
          >
            X
          </button>
        </>
      )}
    </div>
  );
}
export default GoalItem;
