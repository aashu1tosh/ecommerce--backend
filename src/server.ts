import { createServer } from 'http';
import app from './config/app.config';
import { AppDataSource } from './config/database.config';
import { DotenvConfig } from './config/env.config';
import Print from './utils/print';

function listen() {
    const PORT = DotenvConfig.PORT;
    const httpServer = createServer(app);
    httpServer.listen(PORT);
    Print.info(`🚀 Server is listening on port ${PORT}`);
}

AppDataSource.initialize()
    .then(async () => {
        Print.info(`🚀 Database successfully connected`);
        listen(); // Start the server
    })
    .catch((err) => {
        Print.info(`❌ Database connection failure - ${err?.message}`);
    });
