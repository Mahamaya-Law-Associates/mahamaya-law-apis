const express = require('express');
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter')
const app = express();
const port = 4200;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json())
app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/about', (req, res) => {
    res.send('about world')
})


app.listen(port, () => {
    console.log("saurabh's server listening")

})

