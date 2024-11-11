import express from 'express'
import cors from 'cors'
import { pool } from './helpers/db.js'

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res) => {
    pool.query('select * from task', (error, result) => {
        if (error) {
            return res.status(500).json({error: error.message})
        }
        return res.status(200).json(result.rows)
    })
})

app.post('/create',(req,res) => {
    pool.query('insert into task (description) values ($1) returning *',
        [req.body.description],
        (error,result) => {
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: result.rows})
        }
    )
})

app.delete('/delete/:id',(req,res) => {
    const id = parseInt(req.params.id)
    pool.query('delete from task where id = $1',
        [id],
        (error,result) => {
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: id})
        }
    )
})

app.listen(port)