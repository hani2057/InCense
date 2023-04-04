import { useEffect } from "react";
import { useDispatch } from "react-redux";


const WebSocket = ()=>{
    const dispatch = useDispatch();

    useEffect( ()=>{
        dispatch({ type: "START_WEBSOCKET" });

        return ()=>dispatch({type: "CLOSE_SOCKET"})
    },[])

    return <></>

}


export default WebSocket;