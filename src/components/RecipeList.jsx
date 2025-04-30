import { useEffect, useState } from 'react';
import '../index.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recipes');
    if (saved) {
      setRecipes(JSON.parse(saved));
    }
  }, []);

  if (recipes.length === 0) {
    return <p style={styles.empty}>У вас поки що немає жодного рецепта 😢</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Мої рецепти</h2>
      <div style={styles.list}>
        {recipes.map((recipe, index) => (
          <div key={index} style={styles.card}>
            {recipe.image && <img src={recipe.image} alt={recipe.title} style={styles.image} />}
            <h3>{recipe.title}</h3>
            <p><strong>Порцій:</strong> {recipe.portions}</p>
            <p><strong>Опис:</strong> {recipe.description}</p>
            <ul>
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '30px auto',
    padding: '10px',
    color: 'black',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    width: '250px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  empty: {
    textAlign: 'center',
    marginTop: '40px',
    fontSize: '18px',
    color: '#666',
  }
};

export default RecipeList;
