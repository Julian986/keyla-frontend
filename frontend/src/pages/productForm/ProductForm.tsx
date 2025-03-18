import React, { useState } from "react";
import axios from "axios";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import imgRemove from '../../../public/removeBg2.png';
import ImageRotator from "@/components/imageRotator/ImageRotator";
import "./productForm.css";

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    brand: "",
    image: null as string | null,  // Cambié a null para manejar el archivo de imagen
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageWithoutBg, setImageWithoutBg] = useState<string | null>(null);
  const [showRotator, setShowRotator] = useState(false); // Estado para mostrar el rotador
  const [imageToRotate, setImageToRotate] = useState<string | null>(null); // Imagen a rotar

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToRotate(reader.result as string); // Mostrar la imagen en el rotador
        setShowRotator(true); // Mostrar el rotador
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = (croppedImage: string) => {
    setProduct((prev) => ({ ...prev, image: croppedImage }));
    setShowRotator(false); // Ocultar el rotador
  };

  const handleCancel = () => {
    setImageToRotate(null);
    setShowRotator(false); // Ocultar el rotador
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Agregar todos los campos del producto al FormData
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("stock", product.stock);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    if (product.image) {
      // Convertir la imagen Base64 a un archivo
      const file = await fetch(product.image)
        .then((res) => res.blob())
        .then((blob) => new File([blob], "image.png", { type: "image/png" }));
      formData.append("image", file);
    }

    try {
      const response = await axios.post("http://localhost:4500/products/publish", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const imageUrl = response.data.imageWithoutBg;
      setImageWithoutBg(imageUrl);

      alert("Producto agregado con éxito");
      setProduct({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        brand: "",
        image: null,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al agregar producto");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="productContainer flex items-center justify-center min-h-screen p-6">
        <div className="productForm w-full max-w-3xl p-6 shadow-lg rounded-2xl">
          <h2 className="productFormTitle text-xl font-semibold text-gray-800 mb-4">
            Add new product
          </h2>
          <p className="productFormDesc">You must remove the background from the image to upload it.</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4 mb-4">
              {/* Área de la imagen clickeable */}
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="imgProdFormContainer bg-gray-200 relative">
                  {imageWithoutBg ? (
                    <img
                      src={imageWithoutBg}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  ) : product.image ? (
                    <img 
                      src={product.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">Click to upload image</span>
                  )}
                </div>
              </label>

              <div className="imageRemoveContainer">
                <a href="https://www.remove.bg/es/upload" target="_blank">
                  <img src={imgRemove} className="imgRemove" alt="Remove background example" />
                </a>
              </div>

              {/* Input de tipo file oculto */}
              <input
                id="image-upload"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={showRotator}
              />
            </div>
            
            {showRotator && imageToRotate && (
              <div className="rotator-modal">
              <ImageRotator
                image={imageToRotate}
                onSave={handleSaveImage}
                onCancel={handleCancel}
                />
                </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nombre del producto"
                value={product.name}
                onChange={handleChange}
                className="border p-2 rounded productoInput"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={product.price}
                onChange={handleChange}
                className="border p-2 rounded productoInput"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Descripción"
                value={product.description}
                onChange={handleChange}
                className="col-span-2 border p-2 rounded productoInput"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                className="border p-2 rounded productoInput"
                required
              />
              <input
                type="text"
                name="brand"
                placeholder="Marca"
                value={product.brand}
                onChange={handleChange}
                className="border p-2 rounded productoInput"
                required
              />
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="border p-2 rounded productoInput"
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="Teclados">Teclados</option>
                <option value="Monitores">Monitores</option>
                <option value="Placas de Video">Placas de Video</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2"
              disabled={loading}
            >
              {loading ? "Agregando..." : "Agregar Producto"}
            </button>
          </form> 
        </div>
      </div>
      <Footer />
    </>
  );
}