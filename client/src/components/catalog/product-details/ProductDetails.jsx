import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetOneProduct } from "../../../hooks/useProducts";
import ToggleSection from "./ToggleSection.jsx";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product] = useGetOneProduct(productId);

  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
  const [isIngredientsOpen, setIngredientsOpen] = useState(false);
  const [isWarningsOpen, setWarningsOpen] = useState(false);
  const [isDirectionsOpen, setDirectionsOpen] = useState(false);

  const toggleDescription = () => setDescriptionOpen(!isDescriptionOpen);
  const toggleIngredients = () => setIngredientsOpen(!isIngredientsOpen);
  const toggleWarnings = () => setWarningsOpen(!isWarningsOpen);
  const toggleDirections = () => setDirectionsOpen(!isDirectionsOpen);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 md:flex">
        <div className="w-full md:w-1/2 p-4">
          {product.imgURL ? (
            <img
              src={product.imgURL}
              alt={product.title}
              className="w-auto h-155 object-cover rounded-sm shadow-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.title}
          </h1>

          <div className="text-xl font-semibold text-gray-800 mb-4">
            <span>${product.price}</span>
          </div>

          <div className="mb-6">
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-lg">
              {product.category && (
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
              )}
              {product.brand && (
                <li>
                  <strong>Brand:</strong> {product.brand}
                </li>
              )}
              {product.flavour && (
                <li>
                  <strong>Flavour:</strong> {product.flavour}
                </li>
              )}
              {product.weight && (
                <li>
                  <strong>Weight:</strong> {product.weight}g
                </li>
              )}
              {product.servings && (
                <li>
                  <strong>Servings:</strong> {product.servings}
                </li>
              )}
            </ul>
          </div>

          <ToggleSection
            title="Description"
            content={product.description}
            isOpen={isDescriptionOpen}
            toggle={toggleDescription}
          />
          <ToggleSection
            title="Ingredients"
            content={product.ingredients}
            isOpen={isIngredientsOpen}
            toggle={toggleIngredients}
          />
          <ToggleSection
            title="Directions"
            content={product.directions}
            isOpen={isDirectionsOpen}
            toggle={toggleDirections}
          />
          <ToggleSection
            title="Warnings"
            content={product.warnings}
            isOpen={isWarningsOpen}
            toggle={toggleWarnings}
          />
        </div>
      </div>
    </>
  );
}
