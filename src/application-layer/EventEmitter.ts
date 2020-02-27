import { EventEmitter as CoreEventEmitter } from 'events';
import TypedEmitter from 'typed-emitter';

type Arguments<T> = [T] extends [(...args: infer U) => any]
    ? U
    : [T] extends [void] ? [] : [T];

export class EventEmitter<Events> implements TypedEmitter<Events> {
    public eventEmitter = new CoreEventEmitter() as unknown as TypedEmitter<Events>;

    public addListener<E extends keyof Events>(event: E, listener: Events[E]): this {
        this.eventEmitter.addListener(event, listener);
        return this;
    }

    public on<E extends keyof Events>(event: E, listener: Events[E]): this {
        this.eventEmitter.on(event, listener);
        return this;
    }

    public once<E extends keyof Events>(event: E, listener: Events[E]): this {
        this.eventEmitter.once(event, listener);
        return this;
    }

    public prependListener<E extends keyof Events>(event: E, listener: Events[E]): this {
        this.eventEmitter.prependListener(event, listener);
        return this;
    }

    public prependOnceListener<E extends keyof Events>(event: E, listener: Events[E]): this {
        this.eventEmitter.prependOnceListener(event, listener);
        return this;
    }

    public off<E extends keyof Events>(event: E, listener: Events[E]): this {
        this.eventEmitter.off(event, listener);
        return this;
    }

    public removeAllListeners<E extends keyof Events>(event: E): this {
        this.eventEmitter.removeAllListeners(event);
        return this;
    }

    public removeListener<E extends keyof Events>(event: E, listener: Events[E]): this {
        this.eventEmitter.removeListener(event, listener);
        return this;
    }

    public emit<E extends keyof Events>(event: E, ...args: Arguments<Events[E]>): boolean {
        return this.eventEmitter.emit(event, ...args);
    }

    public eventNames(): Array<keyof Events> {
        return this.eventEmitter.eventNames() as Array<keyof Events>
    }

    public listeners<E extends keyof Events>(event: E): Function[] {
        return this.eventEmitter.listeners(event);
    }

    public listenerCount<E extends keyof Events>(event: E): number {
        return this.eventEmitter.listenerCount(event);
    }

    public getMaxListeners(): number {
        return this.eventEmitter.getMaxListeners();
    }

    public setMaxListeners(maxListeners: number): this {
        this.eventEmitter.setMaxListeners(maxListeners);
        return this;
    }
}
