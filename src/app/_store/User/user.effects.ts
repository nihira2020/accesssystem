import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { UserService } from "../../_service/user.service";
import { beginregister, registeresuccess } from "./user.action";
import { showalert } from "../Common/app.action";

@Injectable()
export class UserEffects {
    constructor(private actin$: Actions, private service: UserService) {

    }

    _beginregister = createEffect(() =>
        this.actin$.pipe(
            ofType(beginregister),
            switchMap((action) => {
                return this.service.Userregisteration(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(registeresuccess({ response: data }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create associate', resulttype: 'fail' })))
                )
            })
        )
    )



}