import express from 'express'

const app = express()

app.get('/', (_, res) => {
  res.send('Backend running')
})

app.listen(3001, () => {
  console.log('Backend listening on port 3001')
})
