import { z } from "zod";
import { Card } from "@prisma/client"
import {UpdateCardOrder} from "./schema";
import {ActionState} from "@/lib/create-safe-actions";


export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;