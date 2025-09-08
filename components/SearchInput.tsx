'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export function SearchInput({
  placeholder = 'Search legal terms, guides...',
  value = '',
  onChange,
  onClear,
  className = ''
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className={`
        flex items-center space-x-3 bg-surface border rounded-lg px-4 py-3 transition-all duration-200
        ${isFocused ? 'border-primary shadow-md' : 'border-gray-200'}
      `}>
        <Search className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-primary' : 'text-text-secondary'}`} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent text-base text-text-primary placeholder-text-secondary focus:outline-none"
        />
        {value && (
          <button
            onClick={onClear}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        )}
      </div>
    </div>
  );
}
