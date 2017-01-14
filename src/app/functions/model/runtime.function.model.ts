import {Function, Functions} from '../../store/function/function.model';
import {Service, Services} from "../../kubernetes-restangular/kuberentes.service.model";

export class RuntimeFunction {
    public readonly fn: Function;
    public readonly service: Service;
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly exposeUrl: string;

    constructor(fn: Function, service: Service) {
        this.fn = fn;
        this.service = service;
        this.id = fn.id;
        this.name = fn.name;
        this.description = fn.description;
        if (service) {
            this.exposeUrl = service.exposeUrl;
        }
    }
}

export class RuntimeFunctions extends Array<RuntimeFunction> {
}

export function createRuntimeFunctions(functions: Functions, services: Services): RuntimeFunctions {
   var map = {};
   services.forEach(s => map[s.name] = s);
   return functions.map(fn => new RuntimeFunction(fn, map[fn.name]));
}
