import Express from 'express'
import bodyParser from 'body-parser'

import database from './config/database'
import userRoute from './routes/userRoute'

const app = Express()
const port = 3003

app.use(bodyParser.urlencoded({ extended: false }))
app.set('json spaces', 2);

userRoute(app)

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

database.connect().then(() => {
    app.listen(port, () => console.log('Api rodando na porta 3003'))
})