import { z } from "zod";
import { Card } from "@prisma/client"
import {CopyCard} from "./schema";
import {ActionState} from "@/lib/create-safe-actions";


export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>;