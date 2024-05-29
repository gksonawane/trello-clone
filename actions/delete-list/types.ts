import { z } from "zod";
import { List } from "@prisma/client"
import {DeleteList} from "./schema";
import {ActionState} from "@/lib/create-safe-actions";


export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;