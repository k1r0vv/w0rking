import React, { useState } from 'react';
import { ChampionClass } from '../../../types/champion';
import { Plus, Star } from 'lucide-react';
import { ClassIcon } from './ClassIcon';

interface ChampionsListProps {
  championClass: ChampionClass;
}

export const ChampionsList: React.FC<ChampionsListProps> = ({ championClass }) => {
  const [selectedRarity, setSelectedRarity] = useState<'6' | '7'>('6');
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <ClassIcon championClass={championClass} className="w-8 h-8" />
          <div>
            <h2 className="text-xl font-bold">{championClass} Champions</h2>
            <div className="flex space-x-4 mt-2">
              <button
                className={`px-4 py-2 rounded flex items-center ${
                  selectedRarity === '6' ? 'bg-blue-600' : 'bg-gray-700'
                }`}
                onClick={() => setSelectedRarity('6')}
              >
                <Star className="w-4 h-4 mr-2" />
                6★ Champions
              </button>
              <button
                className={`px-4 py-2 rounded flex items-center ${
                  selectedRarity === '7' ? 'bg-blue-600' : 'bg-gray-700'
                }`}
                onClick={() => setSelectedRarity('7')}
              >
                <Star className="w-4 h-4 mr-2" />
                7★ Champions
              </button>
            </div>
          </div>
        </div>
        <button
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Champion
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-gray-400 text-center py-8">
          Loading champions...
        </p>
      </div>
    </div>
  );
};