import { useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

function App() {
  const [view, setView] = useState('form');

  return (
    <div>
      <nav style={{ textAlign: 'center', margin: '20px' }}>
        <button onClick={() => setView('form')} style={{ marginRight: '10px' }}>Додати рецепт</button>
        <button onClick={() => setView('list')}>Мої рецепти</button>
      </nav>

      {view === 'form' && <RecipeForm />}
      {view === 'list' && <RecipeList />}
    </div>
  );
}

export default App;
