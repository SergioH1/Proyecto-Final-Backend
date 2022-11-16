import http from 'http';
import { app } from './app.js';
const PORT = process.env.PORT || 3200;
const onError = (err) => {
    console.log(err.message);
};
const onListening = () => {
    const addr = server.address();
    //  { address: '::', family: 6, port: 3400 }
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : addr?.address === '::'
            ? `http://localhost:${addr.port}`
            : addr.address + addr.port;
    console.log(`Listening on ${bind}`);
};
app.set('port', PORT);
export const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(PORT);
