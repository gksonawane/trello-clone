import { z } from "zod";
import { List } from "@prisma/client"
import {UpdateList} from "./schema";
import {ActionState} from "@/lib/create-safe-actions";


export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = ActionState<InputType, List>;