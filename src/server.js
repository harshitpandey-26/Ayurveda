import express from 'express';
import serverConfig from './config/index.js';
import apiRoutes from './routes/index.js';
import errorHandler from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use('/api',apiRoutes);

app.use(errorHandler);

app.listen(serverConfig.PORT,()=>{
    console.log(`Server is listening to port ${serverConfig.PORT}`);
})

