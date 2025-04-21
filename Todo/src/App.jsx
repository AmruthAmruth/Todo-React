import React, { useState, useMemo, useEffect } from 'react';
import { useSnackbar } from 'notistack';

const App = () => {
  const [darkMode, setDarkMode]       = useState(false);
  const [todo, setTodo]               = useState('');
  const [todos, setTodos]             = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const { enqueueSnackbar }           = useSnackbar();
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);
  const styles = useMemo(() => ({
    app: {
        
      background:    darkMode ? '#1A1A2E' : '#F0F4F8',
      color:         darkMode ? '#E0E0E0' : '#2C3E50',
      minHeight:     '100vh',
      display:       'flex',
      flexDirection: 'column',
      alignItems:    'center',
      padding:       '60px 20px',
      fontFamily:    'Segoe UI, sans-serif',
      transition:    'background 0.4s ease, color 0.4s ease',
    },
    header: {
      fontSize:      '36px',
      fontWeight:    '700',
      letterSpacing: '2px',
      marginBottom:  '40px',
      textTransform: 'uppercase',
    },
    toggleButton: {
      padding:      '10px 24px',
      marginBottom: '30px',
      background:   darkMode ? '#343A40' : '#FFFFFF',
      color:        darkMode ? '#CFD8DC' : '#34495E',
      border:       '2px solid',
      borderColor:  darkMode ? '#495057' : '#CED4DA',
      borderRadius: '30px',
      cursor:       'pointer',
      fontSize:     '14px',
      fontWeight:   '600',
      boxShadow:    '0 4px 12px rgba(0,0,0,0.1)',
      transition:   'background 0.3s ease, border-color 0.3s ease',
    },
    inputSection: {
      width:        '100%',
      maxWidth:     '600px',
      display:      'flex',
      background:   darkMode ? '#16213E' : '#FFFFFF',
      borderRadius: '12px',
      boxShadow:    '0 8px 24px rgba(0,0,0,0.1)',
      overflow:     'hidden',
      marginBottom: '40px',
    },
    input: {
      flex:       1,
      padding:    '16px 20px',
      border:     'none',
      fontSize:   '16px',
      outline:    'none',
      background: 'transparent',
      color:      darkMode ? '#E0E0E0' : '#34495E',
    },
    addButton: {
      padding:      '0 24px',
      background:   'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)',
      color:        '#FFFFFF',
      border:       'none',
      cursor:       'pointer',
      fontSize:     '16px',
      fontWeight:   '600',
      letterSpacing:'1px',
      boxShadow:    '0 4px 16px rgba(65,55,200,0.2)',
    },
    todoList: {
      width:    '100%',
      maxWidth: '600px',
      display:  'grid',
      gap:      '20px',
    },
    todoItem: {
      background:    darkMode ? '#0F3460' : '#FFFFFF',
      borderRadius:  '12px',
      padding:       '20px',
      display:       'flex',
      justifyContent:'space-between',
      alignItems:    'center',
      boxShadow:     '0 8px 24px rgba(0,0,0,0.05)',
      transition:    'transform 0.2s ease',
    },
    todoText: (done) => ({
      flex:           1,
      fontSize:       '16px',
      fontWeight:     done ? '400' : '500',
      textDecoration: done ? 'line-through' : 'none',
      color:          done
                       ? (darkMode ? '#778899' : '#BDC3C7')
                       : (darkMode ? '#E0E0E0' : '#2C3E50'),
      marginRight:    '20px',
    }),
    buttons: {
      display: 'flex',
      gap:     '12px',
    },
    actionButton: {
      padding:      '8px 14px',
      fontSize:     '14px',
      fontWeight:   '600',
      border:       'none',
      borderRadius: '8px',
      cursor:       'pointer',
      transition:   'opacity 0.2s ease',
    },
    editButton: {
      background: 'linear-gradient(135deg, #F12711 0%, #F5AF19 100%)',
      color:      '#FFFFFF',
    },
    deleteButton: {
      background: 'linear-gradient(135deg, #EE0979 0%, #FF6A00 100%)',
      color:      '#FFFFFF',
    },
    toggleDoneButton: {
      background: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
      color:      '#FFFFFF',
    },
  }), [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === '') return;

    const isDuplicate = todos.some(
      item => item.text.toLowerCase() === todo.trim().toLowerCase()
    );
    if (isDuplicate) {
      enqueueSnackbar('This task already exists! Please add a unique task.', { variant: 'warning' });
      return;
    }

    if (editingIndex !== null) {
      setTodos(todos.map((item, i) =>
        i === editingIndex ? { ...item, text: todo } : item
      ));
      setEditingIndex(null);
      enqueueSnackbar('Task Updated.', { variant: 'success' });
    } else {
      setTodos([...todos, { text: todo, done: false, date: Date.now() }]);
      enqueueSnackbar('New Task Successfully Added.', { variant: 'success' });
    }

    setTodo('');
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    enqueueSnackbar('Task Deleted.', { variant: 'error' });
  };

  const handleEdit = (index) => {
    setTodo(todos[index].text);
    setEditingIndex(index);
  };

  const handleToggle = (index) => {
    setTodos(todos.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    ));
    enqueueSnackbar('Task Status Updated.', { variant: 'success' });
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>🌟 My Todo App</h1>

      <button
        style={styles.toggleButton}
        onClick={() => setDarkMode(!darkMode)}
      >
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <div style={styles.inputSection}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
          <input
            style={styles.input}
            placeholder="Add a new task..."
            value={todo}
            onChange={e => setTodo(e.target.value)}
          />
          <button style={styles.addButton} type="submit">
            {editingIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      <div style={styles.todoList}>
        {todos.map((todoItem, i) => (
          <div key={todoItem.date} style={styles.todoItem}>
            <span style={styles.todoText(todoItem.done)}>
              {i + 1}. {todoItem.text}
            </span>
            <div style={styles.buttons}>
              <button
                type="button"
                style={{ ...styles.actionButton, ...styles.editButton }}
                onClick={() => handleEdit(i)}
              >
                Edit
              </button>
              <button
                type="button"
                style={{ ...styles.actionButton, ...styles.deleteButton }}
                onClick={() => handleDelete(i)}
              >
                Delete
              </button>
              <button
                type="button"
                style={{ ...styles.actionButton, ...styles.toggleDoneButton }}
                onClick={() => handleToggle(i)}
              >
                {todoItem.done ? 'Undo' : 'Done'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
