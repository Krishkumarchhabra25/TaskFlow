
import { useState } from "react";
import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoListProps {
  taskId: string;
}

export function TodoList({ taskId }: TodoListProps) {
  const [newTodo, setNewTodo] = useState("");
  
  // In a real app, this would come from an API
  const [todos, setTodos] = useState([
    { id: "1", content: "Draft API documentation", completed: true },
    { id: "2", content: "Create endpoint specifications", completed: true },
    { id: "3", content: "Add authentication details", completed: false },
    { id: "4", content: "Document error responses", completed: false },
    { id: "5", content: "Create request/response examples", completed: false },
    { id: "6", content: "Add deployment instructions", completed: false },
    { id: "7", content: "Review documentation for clarity", completed: false },
    { id: "8", content: "Publish documentation", completed: false },
  ]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todo = {
      id: Date.now().toString(),
      content: newTodo.trim(),
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input 
          placeholder="Add new todo item..." 
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button 
          onClick={addTodo}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2 mt-4">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id}
              className="flex items-center group px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <button 
                onClick={() => toggleTodo(todo.id)}
                className="mr-3 flex-shrink-0"
              >
                {todo.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                )}
              </button>
              
              <span 
                className={cn(
                  "flex-grow text-gray-800",
                  todo.completed && "text-gray-400 line-through"
                )}
              >
                {todo.content}
              </span>
              
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
