"use client";

interface ReviewDeleteButtonProps {
  reviewId: number;
  onDelete: (reviewId: number) => Promise<void>;
}

export default function ReviewDeleteButton({ reviewId, onDelete }: ReviewDeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      await onDelete(reviewId);
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