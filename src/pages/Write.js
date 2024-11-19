import React, { useState, useEffect } from 'react';
import { app } from '../firebase';
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { getAuth, signOut } from "firebase/auth"; // Import signOut
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Write() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        id: null
    });
    const [products, setProducts] = useState([]);

    // Initialize database and auth
    const db = getDatabase(app);
    const auth = getAuth(app); // Initialize auth
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch products from Firebase on component mount
    useEffect(() => {
        const productsRef = ref(db, 'products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setProducts(productList);
        });
    }, [db]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission (Add or Update)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            // Update existing product
            const productRef = ref(db, `products/${formData.id}`);
            update(productRef, formData);
        } else {
            // Add new product
            const productsRef = ref(db, 'products');
            const newProductRef = push(productsRef);
            set(newProductRef, {
                name: formData.name,
                price: formData.price,
                image: formData.image
            });
        }
        setFormData({ name: '', price: '', image: '', id: null });
    };

    // Handle edit
    const handleEdit = (product) => {
        setFormData(product);
    };

    // Handle delete
    const handleDelete = (id) => {
        const productRef = ref(db, `products/${id}`);
        remove(productRef);
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error("Logout Error:", error); // Log any errors
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Admin: Manage Gift Cards</h1>
            
            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 mb-4"
            >
                Logout
            </button>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    className="border mb-2"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    className="border mb-2"
                />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    className="border mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    {formData.id ? "Update Product" : "Add Product"}
                </button>
            </form>

            {/* Products List */}
            <h2 className="text-2xl font-bold mt-8">Products List</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b">
                            <td className="border px-4 py-2">{product.name}</td>
                            <td className="border px-4 py-2">${product.price}</td>
                            <td className="border px-4 py-2">
                                <a href={product.image} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                </a>
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-full"
                                    style={{ borderRadius: '10%' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-full"
                                    style={{ borderRadius: '10%' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Write;
