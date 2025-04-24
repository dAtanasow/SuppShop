import { useParams } from "react-router-dom";
import { useCreateProduct } from "../hooks/useProducts";
import FormField from "./FormField";

export default function CreateEditProduct() {
  const { productId } = useParams();
  const { isEdit, error, formErrors, values, changeHandler, submitHandler } =
    useCreateProduct(productId);

  return (
    <div className="min-h-screen bg-white sm:bg-gray-100 p-5 sm:grid sm:place-items-center">
      <form
        onSubmit={submitHandler}
        className="bg-white p-0 sm:p-8 m-0 sm:m-3 sm:rounded-lg sm:shadow-lg w-full sm:max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isEdit ? "Edit Product" : "Create Product"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {Object.keys(formErrors).length > 0 && (
          <div className="text-red-500 text-center mb-4">
            {Object.values(formErrors).map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField
            id="title"
            label="Title"
            type="text"
            value={values.title}
            onChange={changeHandler}
            error={formErrors.title}
            isRequired
          />
          <FormField
            id="imgURL"
            label="Image URL"
            type="text"
            value={values.imgURL}
            onChange={changeHandler}
            error={formErrors.imgURL}
            isRequired
          />

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="bcaa">BCAA</option>
              <option value="bone health">Bone Health</option>
              <option value="caffeine">Caffeine</option>
              <option value="cla">CLA</option>
              <option value="collagen">Collagen</option>
              <option value="creatine">Creatine</option>
              <option value="citrulline">Citrulline</option>
              <option value="diuretics">Diuretics</option>
              <option value="energy drink">Energy Drink</option>
              <option value="equipment">Equipment</option>
              <option value="fat burner">Fat Burner</option>
              <option value="fish oil">Fish Oil</option>
              <option value="gainer">Gainer</option>
              <option value="glutamine">Glutamine</option>
              <option value="green foods">Green foods</option>
              <option value="L-Carnitine">L-Carnitine</option>
              <option value="multivitamins">Multivitamins</option>
              <option value="pre workout">Pre Workout</option>
              <option value="probiotics">Probiotics</option>
              <option value="protein">Protein</option>
              <option value="protein bars">Protein Bars</option>
              <option value="shakers">Shakers</option>
              <option value="stress relief">Stress relief</option>
              <option value="superfoods">Superfoods</option>
              <option value="testosterone booster">Testosterone Booster</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={values.brand}
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>
                Select brand
              </option>
              <option value="6AM Run">6AM Run</option>
              <option value="All Black Everything">All Black Everything</option>
              <option value="Ancient">Ancient</option>
              <option value="Barebells">Barebells</option>
              <option value="Bodybuilding.com Signature">
                Bodybuilding.com Signature
              </option>
              <option value="BPI Sports">BPI Sports</option>
              <option value="BSN">BSN</option>
              <option value="Cellucor">Cellucor</option>
              <option value="Dymatize">Dymatize</option>
              <option value="EHP">EHP</option>
              <option value="Evlution">Evlution</option>
              <option value="Happy Hydrate">Happy Hydrate</option>
              <option value="Ice Shaker">Ice Shaker</option>
              <option value="Jocko Fuel">Jocko Fuel</option>
              <option value="Kaged">Kaged</option>
              <option value="Kodagenix">Kodagenix</option>
              <option value="Me Today">Me Today</option>
              <option value="MRI Performance">MRI Performance</option>
              <option value="MuscleSport">MuscleSport</option>
              <option value="Mutant">Mutant</option>
              <option value="Nutrex">Nutrex</option>
              <option value="PANDA">PANDA</option>
              <option value="Pro Supps">Pro Supps</option>
              <option value="Prolab">Prolab</option>
              <option value="REMIX">REMIX</option>
              <option value="Ryse">Ryse</option>
              <option value="SNAP">SNAP</option>
              <option value="Unmatched">Unmatched</option>
              <option value="Vitargo">Vitargo</option>
              <option value="Xtend">Xtend</option>
            </select>
          </div>

          <FormField
            id="flavour"
            label="Flavour"
            type="text"
            value={values.flavour}
            onChange={changeHandler}
            error={formErrors.flavour}
            isRequired
          />

          <FormField
            id="price"
            label="Price"
            type="number"
            value={values.price}
            onChange={changeHandler}
            error={formErrors.price}
            isRequired
          />

          <FormField
            id="weight"
            label="Weight (in grams)"
            type="number"
            value={values.weight}
            onChange={changeHandler}
            error={formErrors.weight}
            isRequired
          />

          <FormField
            id="servings"
            label="Servings"
            type="number"
            value={values.servings}
            onChange={changeHandler}
            error={formErrors.servings}
            isRequired
          />

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-700"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={values.ingredients}
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="directions"
              className="block text-sm font-medium text-gray-700"
            >
              Directions
            </label>
            <textarea
              id="directions"
              name="directions"
              value={values.directions}
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="warnings"
              className="block text-sm font-medium text-gray-700"
            >
              Warnings
            </label>
            <textarea
              id="warnings"
              name="warnings"
              value={values.warnings}
              onChange={changeHandler}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
        >
          {isEdit ? "Save Changes" : "Create Product"}
        </button>
      </form>
    </div>
  );
}
