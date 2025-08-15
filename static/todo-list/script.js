let todos = JSON.parse(localStorage.getItem('todos')) || [];
let focusedIndex = -1;

function render() {
    const list = document.getElementById('todoList');
    
    if (todos.length === 0) {
        list.innerHTML = '<div class="empty-state">No todos yet. Add one above!</div>';
        return;
    }
    
    list.innerHTML = todos.map((todo, index) => `
        <div class="todo-item ${index === focusedIndex ? 'focused' : ''}" data-index="${index}">
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${index})">
            <button class="priority-btn ${todo.priority ? 'high' : ''}" 
                    onclick="togglePriority(${index})">★</button>
            <span class="todo-text ${todo.completed ? 'completed' : ''}" 
                  ondblclick="editTodo(${index})">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
        </div>
    `).join('');
}

function addTodo(event) {
    event.preventDefault();
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
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
}

function toggleTodo(index) {
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
    todos.splice(index, 1);
    if (focusedIndex >= todos.length) {
        focusedIndex = todos.length - 1;
    }
    saveTodos();
    render();
}

function togglePriority(index) {
    todos[index].priority = !todos[index].priority;
    // Sort: priority items first
    todos.sort((a, b) => {
        if (a.priority !== b.priority) {
            return b.priority - a.priority;
        }
        return 0;
    });
    saveTodos();
    render();
}

function editTodo(index) {
    const newText = prompt('Edit todo:', todos[index].text);
    if (newText !== null && newText.trim()) {
        todos[index].text = newText.trim();
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
    localStorage.setItem('todos', JSON.stringify(todos));
}

function celebrate() {
    // Create celebration container
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    
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
    
    // Remove celebration after animation completes
    setTimeout(() => {
        document.body.removeChild(celebration);
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