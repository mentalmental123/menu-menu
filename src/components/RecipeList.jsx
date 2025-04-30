import { useEffect, useState } from 'react';
import '../styles/RecipeList.css';
import EditableRecipeForm from './EditableRecipeForm';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('recipes');
    if (saved) {
      setRecipes(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (indexToDelete) => {
    const updated = recipes.filter((_, i) => i !== indexToDelete);
    setRecipes(updated);
    localStorage.setItem('recipes', JSON.stringify(updated));
    setSelectedIndex(null);
  };

  const handleUpdate = (index, updatedRecipe) => {
    const updated = [...recipes];
    updated[index] = updatedRecipe;
    setRecipes(updated);
    localStorage.setItem('recipes', JSON.stringify(updated));
    setSelectedIndex(null);
  };

  return (
    <div className="recipe-list-wrapper">
      {selectedIndex === null && (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <div className="image-wrapper" onClick={() => setSelectedIndex(index)}>
                {recipe.image && <img src={recipe.image} alt="thumb" />}
              </div>
              <div className="recipe-content">
                <h3>{recipe.title}</h3>
                <p>
                  {recipe.description.length > 100
                    ? `${recipe.description.slice(0, 100)}...`
                    : recipe.description}
                </p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(index)}>✖</button>
            </div>
          ))}
        </div>
      )}

      {selectedIndex !== null && (
        <EditableRecipeForm
          mode="edit"
          initialData={recipes[selectedIndex]}
          onSubmit={(updatedRecipe) => handleUpdate(selectedIndex, updatedRecipe)}
          onCancel={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}

export default RecipeList;
