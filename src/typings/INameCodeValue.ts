export default interface INameCodeValue<T = number> {
    name: string | null;
    code: string | null;
    value: T | null;
}
