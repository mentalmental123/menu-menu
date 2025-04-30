// RecipeSearchBar.jsx
import { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../styles/RecipeSearchBar.css';

function DraggableRecipe({ recipe }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: recipe.title,
    data: recipe,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="recipe-draggable-card"
      onClick={() => console.log('Рецепт:', recipe)}
    >
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <div className="overlay-text">{recipe.title}</div>
    </div>
  );
}

function RecipeSearchBar({ added }) {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('recipes');
    if (saved) {
      setRecipes(JSON.parse(saved));
    }
  }, []);

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) &&
    !added.find((a) => a.title === r.title)
  );

  return (
    <div className="search-bar-wrapper">
      <input
        type="text"
        placeholder="Пошук рецептів..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="recipe-scroll-list">
        {filtered.map((recipe) => (
          <DraggableRecipe key={recipe.title} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeSearchBar;
