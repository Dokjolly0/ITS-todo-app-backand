//npm install class-transformer //npm install class-validator
import { IsMongoId, IsString, IsOptional, IsDateString } from "class-validator";
import mongoose from "mongoose";

export class Add_todo_dto {
  @IsString()
  title: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsMongoId()
  @IsOptional()
  assignedTo: mongoose.Types.ObjectId;

  // @IsMongoId()
  // createdBy: mongoose.Types.ObjectId;
}

export class Check_todo_dto {
  @IsMongoId()
  id: string;
}
