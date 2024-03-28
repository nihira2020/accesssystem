import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../model/user.Model";

const getuserstate = createFeatureSelector<UserModel>('user');

export const getregiterresponse = createSelector(getuserstate, (state) => {
    return state.response;
})