export function LogDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log("Log added by decorator")
    console.log(target)
    console.log(descriptor)
    console.log(propertyKey)
    return descriptor
}

export function LogExecutionTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Execution started: ${propertyKey}`);
        const start = performance.now();

        const result = originalMethod.apply(this, args);

        const end = performance.now();
        console.log(`Execution ended: ${propertyKey}. Time taken: ${end - start}ms`);
        return result;
    };

    return descriptor;
}


export function ExceptionHandler(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        try {
            const result = originalMethod.apply(this, args);
            return result
        }catch(err:any) {
            console.log("error handler with decorator")
            console.log(err)
        };
    };

    return descriptor;
}

export function ExceptionHandlerWithType(type:string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            try {
                const result = originalMethod.apply(this, args);
                return result
            }catch(err:any) {
                if(typeof(err) === type) {
                    console.log("error handler with decorator")
                    console.log(err)
                }                
            };
        };
    
        return descriptor;
    }
}