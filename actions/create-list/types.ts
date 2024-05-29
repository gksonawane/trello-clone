import { z } from "zod";
import { List } from "@prisma/client"
import {CreateList} from "@/actions/create-list/schema";
import {ActionState} from "@/lib/create-safe-actions";


export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;