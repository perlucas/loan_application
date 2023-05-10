export class Controller {

    method(fn: Function) {
        return fn.bind(this)
    }

    protected static httpOkCode(): number {
        return 200
    }

    protected static httpCreatedCode(): number {
        return 201
    }

    protected static httpInternalErrorCode(): number {
        return 500
    }

    protected static httpBadRequestCode(): number {
        return 400
    }

    protected async tryCatchSurround(aPromise: Function): Promise<any[]> {
        try {
            const result = await aPromise()
            return [result, null]
        } catch (err) {
            return [null, err]
        }
    }
}