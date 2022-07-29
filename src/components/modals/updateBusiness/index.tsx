import React from "react";
import { Form } from "@unform/web";
import Input from "../../input";
import styles from "./styles.module.scss";
import { Business } from "../../../entities/Business";
import { api } from "../../../config/axios";
import { useFetch } from "../../../services/useFetch";

interface IUpdateBusinessProps {
  id: number;
  closeModal: () => void;
}

export function UpdateBusiness(props: IUpdateBusinessProps) {
  const { data, error, isFetching } = useFetch<Business>(`/?id=${props.id}`);

  if (isFetching) {
    return (
      <>
        <p>Carregando...</p>
      </>
    );
  }

  async function handleSubmit(data: Business) {
    try {
      const result = await api.patch(`/?id=${props.id}`, { ...data });

      if (result.status !== 200) {
        switch (result.status) {
          case 400:
            alert("Erro ao editar! Por favor tente novamente.");
            return;
          case 450:
            alert("CNPJ inválido! Por favor, tente novamente.");
            return;
        }
        return;
      }
      props.closeModal();
    } catch (err) {}
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
          defaultValue={data!.corporateName}
          name="corporateName"
          placeholder="Razão social"
          required
          className={styles.input}
        />
        <Input
          defaultValue={data!.tradeName}
          name="tradeName"
          placeholder="Nome fantasia"
          required
          className={styles.input}
        />
        <Input
          defaultValue={data!.cnpj}
          name="cnpj"
          placeholder="CNPJ"
          required
          className={styles.input}
        />
        <div className="flex items center gap-4 ">
          <Input
            defaultValue={data!.prefixPhoneNumber}
            name="prefixPhoneNumber"
            placeholder="DDD"
            required
            className={styles.input + " w-[15%]"}
          />
          <Input
            defaultValue={data!.phoneNumber}
            name="phoneNumber"
            placeholder="Telefone"
            required
            className={styles.input + " w-[85%]"}
          />
        </div>
        <Input
          defaultValue={data!.publicPlace}
          name="publicPlace"
          placeholder="Logradouro"
          required
          className={styles.input}
        />
        <Input
          defaultValue={data?.complement}
          name="complement"
          placeholder="Complemento"
          className={styles.input}
        />
        <Input
          defaultValue={data!.streetNumber}
          name="streetNumber"
          placeholder="Número"
          required
          className={styles.input}
        />
        <Input
          defaultValue={data!.district}
          name="district"
          placeholder="Bairro"
          required
          className={styles.input}
        />
        <div className="flex items center gap-4">
          <Input
            defaultValue={data!.city}
            name="city"
            placeholder="Cidade"
            required
            className={styles.input + " w-[80%]"}
          />
          <Input
            defaultValue={data!.federatedUnit}
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
