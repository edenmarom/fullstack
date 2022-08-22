import {
  createNewTransactionQuery,
  updateTransactionQuery,
  deleteTransactionQuery,
  getAllTransactionsQuery,
  getTransactionByIdQuery,
} from "../db-queries.js";

export const getAllTransactions = async (req, res) => {
  const transaction = await getAllTransactionsQuery();
  res.send(transaction);
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const transaction = await getTransactionByIdQuery();
  transaction
    ? res.send(transaction)
    : res.status(404).send(`Transaction [id = ${id}] not found.`);
  res.send(transaction);
};

export const createTransaction = async (req, res) => {
  const savedTransaction = await createNewTransactionQuery(req.body);
  res.send(savedTransaction);
};

export const updateTransaction = async (req, res) => {
  const id = req.params.id;
  const transactionToUpdate = req.body;
  const updatedTransaction = await updateTransactionQuery(
    id,
    transactionToUpdate
  );
  updatedTransaction
    ? res.send(updatedTransaction)
    : res.status(404).send(`Transaction [id = ${id}] not found.`);
};

export const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  const deletedTransaction = await deleteTransactionQuery(id);
  deletedTransaction
    ? res.send(deletedTransaction)
    : res.status(404).send(`Transaction [id = ${id}] not found.`);
};
