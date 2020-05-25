import React, {useEffect} from "react";
import Airbridge, {initObject} from '../types'

declare global {
    interface Window {
        airbridge: Airbridge;
    }
}

const AirbridgeSDK = ({app, webToken, children}: { app: string, webToken: string, children?: React.ReactNode }) => {
    useEffect(() => {
        const {airbridge} = window;
        airbridge.init({app, webToken} as initObject);
    }, [])
    return (<div>{children}</div>)
}

export default AirbridgeSDK;