import React from 'react';
import { Save } from 'lucide-react';
import LessonForm from './forms/LessonForm';
import VocabularyForm from './forms/VocabularyForm';
import GrammarForm from './forms/GrammarForm';
import ComprehensiveForm from './forms/ComprehensiveForm';
import { ContentItem, ContentType } from './types';

interface ContentFormProps {
  type: ContentType;
  item: Partial<ContentItem>;
  onUpdate: (item: Partial<ContentItem>) => void;
  onSave: () => void;
  existingLessons: { id: string; title: string }[];
}

export default function ContentForm({ type, item, onUpdate, onSave, existingLessons }: ContentFormProps) {
  const renderForm = () => {
    switch (type) {
      case 'lesson':
        return <LessonForm item={item} onUpdate={onUpdate} />;
      case 'vocabulary':
        return <VocabularyForm item={item} onUpdate={onUpdate} existingLessons={existingLessons} />;
      case 'grammar':
        return <GrammarForm item={item} onUpdate={onUpdate} existingLessons={existingLessons} />;
      case 'comprehensive':
        return <ComprehensiveForm item={item} onUpdate={onUpdate} existingLessons={existingLessons} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">新規作成</h3>
      {renderForm()}
      <div className="mt-4">
        <button
          onClick={onSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="h-4 w-4 mr-2" />
          保存
        </button>
      </div>
    </div>
  );
}