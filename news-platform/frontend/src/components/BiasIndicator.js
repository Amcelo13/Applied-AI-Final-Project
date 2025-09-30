import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { getBiasCategory, getBiasProgress } from '../utils/helpers';

const BiasIndicator = ({ 
  biasScore, 
  confidence, 
  size = 'medium', 
  showLabel = true, 
  showDetails = false,
  className = ''
}) => {
  if (biasScore === undefined || biasScore === null) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <Info className="h-4 w-4 text-gray-500" />
        </div>
        {showLabel && <span className="text-sm text-gray-500">No bias data</span>}
      </div>
    );
  }

  const biasCategory = getBiasCategory(biasScore);
  const progress = getBiasProgress(biasScore);

  const sizeClasses = {
    small: 'w-12 h-3',
    medium: 'w-20 h-4',
    large: 'w-32 h-6'
  };

  const dotSizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Bias Scale Visualization */}
      <div className="flex items-center space-x-2">
        <div className={`relative bg-gradient-to-r from-blue-500 via-gray-300 to-red-500 rounded-full ${sizeClasses[size]}`}>
          {/* Position indicator */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: `${(progress.percentage / 100) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute top-[15%] transform -translate-y-1/2 -translate-x-1/2 bg-white border-2 border-gray-600 rounded-full shadow-md ${dotSizeClasses[size]}`}
            style={{ left: `${progress.percentage}%` }}
          />
        </div>

        {/* Bias Score */}
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-900">
            {Math.round(biasScore)}
          </div>
          {confidence && (
            <div className="text-xs text-gray-500">
              {Math.round(confidence * 100)}%
            </div>
          )}
        </div>
      </div>

      {/* Bias Label */}
      {showLabel && (
        <div className="flex flex-col">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${biasCategory.bgColor} ${biasCategory.textColor} ${biasCategory.borderColor}`}>
            {biasCategory.shortLabel}
          </span>
          {/* {showDetails && confidence && (
            <span className="text-xs text-gray-500 mt-1">
              Confidence: {Math.round(confidence * 100)}%
            </span>
          )} */}
        </div>
      )}
    </div>
  );
};

// Bias Scale Legend Component
export const BiasLegend = ({ className = '' }) => {
  const categories = [
    { score: 10, label: 'Liberal' },
    { score: 30, label: 'Center-Left' },
    { score: 50, label: 'Neutral' },
    { score: 70, label: 'Center-Right' },
    { score: 90, label: 'Conservative' }
  ];

  return (
    <div className={`bg-white rounded-lg p-4 border border-gray-200 ${className}`}>
      <h4 className="text-sm font-semibold text-gray-900 mb-3">Bias Scale</h4>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.score} className="flex items-center justify-between">
            <BiasIndicator 
              biasScore={category.score} 
              size="small" 
              showLabel={false}
            />
            <span className="text-sm text-gray-600 ml-3">{category.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        <p>• 0-20: Highly Liberal</p>
        <p>• 21-40: Liberal</p>
        <p>• 41-60: Neutral/Centrist</p>
        <p>• 61-80: Conservative</p>
        <p>• 81-100: Highly Conservative</p>
      </div>
    </div>
  );
};

// Simplified Bias Badge Component
export const BiasBadge = ({ biasScore, size = 'sm' }) => {
  if (biasScore === undefined || biasScore === null) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Unknown
      </span>
    );
  }

  const biasCategory = getBiasCategory(biasScore);
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${biasCategory.bgColor} ${biasCategory.textColor} ${biasCategory.borderColor} ${sizeClasses}`}>
      {biasCategory.shortLabel} ({Math.round(biasScore)})
    </span>
  );
};

export default BiasIndicator;
