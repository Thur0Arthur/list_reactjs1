"use client"
import { listRecuder } from "@/reduces/listReducer";
import { useReducer, useState } from "react";

const Page = () => {
  const [list, dispath] = useReducer(listRecuder, []);
  const [addFild, setAddFild] = useState('');

  const handleChangeInput = (e:any) => {
    if (e.target.value.length <= 20) {
      setAddFild(e.target.value);
    }
  }
  const handleAddButton = () => {
    if(addFild.trim() === '') return false;
    dispath({
      type: 'add',
      payload: {
        text: addFild.trim(),
      }
    });
    
    setAddFild('');
  }

  const handleDoneChackbox = (id: number) => {
    dispath ({
      type: 'toggleDone',
      payload: {id}
    })
  }
  const handleEdit = (id:number) => {
    const item = list.find(it => it.id === id);
    if(!item) return false;

    const newText = window.prompt('Editar', item.text);

    if(!newText || newText?.trim() === '') return false;

    dispath ({
      type: 'editText',
      payload: {id, newText}
    })
  }
  const handleRemoveButton = (id: number) => {
    if (!window.confirm('Certeza?')) return false;
    dispath({
      type: 'remove',
      payload: {id}
    })
  }

  return(
    <div className="flex flex-col justify-center items-center bg-white">
      <h1 className="text-3xl mt-6">Lista de algo</h1>
      <div className=" flex boder w-2/3 bg-red-800 border-gray-400 p-4 my-4">
        <input placeholder="Digitar" type="text" className="flex w-5/6 boder border-white  p-3 bd-transparent text-black"
        value={addFild}
        onChange={handleChangeInput} />
        <button onClick={handleAddButton} className="p-4 bg-red-600 hover:text-white">ADICIONAR</button>
      </div>
      <ul>
        {list.map( (item) => (
          <li
          key={item.id}
          className="flex flex-col p-3 my-3 border-b border-gray-700"
          >
            <div className="flex flex-rol justify-around">
             <input onClick={() => handleDoneChackbox(item.id)} type="checkbox" className="w-4 h-4 mx-2" checked={item.done}/>
             <p className="flex">{item.text}</p>
            </div>
            <div className="flex justify-center mt-2">
            <button onClick={() => handleEdit(item.id)} className="text-sm p-1 bg-red-800 rounded-lg text-white hover:bg-red-600">EDITAR</button>
            <button onClick={() => handleRemoveButton(item.id)} className="rounded-lg text-sm p-1 bg-red-800 mx-2 text-white hover:bg-red-600">EXCLUIR</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="h-screen bg-red-800">
      </div>
    </div>
  );
};

export default Page;