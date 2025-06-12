"use client";

interface VillaDeleteButtonProps {
  villaId: number;
  onDelete: (villaId: number) => Promise<void>;
}

export default function VillaDeleteButton({ villaId, onDelete }: VillaDeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm('Bu villayı silmek istediğinize emin misiniz?')) {
      await onDelete(villaId);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Sil
    </button>
  );
}