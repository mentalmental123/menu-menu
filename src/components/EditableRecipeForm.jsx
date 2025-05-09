import { useState, useEffect } from 'react';
import '../styles/RecipeForm.css';

function EditableRecipeForm({ mode = 'add', initialData = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [portions, setPortions] = useState(1);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [showIngredients, setShowIngredients] = useState(false);

  const units = ['літри', 'кг', 'пачка', 'шт'];

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setIngredients(initialData.ingredients);
      setPortions(initialData.portions);
      setDescription(initialData.description);
      setImage(initialData.image);
      setShowIngredients(true);
    }
  }, [initialData]);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (indexToRemove) => {
    const updated = ingredients.filter((_, i) => i !== indexToRemove);
    setIngredients(updated);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = { title, ingredients, portions, description, image };

    if (mode === 'add') {
      const existing = JSON.parse(localStorage.getItem('recipes')) || [];
      localStorage.setItem('recipes', JSON.stringify([...existing, recipeData]));
      resetForm();
    } else if (mode === 'edit') {
      onSubmit(recipeData);
    }
  };

  const resetForm = () => {
    setTitle('');
    setIngredients([]);
    setPortions(1);
    setDescription('');
    setImage('');
    setShowIngredients(false);
  };

  return (
    <div className="recipe-form">
      <h2>{mode === 'edit' ? 'Редагувати рецепт' : 'Додати новий рецепт'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Назва рецепту</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        {!showIngredients && (
          <button type="button" onClick={() => { setShowIngredients(true); addIngredientField(); }}>
            Додати інгредієнти
          </button>
        )}

        {showIngredients && (
          <div className="ingredients-section">
            <h4>Інгредієнти:</h4>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <div className="input-group">
                  <label>Назва</label>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Кількість</label>
                  <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Одиниця</label>
                  <select
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    required
                  >
                    <option value="">Виберіть</option>
                    {units.map((unit, i) => (
                      <option key={i} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeIngredient(index)}
                >
                  ✖
                </button>
              </div>
            ))}
            <button type="button" onClick={addIngredientField}>
              + Додати ще інгредієнт
            </button>
          </div>
        )}

        <label>Кількість порцій</label>
        <input
          type="number"
          value={portions}
          min="1"
          onChange={(e) => setPortions(e.target.value)}
          required
        />

        <label>Опис рецепту</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Фото</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="preview" className="preview-image" />}

        <button type="submit">{mode === 'edit' ? 'Зберегти зміни' : 'Зберегти рецепт'}</button>

        {mode === 'edit' && (
          <button type="button" onClick={onCancel} style={{ marginTop: '10px' }}>
            ← Назад до списку
          </button>
        )}
      </form>
    </div>
  );
}

export default EditableRecipeForm;
