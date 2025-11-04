import { Plus } from 'lucide-react';

export default function GoalsHeader({ onAddGoalClick }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-2xl text-gray-800">Gerenciar Metas</h1>
      <button
        className="flex items-center gap-2 rounded-lg bg-[#2979FF] px-4 py-2 font-medium text-white shadow-[#2161E5]/50 shadow-lg transition-all hover:bg-[#2161E5]"
        onClick={onAddGoalClick}
        type="button"
      >
        <Plus className="h-5 w-5" /> Adicionar Meta
      </button>
    </div>
  );
}
