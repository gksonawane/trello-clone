import { z } from "zod";
import { Board } from "@prisma/client"
import {DeleteBoard} from "@/actions/delete-board/schema";
import {ActionState} from "@/lib/create-safe-actions";


export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType, Board>;