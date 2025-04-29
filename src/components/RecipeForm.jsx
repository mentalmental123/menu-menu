import { useState } from "react";

function RecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [portions, setPortions] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      ingredients,
      portions,
      description,
      image,
    };
    console.log("Recipe saved:", recipeData);

    // Збереження в LocalStorage
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = [...existingRecipes, recipeData];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setIngredients([""]);
    setPortions(1);
    setDescription("");
    setImage("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Додати новий рецепт</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Назва рецепту"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div style={styles.ingredientsSection}>
          <h4>Інгредієнти:</h4>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              style={styles.input}
              type="text"
              placeholder={`Інгредієнт ${index + 1}`}
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
          ))}
          <button
            type="button"
            style={styles.buttonSmall}
            onClick={addIngredientField}
          >
            + Додати інгредієнт
          </button>
        </div>

        <input
          style={styles.input}
          type="number"
          placeholder="Кількість порцій"
          value={portions}
          min="1"
          onChange={(e) => setPortions(e.target.value)}
          required
        />

        <textarea
          style={styles.textarea}
          placeholder="Опис рецепту"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Поле для завантаження фото */}
        <input
          style={{ marginBottom: "15px" }}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Попередній перегляд фото */}
        {image && (
          <img src={image} alt="Перегляд фото" style={styles.preview} />
        )}

        <button type="submit" style={styles.button}>
          Зберегти рецепт
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    height: "120px",
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  ingredientsSection: {
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonSmall: {
    padding: "8px 14px",
    fontSize: "14px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
    cursor: "pointer",
  },
  preview: {
    width: "100%",
    marginBottom: "15px",
    objectFit: "cover",
    borderRadius: "4px",
  },
};

export default RecipeForm;
