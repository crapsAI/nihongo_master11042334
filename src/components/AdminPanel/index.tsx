import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import ContentForm from './ContentForm';
import { ContentItem, ContentType } from './types';

const mockLessons = [
  { id: 'lesson1', title: 'レッスン1: 自己紹介' },
  { id: 'lesson2', title: 'レッスン2: 買い物' },
  { id: 'lesson3', title: 'レッスン3: 日常生活' }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<ContentType>('lesson');
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<ContentItem>>({
    type: 'lesson',
    title: '',
    content: {}
  });

  const handleSave = () => {
    if (newItem.title && newItem.type) {
      const item: ContentItem = {
        id: Date.now().toString(),
        type: newItem.type,
        title: newItem.title,
        content: newItem.content
      };
      setContents([...contents, item]);
      setNewItem({ type: activeTab, title: '', content: {} });
    }
  };

  const handleDelete = (id: string) => {
    setContents(contents.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">コンテンツ管理</h2>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {(['lesson', 'vocabulary', 'grammar', 'comprehensive'] as ContentType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setNewItem({ type: tab, title: '', content: {} });
                  }}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab === 'lesson' && 'レッスン'}
                  {tab === 'vocabulary' && '単語'}
                  {tab === 'grammar' && '文法'}
                  {tab === 'comprehensive' && '総合問題'}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="space-y-6">
          <ContentForm
            type={activeTab}
            item={newItem}
            onUpdate={setNewItem}
            onSave={handleSave}
            existingLessons={mockLessons}
          />

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">コンテンツ一覧</h3>
            <div className="space-y-4">
              {contents
                .filter(item => item.type === activeTab)
                .map(item => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <pre className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                      {JSON.stringify(item.content, null, 2)}
                    </pre>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}