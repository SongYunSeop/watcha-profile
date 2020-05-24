interface eventObject {
    action?: string;
    label?: string;
    value?: number;
    customAttributes?: Object
}

interface Airbridge {
    init(appName: string, webToken: string, utmParsing?: boolean): void;

    events: {
        signUp(userID?: string, userEmail?: string): void;

        signIn(userID?: string, userEmail?: string): void;

        signOut(): void;

        send(category: string, info?: eventObject): void
    }
}

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

    public init(appName: string, webToken: string, utmParsing?: boolean): void {
        AirbridgeWrapper.getSDK().init(appName, webToken, utmParsing)
    }

    public signIn(userID?: string, userEmail?: string): void {
        AirbridgeWrapper.getSDK().events.signIn(userID, userEmail)
    }

    public signUp(userID?: string, userEmail?: string): void {
        AirbridgeWrapper.getSDK().events.signUp(userID, userEmail)
    }

    public signOut(): void {
        AirbridgeWrapper.getSDK().events.signOut()
    }

    public sendEvent(category: string, eventObject?: Object): void {
        AirbridgeWrapper.getSDK().events.send(category, eventObject)
    }
}

export default AirbridgeWrapper