import fs from 'fs';

class ProductsManager {
    constructor(filePath = 'productos.json') {
        this.products = [];
        this.path = filePath;
        this.loadFromFile(this.path);
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock || !product.status || !product.category)
            return `Todos los campos del artículo con nombre "${product.title}" deben contener datos`

        const newProduct = this.products.find(prod => prod.code === product.code);
        if (newProduct) {
            console.log(`El código del artículo con nombre "${product.title}" no puede estar repetido`);
            return "No es posible cargar más de un producto con el mismo código"
        }

        product.id = this.products.length + 1
        this.products.push(product);
        console.log(`Se agregó el artículo con nombre "${product.title}" al arreglo`)

        this.saveToFile()

        return `${product.title} agregado`
    }

    getProductById(pid) {
        const otroProducto = this.products.find(prod => prod.id === pid)
        if (!otroProducto)
            return `El articulo seleccionado con ID "${pid}" no existe`

        return otroProducto
    }

    updateProduct(pid, updatedFields) {
        const productIndex = this.products.findIndex(prod => prod.id === pid);
        if (productIndex === -1) {
            throw new Error(`El artículo con ID "${pid}" no existe`);
        }

        // Validar que al menos un campo sea proporcionado
        if (!Object.keys(updatedFields).length) {
            throw new Error(`Debe proporcionar al menos un campo para actualizar`);
        }

        // Actualizar solo los campos proporcionados
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };

        this.saveToFile()

        return `El artículo con ID "${pid}" ha sido actualizado`;
    }

    deleteProduct(pid) {
        const eliminarProducto = this.products.filter(prod => prod.id !== pid)
        if (eliminarProducto) {
            console.log(`Se eliminó el artículo con ID "${pid}" del arreglo`)
            this.products = eliminarProducto
            this.saveToFile()
            return this.products//eliminarProducto
        }
    }

    saveToFile() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFile(this.path, data, 'utf8')
            .then(() => {
                console.log('Datos guardados en el archivo:', this.path);
            })
            .catch((error) => {
                console.error('Error al guardar datos en el archivo:', error);
            });
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            console.log(`Datos cargados desde el archivo: "${this.path}"`);
        } catch (error) {
            console.error('Error al cargar datos desde el archivo:', `El archivo "${this.path}" no está bien definido o no existe`);
            // Si hay un error al cargar desde el archivo, iniciar con un array vacío
            this.products = [];
        }
    }
}

//Crear una instancia de la clase ProductsManager
const productos = new ProductsManager();
// Mostrar la lista inicial de productos
//console.log(productos.getProducts());

const producto1 = { title: "producto 1", description: "Este es el primer producto de prueba", price: 1590, thumbnail: "Sin imagen", code: "abc123", stock: 25, status: true, category: "products" }

const producto2 = { title: "producto 2", description: "Este es otro producto de prueba", price: 2560, thumbnail: "Sin imagen", code: "abc1234", stock: 188,status: true, category: "products" }

const producto3 = { title: "producto 3", description: "Este es otro producto más de prueba", price: 400, thumbnail: "Sin imagen", code: "abc12345", stock: 20, status: true, category: "products" }

const producto4 = { title: "producto 4", description: "Este es el cuarto producto de prueba", price: 800, thumbnail: "Sin imagen", code: "abc123456", stock: 100, status: true, category: "products" }

const producto5 = { title: "producto 5", description: "Este es el quinto producto de prueba", price: 500, thumbnail: "Sin imagen", code: "abc1234567", stock: 100, status: true, category: "products" }

const producto6 = { title: "producto 6", description: "Este es el sexto producto de prueba", price: 5600, thumbnail: "Sin imagen", code: "abc12345678", stock: 100, status: true, category: "products" }

const producto7 = { title: "producto 7", description: "Este es el séptimo producto de prueba", price: 3200, thumbnail: "Sin imagen", code: "abc1234568", stock: 100, status: true, category: "products" }

const producto8 = { title: "producto 8", description: "Este es el octavo producto de prueba", price: 20, thumbnail: "Sin imagen", code: "abc1234569", stock: 100, status: true, category: "products" }

const producto9 = { title: "producto 9", description: "Este es el noveno producto de prueba", price: 70, thumbnail: "Sin imagen", code: "abc12345689", stock: 100, status: true, category: "products" }

const producto10 = { title: "producto 10", description: "Este es el décimo producto de prueba", price: 890, thumbnail: "Sin imagen", code: "abc12345679", stock: 100, status: true, category: "products" }

//Agregar algunos productos
// console.log(productos.addProduct(producto1));
// console.log(productos.addProduct(producto2));
// console.log(productos.addProduct(producto3));
// console.log(productos.addProduct(producto4));
// console.log(productos.addProduct(producto5));
// console.log(productos.addProduct(producto6));
// console.log(productos.addProduct(producto7));
// console.log(productos.addProduct(producto8));
// console.log(productos.addProduct(producto9));
// console.log(productos.addProduct(producto10));
// Mostrar la lista de productos ya agregados

// console.log(productos.getProducts());
// console.log(productos.deleteProduct(4));
//console.log(productos.getProducts());
// console.log(productos.getProductById(4))
// console.log(productos.updateProduct(1, {price:3250, stock:160}))
// console.log(productos.updateProduct(2, {price:305, stock:13}))
// console.log(productos.getProductById(3))

export default productos