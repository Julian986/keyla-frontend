import { useState } from "react";
import { Form, Card } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import "./FilterSidebar.css"

interface Filters {
  category: string[];
  brand: string[];
  size: string[];
}

const FilterSidebar = () => {
  const [filters, setFilters] = useState<Filters>({
    category: [],
    brand: [],
    size: [],
  });

  // Estado para manejar si cada sección está abierta o cerrada
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value];

      return { ...prevFilters, [type]: updatedFilters };
    });
  };

  return (
    <Card className="p-3 shadow-sm sideContainer">
       <h5 className="fw-bold mb-3 sideTitle">FILTROS</h5>
 
      {/* Categoría */}
      <div className="mb-3">
        <button
          className="d-flex justify-content-between align-items-center w-100 border-0 bg-transparent p-0"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <h6 className="fw-bold mb-0 titleSidebar">Producto</h6>
          {isCategoryOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isCategoryOpen && (
          <div className="mt-2">
            {["Zapatillas", "Botitas", "Ojotas"].map((category) => (
              <Form.Check
                key={category}
                type="checkbox"
                label={category}
                onChange={() => handleFilterChange("category", category)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Marca */}
      <div className="mb-3">
        <button
          className="d-flex justify-content-between align-items-center w-100 border-0 bg-transparent p-0"
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
          <h6 className="fw-bold mb-0 titleSidebar">Marca</h6>
          {isBrandOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isBrandOpen && (
          <div className="mt-2">
            {[
              "Adidas Originals",
              "Nike Sportswear",
              "Puma",
              "Fila",
              "Jordan",
              "Reebok",
              "New Balance",
              "Converse",
              "Skechers",
            ].map((brand) => (
              <Form.Check
                key={brand}
                type="checkbox"
                label={brand}
                onChange={() => handleFilterChange("brand", brand)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Talle */}
      <div className="mb-3">
        <button
          className="d-flex justify-content-between align-items-center w-100 border-0 bg-transparent p-0"
          onClick={() => setIsSizeOpen(!isSizeOpen)}
        >
          <h6 className="fw-bold mb-0 titleSidebar">Precio</h6>
          {isSizeOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isSizeOpen && (
          <div className="mt-2">
            {[
              "34",
              "35",
              "36",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
            ].map((size) => (
              <Form.Check
                key={size}
                type="checkbox"
                label={size}
                onChange={() => handleFilterChange("size", size)}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default FilterSidebar;
