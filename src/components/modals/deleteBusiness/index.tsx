import React from "react";
import { api } from "../../../config/axios";

interface IDeleteBusinessProps {
  id: number;
  closeModal: () => void;
}

export function DeleteBusiness(props: IDeleteBusinessProps) {
  async function handleDelete() {
    try {
      const result = await api.delete(`/?id=${props.id}`);
      if (result.status != 204) {
        alert("Erro ao excluir. Por favor, tente novamente");
        return;
      }
      props.closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col  w-[36rem] px-12 pt-8 pb-6 gap-8">
      <div className="w-full border-b-[2px] border-gray-100 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Deletar cadastro
          </h1>
        </div>
      </div>

      <p>
        Tem certeza que deseja excluir este registro da base de dados? <br/>
        Não será possível recuperar os dados excluídos.
      </p>

      <div className="flex justify-end gap-4 mt-2">
        <button
          onClick={() => props.closeModal()}
          className="bg-gray-300 w-[6rem] font-bold text-white py-2 px-4 rounded-md hover:opacity-80 shadow-md"
        >
          Cancelar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-400 w-[8rem] font-bold text-white py-2 px-4 rounded-md hover:opacity-80 shadow-md"
        >
          Sim, excluir!
        </button>
      </div>
    </div>
  );
}
