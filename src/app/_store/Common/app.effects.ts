import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar"
import { exhaustMap, map, of } from 'rxjs'
import { emptyaction, showalert } from "./app.action";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AppEffects {
    constructor(private $action: Actions, private _snackbar: MatSnackBar, private toastr: ToastrService) {

    }

    _showalert = createEffect(() =>
        this.$action.pipe(
            ofType(showalert),
            exhaustMap((action) => {
                this.Shownackbaralert(action.message, action.resulttype);
                return of(emptyaction());
            })
        )
    )


    Shownackbaralert(message: string, resulttype: string = 'fail') {
        if (resulttype == 'pass') {
            this.toastr.success(message, 'Success');
        }else{
            this.toastr.error(message, 'Failed');
        }
    }

}