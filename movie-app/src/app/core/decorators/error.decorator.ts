import { HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export function HandleError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args).pipe(catchError(handleError));
        return result;
    };

    return descriptor;
}

function handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        // Erreur côté client ou réseau
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // Erreur côté backend
        if (error.status === 400) {
            errorMessage = 'Bad request. Please check the input data.';
        } else if (error.status === 401) {
            errorMessage = 'Unauthorized. Invalid email or password.';
        } else if (error.status === 409) {
            errorMessage = 'Conflict. Email already exists.';
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
    }
    return throwError(() => new Error(errorMessage));
}
