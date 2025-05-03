import { useDraggable } from '@dnd-kit/core';

function DraggableRecipeCard({ id, recipe }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: recipe,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="recipe-draggable-card"
    >
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <div className="overlay-text">{recipe.title}</div>
    </div>
  );
}

export default DraggableRecipeCard;
