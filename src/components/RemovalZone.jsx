import { useDroppable } from '@dnd-kit/core';

function RemoveZone({ id }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="removal-zone">
      🗑️ Перетягни сюди, щоб видалити зі слоту або повернути в пошук
    </div>
  );
}

export default RemoveZone;
