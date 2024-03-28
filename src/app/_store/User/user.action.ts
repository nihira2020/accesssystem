import { createAction, props } from "@ngrx/store";
import { APIResponse, Userregister } from "../../_model/Users";

export const BEGIN_REGISTER='[user]begin register'
export const REGISTER_SUCCESS='[user]register success'

export const beginregister=createAction(BEGIN_REGISTER,props<{inputdata:Userregister}>())
export const registeresuccess=createAction(REGISTER_SUCCESS,props<{response:APIResponse}>())