import React, {useState} from 'react';

function Stats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total > 0 ? Math.round((completed/total)*100) : 0;

  return (
    <div className="grid grid-cols-3 mb-6 gap-4">
      <div className="px-3 py-3 flex flex-col items-center justify-center gap-3 border 
      rounded-xl border-zinc-800 bg-zinc-800/50">
        <p className="text-3xl font-bold text-cyan-400">{total}</p>
        <p className="text-sm text-zinc-500">Total</p>
      </div>
      <div className="px-3 py-3 flex flex-col items-center justify-center gap-3 border 
      rounded-xl border-zinc-800 bg-zinc-800/50">
        <p className="text-3xl font-bold text-green-600">{completed}</p>
        <p className="text-sm text-zinc-500">Completed</p>
      </div>
      <div className="px-3 py-3 flex flex-col items-center justify-center gap-3 border 
      rounded-xl border-zinc-800 bg-zinc-800/50">
        <p className="text-3xl font-bold text-yellow-600">{percentage}%</p>
        <p className="text-sm text-zinc-500">Percentage</p>
      </div>
    </div>
  )
}

function Task({ task, onToggle, onDelete}) {
  return (
    <div className={`group flex items-center gap-3 border rounded-xl p-4
    transition-all ${
      task.completed ? "bg-zinc-900/30 border-zinc-800/50" : "bg-zinc-900/50 border-zinc-800"
    }`}>

      <button
          onClick={() => onToggle(task.id)}
         className={`w-5 h-5 flex justify-center items-center rounded-full border-zinc-800 border-2 
          cursor-pointer transition-all ${task.completed
            ? "bg-cyan-500 border-cyan-500"
            : "bg-zinc-600 hover:border-cyan-500"
          }`}>
            {task.completed && 
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>}
      </button>

      <span className={`flex-1 ${task.completed ? "line-through text-zinc-600" : "text-white"}`}>
        {task.text}
      </span>

      <button 
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 hover:text-red-600 cursor-pointer transition-all">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default function App() {

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React hooks', completed: true },
    { id: 2, text: 'Build a todo app', completed: true },
    { id: 3, text: 'Add Tailwind styling', completed: false },
    { id: 4, text: 'Deploy to production', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if(!newTask.trim()) return;
    setTasks((prev) => [...prev, {id: Date.now(), text: newTask, completed: false}]);
    setNewTask('');
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="relative bg-zinc-900/80 rounded-3xl
      border border-zinc-800 backdrop-blur-2xl shadow-2xl p-8">
        { /* GLOW */}
        <div className="absolute bg-cyan-500/20 -top-20 left-1/2
        -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none">
        </div>

        <div className="relative">
          <h1 className=" text-center font-bold text-xl underline mb-6">React Todo Application</h1>

          <Stats tasks={tasks}/>

          <form onSubmit={addTask} className="mb-6">
            <div className="flex gap-2">
              <input 
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task.."
                className="flex-1 px-4 py-3 bg-zinc-900/50 rounded-xl text-white border 
                border-zinc-700 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button 
                type="submit"
                className="px-4 py-3 bg-cyan-500 rounded-xl cursor-pointer
                font-semibold hover:bg-cyan-700 focus:scale-95"
              >
              Add</button>
            </div>
          </form>

          <div className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-center text-zinc-500 py-8">No tasks yet. Add one above!</p>
            ) : (
              tasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
