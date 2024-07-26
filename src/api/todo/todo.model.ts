import { task_entity as Todo } from "./todo.entity";
import mongoose from "mongoose";

const todo_schema = new mongoose.Schema<Todo>({
  //id: String,
  title: { type: String, required: true },
  dueDate: { type: Date, required: false },
  completed: { type: Boolean, default: false },
  //Stringa user model
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

todo_schema.virtual("expired").get(function (this: Todo) {
  const data_corrente = new Date();
  //Solo quando la data dueDate è scaduta il campo expired risultera true, altrimenti non risulta
  return this.dueDate && this.dueDate < data_corrente;
});

todo_schema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id; // Rimuovi il campo _id
    delete ret.__v;
    return ret;
  },
});

export const TodoModel = mongoose.model<Todo>("Todo", todo_schema);
// 'Todo' Il nome della collezione nel database MongoDB, che è 'Todo'
// todo_schema Lo schema Mongoose 'todo_schema', che definisce la struttura dei documenti nella collezione
// <Todo> Il tipo di dati TypeScript associato al modello, che sembra essere un tipo generico 'Todo'
