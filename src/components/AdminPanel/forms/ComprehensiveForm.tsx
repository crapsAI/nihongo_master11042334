import React from 'react';
import { ContentItem } from '../types';

interface ComprehensiveFormProps {
  item: Partial<ContentItem>;
  onUpdate: (item: Partial<ContentItem>) => void;
  existingLessons: { id: string; title: string }[];
}

export default function ComprehensiveForm({ item, onUpdate, existingLessons }: ComprehensiveFormProps) {
  const questionTypes = [
    { value: 'choice', label: '選択問題' },
    { value: 'word-order', label: '語順並べ替え' },
    { value: 'translation', label: '和訳/英訳' },
    { value: 'dialogue', label: '会話完成' },
    { value: 'video-choice', label: '動画問題' }
  ];

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
        <label className="block text-sm font-medium text-gray-700">問題タイトル</label>
        <input
          type="text"
          value={item.title || ''}
          onChange={(e) => onUpdate({ ...item, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">問題タイプ</label>
        <select
          value={item.content?.type || ''}
          onChange={(e) => handleContentUpdate('type', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        >
          <option value="">選択してください</option>
          {questionTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {item.content?.type && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">問題文</label>
            <textarea
              value={item.content?.question || ''}
              onChange={(e) => handleContentUpdate('question', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              rows={3}
            />
          </div>

          {['choice', 'video-choice'].includes(item.content.type) && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">選択肢</label>
                <textarea
                  value={item.content?.options?.join('\n') || ''}
                  onChange={(e) => handleContentUpdate('options', e.target.value.split('\n'))}
                  placeholder="各行に1つの選択肢を入力してください"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">正解の選択肢番号</label>
                <input
                  type="number"
                  min="0"
                  value={item.content?.correct || ''}
                  onChange={(e) => handleContentUpdate('correct', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                />
              </div>
            </>
          )}

          {item.content.type === 'word-order' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">単語リスト</label>
              <textarea
                value={item.content?.words?.map(w => `${w.text},${w.order}`).join('\n') || ''}
                onChange={(e) => {
                  const words = e.target.value.split('\n').map(line => {
                    const [text, order] = line.split(',');
                    return { text, order: parseInt(order) };
                  });
                  handleContentUpdate('words', words);
                }}
                placeholder="形式: 単語,順番&#13;例:&#13;私は,1&#13;学生,2&#13;です。,3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                rows={4}
              />
            </div>
          )}

          {item.content.type === 'video-choice' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">動画URL</label>
              <input
                type="text"
                value={item.content?.video || ''}
                onChange={(e) => handleContentUpdate('video', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">解説</label>
            <textarea
              value={item.content?.explanation || ''}
              onChange={(e) => handleContentUpdate('explanation', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ヒント</label>
            <textarea
              value={item.content?.hint || ''}
              onChange={(e) => handleContentUpdate('hint', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              rows={2}
            />
          </div>
        </>
      )}
    </div>
  );
}