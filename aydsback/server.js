const express = require('express')
const cors = require('cors')
const {mongoose } = require('mongoose')



const app = express()

app.use(cors());

app.use(express.json());





mongoose.connect('mongodb+srv://rafaelarango66:Arangorafa123@ayds.ac9nr1v.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error(err);
});

app.get('/prueba', (req,res) => {
    res.send('Hola, estoy funcionando')
})

app.get('/prueba2', (req,res) => {
    res.send('Hola, estoy funcionando :) :)')
})

//Encontrar producto
app.get('/products', async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Crear producto
app.post('/products', async(req,res)=> {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Encontrar producto por id
app.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'no existe el producto con id ${id}'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Eliminar un producto
app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'no existe el producto con id ${id}'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

//--------------------------
//Encontrar usuario 
app.get('/users', async(req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Crear usuario
app.post('/users', async(req,res)=> {
    try {
        const users = await User.create(req.body)
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//Encontrar usuario por id
app.get('/users/:usuario', async(req,res)=>{
    try {
        const {usuario} = req.params;
        const users = await User.find({usuario:usuario})
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a usuario
app.put('/users/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const users = await User.findByIdAndUpdate(id, req.body);
        if(!users){
            return res.status(404).json({message: 'no existe el usuario con id ${id}'})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Eliminar un usuario
app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: 'no existe el usuario con id ${id}'})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

const userSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true,'Ingrese el nombre del usuario']
        },
        apellido: {
            type: String,
            required: [true,'Ingrese el apellido del usuario']
        },
        email: {
            type: String,
            required: [true,'Ingrese el email del usuario']
        },
        usuario: {
            type: String,
            required: [true,'Ingrese el usuario del usuario']
        },
        contrasena: {
            type: String,
            required: [true,'Ingrese la contrasena del usuario']
        },
        
    }
)

const productSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true,'Ingrese el nombre del producto']
        },
        cantidad: {
            type: Number,
            required: true,
            default: 0
        },
        disponibilidad: {
            type: Boolean,
            default: true
        },
        descripcion:{
            type: String
        },
        precio:{
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },{
        timestamp: true
    }

)

const Product = mongoose.model('products', productSchema)
const User = mongoose.model('user', userSchema )

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
