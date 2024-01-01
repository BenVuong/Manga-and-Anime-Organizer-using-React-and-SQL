import express, { application } from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: 'books'
    }
)

app.get('/',(req, res)=>{
    const sql = "SELECT * FROM book";
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message:"error inside server"});
        return res.json(result)
    })
})


app.get('/read/:id',(req, res)=>{
    const sql = "SELECT * FROM book WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[id], (err, result)=>{
        if(err) return res.json({Message:"error inside server"});
        return res.json(result)
    })
})

app.post('/book',(req, res)=>{
    const sql = "INSERT INTO book (`name`,`amountCollected`,`volAmount`, `publisher`, `story`, `art`, `synopsis`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.amountCollected,
        req.body.totalVolumes,
        req.body.mangaPublisher,
        req.body.story,
        req.body.art,
        req.body.synopsis
    ]
    db.query(sql, [values], (err, result) =>{
        if(err) return res.json(err);
        return res.json(result);

    })
})

app.put('/edit/:id', (req, res)=>{
    const sql = "UPDATE book SET `name`=?, `amountCollected`=?, `volAmount`=?, `publisher`=?, `story`=?, `art`=?, `synopsis`=?  WHERE id=?";
    const id = req.params.id;
    db.query(sql, [
    req.body.name,
    req.body.amountCollected, 
    req.body.volAmount, 
    req.body.publisher,
    req.body.story,
    req.body.art,
    req.body.synopsis, 
    id], (err, result)=>
    {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })

})

app.delete('/delete/:id', (req, res)=>{
    const sql = "DELETE FROM book WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result)=>
    {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.listen(8081, ()=>{
    console.log("listeing");
})
