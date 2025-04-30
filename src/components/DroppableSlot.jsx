import { useDroppable } from '@dnd-kit/core';

function DroppableSlot({ id, label, recipe }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: '100px',
        padding: '10px',
        marginBottom: '10px',
        border: '2px dashed #ccc',
        backgroundColor: isOver ? '#e0f7fa' : '#f9f9f9',
        borderRadius: '8px',
      }}
    >
      <span style={{ fontWeight: 'bold' }}>{label}</span>
      <div style={{ marginTop: '5px' }}>
        {recipe ? (
          <div className="calendar-recipe">
            <img src={recipe.image} alt={recipe.title} />
            <div className="calendar-recipe-label">{recipe.title}</div>
          </div>
        ) : (
          <div className="slot-placeholder">+ Перетягни рецепт</div>
        )}
      </div>
    </div>
  );
}

export default DroppableSlot;
