import {z} from "zod";

export const UpdateCard = z.object({
    title:z.optional(
        z.string({
            required_error : "Title is required",
            invalid_type_error: "Title is required",
        }).min(3,{
            message: "Title is too short",
        })
    ),
    id : z.string(),
    boardId : z.string(),
    description : z.optional(
        z.string({
            required_error : "description is required",
            invalid_type_error : "description is required"
        }).min(3,{
            message : "description is to short"
        })
    )
});