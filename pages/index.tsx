import type { NextPage } from 'next'
import React from 'react'
import { load } from '../src/funcs';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Home: NextPage = () => {
  const [input, setInput] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddresAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [tasks, setTasks] = React.useState<any[]>([]);


  // Handlers

  const handleInputChange = (e:any) => setInput(e.currentTarget.value);
  const handleAddTask = async () => {
    await contract.createTask(input, {from: addressAccount});
    setInput('');
    setRefresh(true);
  };
  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, {from: addressAccount});
    setRefresh(true);
  };


  // React useEffect

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddresAccount(e.addressAccount);
      setTasks(e.tasks);
      setContract(e.todoContract);
    });
  });

  return (
    <>
      <div className="container py-5">
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body rouded-0 mb-4 bg-dark">
                    <h1>Tasks App</h1>
                    <h6 className="text-muted">Decentralized App</h6>
                    <span>Wallet</span>
                    <i className="bi bi-wallet2">  <span id="wallet-id"></span></i>
                </div>
                <div id="task-form" className="card card-body rouded-0 bg-dark">
                    <h4>Create New Task</h4>
                    <input
                      type="text" 
                      name="title"
                      placeholder="Task title" 
                      className="form-control bg-dark text-white rouded-0 border-0 my-4"
                      onChange={handleInputChange}
                      value={input}
                      />
                    <button onClick={handleAddTask} className=" form-control btn btn-success">Save</button>
                </div>
            </div>
            <div id="task-list" className="col-md-4">
            {
                tasks == null ? null
                : tasks.map((task, idx) => !task.completed ?
                    <div key={idx} className="card bg-dark mb-2">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span><h4>{ task[1] }</h4></span>
                            <div>
                              <button className='btn btn-success' onClick={ () => handleToggled(task[0].toNumber()) }>DONE</button>
                            </div>
                        </div>
                    </div> : 
                    null
                )
              }
            </div>
            <div id="task-list" className="col-md-4">
            {
                tasks == null ? null
                : tasks.map((task, idx) => task.completed ?
                    <div key={idx} className="card bg-dark mb-2">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <span><h4>{ task[1] }</h4></span>
                            <div>
                              <button className='btn btn-danger' onClick={ () => handleToggled(task[0].toNumber()) }>UNDONE</button>
                            </div>
                        </div>
                    </div> : 
                    null
                )
              }
            </div>
        </div>
    </div>
    </>
  )
}

export default Home
