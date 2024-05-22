import { useEffect } from "react";
import io from 'socket.io-client';
import { config } from "config/config";
import { getCartByDate } from "functions/cart";

interface SocketModuleProps {
    user: string
}

interface socketI { datef: Date, dates: Date }


const SocketModule: React.FC<SocketModuleProps> = ({ user }) => {

    useEffect(() => {
        const socket = io(config.urlAPI2);
        if (user) {

            socket.emit('user connected', user)
            socket.on('list', async (list: socketI) => {
                const carts = await getCartByDate(new Date('2024-05-10T03:00:00.000Z'));
                socket.emit('List Return', carts);

            })
        }
        return () => {
            socket.off('list');
        };
    }, [user])
    return (<></>);
}

export default SocketModule;