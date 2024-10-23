//IMPORTACION DEL EXPRESS
//===============================================================================================

const express = require('express')
const app = express()

app.use(express.json())

//CREACION DE LA DATABASE
//===============================================================================================
const motos = [

    {id: 1, marca:'Yamaha', referencia:'XT 660', potencia: '48 hp'},
    {id: 2, marca:'Suzuki', referencia:'DR 650', potencia: '45 hp'},
    {id: 3, marca:'BMW', referencia:'GS 800', potencia: '72 hp'},
    {id: 4, marca:'Yamaha', referencia:'MT 09', potencia: '119 hp'},

]

//GET
//===============================================================================================
app.get('/api', (req, res) => res.send('Esta api contiene una lista de motos'))
app.get('/api/motos', (req, res) => res.send(motos))

app.get('/api/motos/:id', (req, res) => {
    const moto = motos.find(m => m.id === parseInt(req.params.id,10))

    if(!moto){
        res.status(404).send('not found')
    }else {res.status(200).json(moto)}
})
//POST
//==================================================================================================
app.post('/api/motos', (req, res) => {
    const {marca, referencia, potencia} = req.body

    if(!marca || !referencia || !potencia){
        return res.status(400).send('marca, referencia o potencia son requeridos')
    }

    const nuevaMoto = {
        id: motos.length + 1,
        marca, 
        referencia,
        potencia
    }

    motos.push(nuevaMoto)
    res.status(201).json(nuevaMoto)
})
//PUT
//===============================================================================================


app.put('/api/motos/:id', (req, res) =>{
    const moto = motos.find(m => m.id === parseInt(req.params.id,10))

    if(!moto){res.status(404).send('not found')}

    const {marca, referencia, potencia} = req.body

    if(!marca || !referencia || !potencia){
        return res.status(400).send('marca, referencia o potencia son requeridos')
    }

    moto.marca = marca
    moto.referencia = referencia
    moto.potencia = potencia

    res.status(200).json()
})
//DELETE
//==============================================================================================


app.delete('/api/motos/:id', (req, res) =>{
    const motoId = parseInt(req.params.id, 10)
    const motoIndex = motos.findIndex(m => m.id === motoId)

    if(motoIndex === -1){
        return res.status(404).send('moto no encontrada')
    }

    const deleteMoto = motos.splice(motoIndex, 1)
    return res.status(200).json({message: 'eliminda con exito'})
})

//ACTIVE SERVER
//===============================================================================================

app.listen(3000, () => {console.log('active port');})