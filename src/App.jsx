import { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import Title from './components/Title';
// import Test from './components/Test'; --> Teste usando Class
// import { v4 } from "uuid"; // npm install uuid10.0.0

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || [],
  );
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     title: 'Estudar Programação',
  //     description:
  //       'Estudar programação para se tornar um desenvolvedor full stack.',
  //     isCompleted: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Estudar Inglês',
  //     description:
  //       'Estudar programação para se tornar um desenvolvedor full stack.',
  //     isCompleted: false,
  //   },
  //   {
  //     id: 3,
  //     title: 'Estudar Matemática',
  //     description:
  //       'Estudar programação para se tornar um desenvolvedor full stack.',
  //     isCompleted: false,
  //   },
  // ]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    //  async function fetchTasks() {
    const fetchTasks = async () => {
      // CHAMAR A API
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10',
        {
          method: 'GET',
        },
      );

      // PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json();

      // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
      setTasks(data);
    };
    // SE QUISER , VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
    // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESSA TAREFA
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: tasks.length + 1, //v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        {/* <Test /> */}
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
