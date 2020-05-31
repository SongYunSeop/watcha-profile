import Airbridge, {eventObject, initObject, UserObject} from "./types";

declare global {
    interface Window {
        airbridge: Airbridge;
    }
}

class AirbridgeWrapper {
    private static instance: AirbridgeWrapper;
    private static sdk: Airbridge

    private constructor() {
    }

    public static getInstance(): AirbridgeWrapper {
        if (!AirbridgeWrapper.instance) {
            AirbridgeWrapper.instance = new AirbridgeWrapper()
        }
        if (window && !AirbridgeWrapper.sdk) {
            const {airbridge} = window;
            AirbridgeWrapper.sdk = airbridge
        }
        return AirbridgeWrapper.instance;
    }

    public static getSDK(): Airbridge {
        if (window && !AirbridgeWrapper.sdk) {
            const {airbridge} = window;
            AirbridgeWrapper.sdk = airbridge
        }
        return AirbridgeWrapper.sdk;
    }

    public init(obj: initObject): void {
        AirbridgeWrapper.getSDK().init(obj)
    }

    public signIn(user: UserObject): void {
        AirbridgeWrapper.getSDK().events.signIn(user)
    }

    public signUp(user: UserObject): void {
        AirbridgeWrapper.getSDK().events.signUp(user)
    }

    public signOut(): void {
        AirbridgeWrapper.getSDK().events.signOut()
    }

    public sendEvent(category: string, event?: eventObject): void {
        AirbridgeWrapper.getSDK().events.send(category, event)
    }
}

export default AirbridgeWrapper