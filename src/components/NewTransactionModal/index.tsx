import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { api } from "../../lib/axios";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(["income", "outcome"]),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal(){

    const { createTransaction } = useContext(TransactionsContext)

    const { register, handleSubmit, formState: { isSubmitting }, control, reset } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: "income"
        }
    })

async function handleCreateNewTransaction(data: NewTransactionFormInputs ){
    // await new Promise(resolve => setTimeout(resolve, 2000))

    // console.log(data)

    const { description, category, price, type } = data;

    // await api.post("transactions", {
    //     // description: data.description,
    //     // category: data.category,
    //     // price: data.price,
    //     // type: data.type,
    //     description,
    //     category,
    //     price,
    //     type,
    //     createdAt: new Date(),
    // })
    await createTransaction({
        description,
        category,
        price,
        type,
    });
    reset();
}

    return (
        <>
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)} >
                    <input 
                    type="text" 
                    placeholder="Descrição" 
                    required
                    {...register("description")}
                    />
                    <input 
                    type="number" 
                    placeholder="Preço" 
                    required
                    {...register("price", { valueAsNumber: true })}
                    />
                    <input 
                    type="text" 
                    placeholder="Categoria" 
                    required
                    {...register("category")}
                    />

                    <Controller
                    control={control}
                    name="type"
                    render={({ field })=> {

                        return (
                            <TransactionType  onValueChange={field.onChange} value={field.value} >
                                <TransactionTypeButton value="income" variant="income">
                                    <ArrowCircleUp size={24} />
                                    Entrada
                                </TransactionTypeButton>
                                <TransactionTypeButton value="outcome" variant="outcome">
                                    <ArrowCircleDown size={24} />
                                    Saída
                                </TransactionTypeButton>
                            </TransactionType>
                        )
                    }}
                    />

                    <button type="submit" disabled={isSubmitting} >Cadastrar</button>
                </form>

                
            </Content>
        </Dialog.Portal>
    </>
    )
}