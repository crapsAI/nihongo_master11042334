import React from 'react';
import { ContentItem } from '../types';

interface VocabularyFormProps {
  item: Partial<ContentItem>;
  onUpdate: (item: Partial<ContentItem>) => void;
  existingLessons: { id: string; title: string }[];
}

export default function VocabularyForm({ item, onUpdate, existingLessons }: VocabularyFormProps) {
  const handleContentUpdate = (field: string, value: any) => {
    onUpdate({
      ...item,
      content: { ...item.content, [field]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">レッスン選択</label>
        <select
          value={item.content?.lessonId || ''}
          onChange={(e) => handleContentUpdate('lessonId', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        >
          <option value="">新規レッスンとして作成</option>
          {existingLessons.map(lesson => (
            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">単語セットタイトル</label>
        <input
          type="text"
          value={item.title || ''}
          onChange={(e) => onUpdate({ ...item, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">カテゴリー</label>
        <input
          type="text"
          value={item.content?.category || ''}
          onChange={(e) => handleContentUpdate('category', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">単語リスト</label>
        <textarea
          value={item.content?.words?.map(word => 
            `${word.japanese}\n${word.reading || '-'}\n${word.english}\n${word.category}`
          ).join('\n---\n') || ''}
          onChange={(e) => {
            const words = e.target.value.split('---\n').map(block => {
              const [japanese, reading, english, category] = block.trim().split('\n');
              return {
                japanese,
                reading: reading === '-' ? undefined : reading,
                english,
                category
              };
            });
            handleContentUpdate('words', words);
          }}
          placeholder="形式:&#13;日本語&#13;読み方（なければ-）&#13;英語&#13;カテゴリー&#13;---&#13;次の単語"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          rows={10}
        />
      </div>
    </div>
  );
}