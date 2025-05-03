import { useDroppable } from '@dnd-kit/core';
import DraggableRecipeCard from './DraggableRecipeCard';

function DroppableSlot({ id, label, recipe }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="calendar-slot"
      style={{ backgroundColor: isOver ? '#eef' : undefined }}
    >
      <p className="slot-label">{label}</p>
      {recipe && (
        <DraggableRecipeCard id={id + '-drag'} recipe={recipe} />
      )}
    </div>
  );
}

export default DroppableSlot;
