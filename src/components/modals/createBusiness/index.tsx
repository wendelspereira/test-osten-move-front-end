import React from "react";
import { Form } from "@unform/web";
import Input from "../../input";
import styles from "./styles.module.scss";
import { api } from "../../../config/axios";
import { Business } from "../../../entities/Business";

interface ICreateBusinessProps {
  closeModal: () => void;
}

export function CreateBusiness(props: ICreateBusinessProps) {
  async function handleSubmit(data: Business) {
    try {
      const result = await api.post("/", { ...data });

      if (result.status !== 201) {
        switch (result.status) {
          case 450:
            alert("CNPJ inválido! Por favor, tente novamente.");
            return;
          case 409:
            alert("Já existe um risgistro para o CNPJ informado.");
            return;
        }
        return;
      }
      props.closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col  w-[36rem] px-12 pt-8 pb-6">
      <div className="w-full border-b-[2px] border-gray-100 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Dados da empresa
          </h1>
        </div>
      </div>
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full gap-2"
      >
        <label className="text-lg font-bold text-gray-600 mt-5 ">Dados</label>

        <Input
          name="corporateName"
          placeholder="Razão social"
          required
          className={styles.input}
        />
        <Input
          name="tradeName"
          placeholder="Nome fantasia"
          required
          className={styles.input}
        />
        <Input
          name="cnpj"
          placeholder="CNPJ"
          required
          className={styles.input}
        />
        <div className="flex items center gap-4 ">
        <Input
          name="prefixPhoneNumber"
          placeholder="DDD"
          required
          className={styles.input + " w-[15%]"}
        />
        <Input
          name="phoneNumber"
          placeholder="Telefone"
          required
          className={styles.input + " w-[85%]"}
        />
        </div>
        <Input
          name="publicPlace"
          placeholder="Logradouro"
          required
          className={styles.input}
        />
        <Input
          name="complement"
          placeholder="Complemento"
          className={styles.input}
        />
        <Input
          name="streetNumber"
          placeholder="nº"
          required
          className={styles.input}
        />
        <Input
          name="district"
          placeholder="Bairro"
          required
          className={styles.input}
        />
        <div className="flex items center gap-4">

        <Input
          name="city"
          placeholder="Cidade"
          required
          className={styles.input + " w-[80%]"}
          />
        <Input
          name="federatedUnit"
          placeholder="UF"
          required
          className={styles.input + " w-[20%]"}
          />
          </div>
        <div className="flex justify-end gap-4 mt-2">
          <button
            onClick={() => props.closeModal()}
            className="bg-gray-300 w-[6rem] font-bold text-white py-2 px-4 rounded-md hover:opacity-80 shadow-md"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-900 w-[6rem] font-bold text-white py-2 px-4 rounded-md hover:opacity-80 shadow-md"
          >
            Savar
          </button>
        </div>
      </Form>
    </div>
  );
}
