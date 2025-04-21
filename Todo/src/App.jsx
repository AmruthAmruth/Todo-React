import React, { useState } from 'react';
import  {useSnackbar} from 'notistack'
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const styles = {
    
    app: {
      backgroundColor: darkMode ? '#121212' : '#f0f0f0',
      color: darkMode ? '#f5f5f5' : '#2c2c2c',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
      transition: '0.3s ease-in-out',
     
    },
    header: {
      fontSize: '26px',
      fontWeight: '600',
      marginBottom: '20px',
      letterSpacing: '0.5px',
    },
    toggleButton: {
      padding: '8px 16px',
      marginBottom: '20px',
      backgroundColor: darkMode ? '#2d2d2d' : '#e0e0e0',
      color: darkMode ? '#f5f5f5' : '#333',
      border: '1px solid #aaa',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    inputSection: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '500px',
      marginBottom: '25px',
    },
    input: {
      flex: 1,
      padding: '10px 14px',
      border: '1px solid #ccc',
      borderRadius: '8px 0 0 8px',
      fontSize: '15px',
      outline: 'none',
    },
    addButton: {
      padding: '10px 16px',
      backgroundColor: '#4a90e2',
      color: '#fff',
      border: 'none',
      borderRadius: '0 8px 8px 0',
      cursor: 'pointer',
      fontSize: '15px',
    },
    todoList: {
      width: '100%',
      maxWidth: '500px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    todoItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: darkMode ? '#1f1f1f' : '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    todoText: (done) => ({
      textDecoration: done ? 'line-through' : 'none',
      color: done ? (darkMode ? '#777' : '#bbb') : (darkMode ? '#f5f5f5' : '#2c2c2c'),
      fontSize: '15px',
      flex: 1,
      marginRight: '10px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    buttons: {
      display: 'flex',
      gap: '8px',
    },
    actionButton: {
      padding: '6px 10px',
      fontSize: '13px',
      backgroundColor: '#4a90e2',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  };

const [todo,setTodo]=useState("")
const [todos,setTodos]=useState([])
const [editingIndex,setEditingIndex]=useState(null)
const { enqueueSnackbar } = useSnackbar();
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (todo.trim() === "") return;

  const isDuplicate = todos.some((item) => item.text.toLowerCase() === todo.trim().toLowerCase());
  if (isDuplicate) {
    enqueueSnackbar('This task already exists! Please add a unique task.', { variant: 'warning' });
      return;
  }

  if (editingIndex !== null) {
    const updatedTodos = todos.map((item, i) =>
      i === editingIndex ? { ...item, text: todo } : item
    );
    setTodos(updatedTodos);
    setEditingIndex(null); 
    enqueueSnackbar('Task Updated.', { variant: 'success' });
  } else {
    setTodos([...todos, { text: todo, done: false, date: Date.now() }]);
    enqueueSnackbar('New Task Successfully Added.', { variant: 'success' });
  }

  setTodo("");
}





const handleDelete=(indexOfTodo)=>{
const updatedTodo= todos.filter((_,i)=> i !== indexOfTodo)
setTodos(updatedTodo)
enqueueSnackbar('Task Deleted.', { variant: 'error' });
}

const handleEdit = (index) => {
  setTodo(todos[index].text);    
  setEditingIndex(index);        
};

const handleToggle=(indexOfTodo)=>{
   const updatedTodos= todos.map((todo,i)=>{
       return i===indexOfTodo ? {...todo,done: !todo.done} : todo
   })
   enqueueSnackbar('Task Status Updated.', { variant: 'success' });
   setTodos(updatedTodos)
}



  return (
    <div style={styles.app}>
      <div style={styles.header}>🌟 My Todo List</div>
      <button style={styles.toggleButton} onClick={() => setDarkMode(!darkMode)}>
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <div style={styles.inputSection}>
        <form onSubmit={handleSubmit}>
        <input style={styles.input} placeholder="Add a new task..." value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button style={styles.addButton} type='submit'>
  {editingIndex !== null ? "Update" : "Add"}
</button>
        </form>
      
      </div>

      <div style={styles.todoList}>
       {todos.map((todo,i)=>(
        <div key={i} style={styles.todoItem}>
             <span style={styles.todoText(todo.done)}>{i+1} : {todo.text}</span>
             
             <div style={styles.buttons}>
        <button style={styles.actionButton} onClick={() => handleEdit(i)}>Edit</button>
        <button style={styles.actionButton} onClick={() => handleDelete(i)}>Delete</button>
        <button style={styles.actionButton} onClick={() => handleToggle(i)}>
          {todo.done ? 'Undo' : 'Done'}
        </button>
      </div>
        </div>
       ))}
      </div>
    </div>
  );
};

export default App;
