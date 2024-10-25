import React, { useState } from 'react';
import { ChampionClass } from '../../../utils/championData';

interface ChampionFormProps {
  championClass: string;
  onClose: () => void;
  rarity: 'sixStar' | 'sevenStar';
}

export const ChampionForm: React.FC<ChampionFormProps> = ({
  championClass,
  onClose,
  rarity,
}) => {
  const [name, setName] = useState('');
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);

  const rankOptions = rarity === 'sixStar'
    ? ['Rank 4', 'Rank 5', 'Rank 6 (Ascended)']
    : ['Rank 1', 'Rank 2', 'Rank 3'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add champion logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New {championClass} Champion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Champion Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Available Ranks</label>
            {rankOptions.map((rank) => (
              <label key={rank} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedRanks.includes(rank)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRanks([...selectedRanks, rank]);
                    } else {
                      setSelectedRanks(selectedRanks.filter((r) => r !== rank));
                    }
                  }}
                />
                <span>{rank}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Add Champion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};