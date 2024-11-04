import React from 'react';
import { ContentItem } from '../types';

interface GrammarFormProps {
  item: Partial<ContentItem>;
  onUpdate: (item: Partial<ContentItem>) => void;
  existingLessons: { id: string; title: string }[];
}

export default function GrammarForm({ item, onUpdate, existingLessons }: GrammarFormProps) {
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
        <label className="block text-sm font-medium text-gray-700">文法項目タイトル</label>
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
          value={item.content?.explanation || ''}
          onChange={(e) => handleContentUpdate('explanation', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">例文</label>
        <textarea
          value={item.content?.examples?.map(ex => 
            `${ex.japanese}\n${ex.reading || '-'}\n${ex.english}`
          ).join('\n---\n') || ''}
          onChange={(e) => {
            const examples = e.target.value.split('---\n').map(block => {
              const [japanese, reading, english] = block.trim().split('\n');
              return {
                japanese,
                reading: reading === '-' ? undefined : reading,
                english
              };
            });
            handleContentUpdate('examples', examples);
          }}
          placeholder="形式:&#13;日本語&#13;読み方（なければ-）&#13;英語&#13;---&#13;次の例文"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          rows={8}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">練習問題</label>
        <textarea
          value={item.content?.exercises?.map(ex =>
            `${ex.question}\n${ex.options.join('/')}\n${ex.correct}`
          ).join('\n---\n') || ''}
          onChange={(e) => {
            const exercises = e.target.value.split('---\n').map(block => {
              const [question, options, correct] = block.trim().split('\n');
              return {
                question,
                options: options.split('/'),
                correct: parseInt(correct)
              };
            });
            handleContentUpdate('exercises', exercises);
          }}
          placeholder="形式:&#13;問題文&#13;選択肢1/選択肢2/選択肢3/選択肢4&#13;正解の番号(0から開始)&#13;---&#13;次の問題"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          rows={8}
        />
      </div>
    </div>
  );
}