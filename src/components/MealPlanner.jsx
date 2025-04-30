// MealPlanner.jsx
import { useState } from 'react';
import '../styles/MealPlanner.css';
import RecipeSearchBar from './RecipeSearchBar';
import {
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import DroppableSlot from './DroppableSlot';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const mealSlots = ['Сніданок', 'Обід', 'Вечеря'];

function MealPlanner() {
  const [calendarData, setCalendarData] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [draggedRecipe, setDraggedRecipe] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    setDraggedRecipe(event.active.data.current);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const recipe = active.data.current;
    if (!recipe) return;

    const updated = { ...calendarData };

    if (over.id.startsWith('remove-zone')) {
      // Remove recipe from calendar
      for (const key in updated) {
        if (updated[key]?.title === recipe.title) {
          delete updated[key];
        }
      }
    } else {
      updated[over.id] = recipe;
    }

    setCalendarData(updated);
    setActiveId(null);
    setDraggedRecipe(null);
  };

  return (
    <div className="meal-planner">
      <h2>Календар страв</h2>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="planner-grid">
          {daysOfWeek.map((day, dayIndex) => (
            <div key={day} className="planner-day">
              <div className="planner-day-header">
                <strong>{day}</strong>
              </div>
              {mealSlots.map((slot, slotIndex) => {
                const slotId = `${dayIndex}-${slotIndex}`;
                const recipe = calendarData[slotId];
                return (
                  <DroppableSlot key={slotId} id={slotId} label={slot} recipe={recipe} />
                );
              })}
            </div>
          ))}
        </div>

        <div className="removal-zone-wrapper">
          <div className="removal-zone" id="remove-zone">
            🗑️ Перетягни сюди, щоб видалити зі слоту або повернути в пошук
          </div>
        </div>

        <RecipeSearchBar added={Object.values(calendarData)} />

        <DragOverlay>
          {draggedRecipe && (
            <div className="recipe-draggable-card drag-overlay">
              {draggedRecipe.image && (
                <img src={draggedRecipe.image} alt={draggedRecipe.title} />
              )}
              <div className="overlay-text">{draggedRecipe.title}</div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default MealPlanner;
