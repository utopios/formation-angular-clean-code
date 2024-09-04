export function LogDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log("Log added by decorator")
    console.log(target)
    console.log(descriptor)
    console.log(propertyKey)
    return descriptor
}