import React from 'react';
import { ContentItem } from '../types';

interface LessonFormProps {
  item: Partial<ContentItem>;
  onUpdate: (item: Partial<ContentItem>) => void;
}

export default function LessonForm({ item, onUpdate }: LessonFormProps) {
  const handleContentUpdate = (field: string, value: any) => {
    onUpdate({
      ...item,
      content: { ...item.content, [field]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">レッスンタイトル</label>
        <input
          type="text"
          value={item.title || ''}
          onChange={(e) => onUpdate({ ...item, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">説明</label>
        <textarea
          value={item.content?.description || ''}
          onChange={(e) => handleContentUpdate('description', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">難易度</label>
        <select
          value={item.content?.difficulty || ''}
          onChange={(e) => handleContentUpdate('difficulty', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        >
          <option value="">選択してください</option>
          <option value="beginner">初級</option>
          <option value="intermediate">中級</option>
          <option value="advanced">上級</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">目標学習時間（分）</label>
        <input
          type="number"
          min="0"
          value={item.content?.estimatedTime || ''}
          onChange={(e) => handleContentUpdate('estimatedTime', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">学習目標</label>
        <textarea
          value={item.content?.objectives?.join('\n') || ''}
          onChange={(e) => handleContentUpdate('objectives', e.target.value.split('\n'))}
          placeholder="各行に1つの学習目標を入力してください"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          rows={4}
        />
      </div>
    </div>
  );
}