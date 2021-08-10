export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
    readonly value: L

    constructor(value: L) {
        this.value = value
    }

    isLeft(): this is Left<L, A> {
        return true
    }

    isRight(): this is Right<L, A> {
        return false
    }
    
    applyOnRight<B>(_: (a: A) => B): Either<L, B> {
        return this as any;
    }
}

export class Right<L, A> {
    readonly value: A

    constructor(value: A) {
        this.value = value
    }

    isLeft(): this is Left<L, A> {
        return false
    }

    isRight(): this is Right<L, A> {
        return true
    }

    applyOnRight<B>(_: (a: A) => B): Either<L, B> {
        return this as any;
    }
}

export const left = <L, A>(l: L): Either<L, A> => new Left(l)

export const right = <L, A>(a: A): Either<L, A> => new Right<L, A>(a)