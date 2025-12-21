import cors from 'cors'
app.use(cors({
    origin: 'http://localhost:5500',
    methods:['GET','POST'],
    allowedHeaders:['Content-type']
}));

