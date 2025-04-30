import { useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import MealPlanner from './components/MealPlanner';

function App() {
  const [view, setView] = useState('form'); // form | list | calendar

  return (
    <div>
      {/* Навігаційне меню */}
      <nav style={{ display: 'flex', gap: '10px', padding: '20px', justifyContent: 'center' }}>
        <button onClick={() => setView('form')}>➕ Додати рецепт</button>
        <button onClick={() => setView('list')}>📋 Мої рецепти</button>
        <button onClick={() => setView('calendar')}>🗓️ Календар</button>
      </nav>

      {/* Відображення вибраного розділу */}
      {view === 'form' && <RecipeForm />}
      {view === 'list' && <RecipeList />}
      {view === 'calendar' && <MealPlanner />}
    </div>
  );
}

export default App;


