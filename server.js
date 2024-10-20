// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
const mongoURI = 'mongodb://localhost:27017/'; // Remplacez par votre chaîne de connexion MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Définir le schéma et le modèle pour les produits
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    addDate: { type: Date, required: true },
    batchNumber: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

// Route pour obtenir tous les produits
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route pour ajouter un produit
app.post('/api/products', async (req, res) => {
    const { productName, addDate, batchNumber } = req.body;
    const newProduct = new Product({ productName, addDate, batchNumber });
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
