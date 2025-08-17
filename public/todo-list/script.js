let todos = loadTodos();
let focusedIndex = -1;

function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function validateTodo(todo) {
    return todo && 
           typeof todo.text === 'string' && 
           typeof todo.completed === 'boolean' && 
           typeof todo.priority === 'boolean';
}

function loadTodos() {
    try {
        const stored = localStorage.getItem('todos');
        if (!stored) return [];
        
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) return [];
        
        return parsed.filter(validateTodo);
    } catch (e) {
        console.warn('Failed to load todos from localStorage:', e);
        return [];
    }
}

function render() {
    const list = document.getElementById('todoList');
    
    if (todos.length === 0) {
        list.innerHTML = '<div class="empty-state">No todos yet. Add one above!</div>';
        return;
    }
    
    // Clear existing content
    list.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${index === focusedIndex ? 'focused' : ''}`;
        todoItem.setAttribute('data-index', index);
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));
        
        const priorityBtn = document.createElement('button');
        priorityBtn.className = `priority-btn ${todo.priority ? 'high' : ''}`;
        priorityBtn.textContent = '★';
        priorityBtn.addEventListener('click', () => togglePriority(index));
        
        const todoText = document.createElement('span');
        todoText.className = `todo-text ${todo.completed ? 'completed' : ''}`;
        todoText.textContent = todo.text; // Safe - uses textContent instead of innerHTML
        todoText.addEventListener('dblclick', () => editTodo(index));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(index));
        
        todoItem.appendChild(checkbox);
        todoItem.appendChild(priorityBtn);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);
        
        list.appendChild(todoItem);
    });
}

function addTodo(event) {
    event.preventDefault();
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    // Input validation
    if (!text) return;
    if (text.length > 1000) {
        alert('Todo text is too long (max 1000 characters)');
        return;
    }
    
    todos.unshift({
        text: text,
        completed: false,
        priority: false
    });
    input.value = '';
    focusedIndex = 0;
    saveTodos();
    render();
}

function toggleTodo(index) {
    if (index < 0 || index >= todos.length) {
        console.warn('Invalid todo index:', index);
        return;
    }
    
    const wasCompleted = todos[index].completed;
    todos[index].completed = !todos[index].completed;
    
    // Trigger celebration only when marking as complete (not unchecking)
    if (!wasCompleted && todos[index].completed) {
        celebrate();
    }
    
    saveTodos();
    render();
}

function deleteTodo(index) {
    if (index < 0 || index >= todos.length) {
        console.warn('Invalid todo index:', index);
        return;
    }
    
    todos.splice(index, 1);
    
    // Update focused index to stay within bounds
    if (todos.length === 0) {
        focusedIndex = -1;
    } else if (focusedIndex >= todos.length) {
        focusedIndex = todos.length - 1;
    } else if (focusedIndex >= index && focusedIndex > 0) {
        focusedIndex--;
    }
    
    saveTodos();
    render();
}

function togglePriority(index) {
    if (index < 0 || index >= todos.length) {
        console.warn('Invalid todo index:', index);
        return;
    }
    
    todos[index].priority = !todos[index].priority;
    // Sort: priority items first
    todos.sort((a, b) => {
        if (a.priority !== b.priority) {
            return b.priority - a.priority;
        }
        return 0;
    });
    
    // Reset focus after sorting
    focusedIndex = -1;
    saveTodos();
    render();
}

function editTodo(index) {
    if (index < 0 || index >= todos.length) {
        console.warn('Invalid todo index:', index);
        return;
    }
    
    const newText = prompt('Edit todo:', todos[index].text);
    if (newText !== null && newText.trim()) {
        const trimmedText = newText.trim();
        if (trimmedText.length > 1000) {
            alert('Todo text is too long (max 1000 characters)');
            return;
        }
        todos[index].text = trimmedText;
        saveTodos();
        render();
    }
}

function navigateDown() {
    if (todos.length === 0) return;
    focusedIndex = Math.min(focusedIndex + 1, todos.length - 1);
    render();
}

function navigateUp() {
    if (todos.length === 0) return;
    focusedIndex = Math.max(focusedIndex - 1, 0);
    render();
}

function saveTodos() {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
        console.error('Failed to save todos to localStorage:', e);
        alert('Warning: Could not save your todos. Your changes may be lost.');
    }
}

function celebrate() {
    // Create celebration container
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.id = 'celebration-' + Date.now(); // Unique ID for tracking
    
    // Add confetti
    for (let i = 0; i < 27; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        celebration.appendChild(confetti);
    }
    
    // Add big checkmark
    const checkmark = document.createElement('div');
    checkmark.className = 'checkmark';
    checkmark.textContent = '✓';
    celebration.appendChild(checkmark);
    
    // Add fireworks at random positions
    for (let i = 0; i < 6; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 80 + 10 + '%';
        firework.style.top = Math.random() * 60 + 20 + '%';
        firework.style.animationDelay = Math.random() * 0.5 + 's';
        celebration.appendChild(firework);
    }
    
    // Add sparkles
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 90 + 5 + '%';
        sparkle.style.top = Math.random() * 70 + 15 + '%';
        sparkle.style.animationDelay = Math.random() * 0.8 + 's';
        celebration.appendChild(sparkle);
    }
    
    document.body.appendChild(celebration);
    
    // Remove celebration after animation completes with error handling
    setTimeout(() => {
        try {
            if (celebration && celebration.parentNode === document.body) {
                document.body.removeChild(celebration);
            }
        } catch (e) {
            console.warn('Failed to remove celebration element:', e);
        }
    }, 3000);
}

// Event listeners
document.getElementById('todoForm').addEventListener('submit', addTodo);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Handle escape in input field
    if (e.target.tagName === 'INPUT' && e.key === 'Escape') {
        e.target.blur();
        return;
    }
    
    // Don't interfere with other input field interactions
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key) {
        case 'j':
            e.preventDefault();
            navigateDown();
            break;
        case 'k':
            e.preventDefault();
            navigateUp();
            break;
        case 'x':
            e.preventDefault();
            if (focusedIndex >= 0) deleteTodo(focusedIndex);
            break;
        case ' ':
            e.preventDefault();
            if (focusedIndex >= 0) toggleTodo(focusedIndex);
            break;
        case 's':
            e.preventDefault();
            if (focusedIndex >= 0) togglePriority(focusedIndex);
            break;
        case 'i':
            e.preventDefault();
            document.getElementById('todoInput').focus();
            break;
        case 'Escape':
            e.preventDefault();
            document.getElementById('todoInput').value = '';
            focusedIndex = -1;
            render();
            break;
    }
});

// Initial render
render();