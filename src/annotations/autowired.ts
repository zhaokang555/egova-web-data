export default function autowired(serviceType: Function) {
    return function (target, name) {
        let serviceInstanceName = "_" + name;
        if (target[serviceInstanceName] == null) {
            target[serviceInstanceName] = target.serviceProvier.resolve(serviceType);
        }
        Object.defineProperty(
            target,
            name,
            {
                get: function () {
                    return target[serviceInstanceName];
                }
            }
        );
    };
}
