export abstract class Query<T> {
    protected abstract state: T

    toJSON(): T {
        return this.state
    }

    abstract getId(): string
}
