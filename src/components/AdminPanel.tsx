import React, { useState } from 'react';
import { Plus, Save, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

type ContentType = 'lesson' | 'vocabulary' | 'grammar' | 'comprehensive';

interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  content: any;
}

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

  const renderForm = () => {
    switch (activeTab) {
      case 'lesson':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">レッスンタイトル</label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">説明</label>
              <textarea
                value={newItem.content?.description || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, description: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">難易度</label>
              <select
                value={newItem.content?.difficulty || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, difficulty: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              >
                <option value="">選択してください</option>
                <option value="beginner">初級</option>
                <option value="intermediate">中級</option>
                <option value="advanced">上級</option>
              </select>
            </div>
          </div>
        );

      case 'vocabulary':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">単語セットタイトル</label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">カテゴリー</label>
              <input
                type="text"
                value={newItem.content?.category || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, category: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">単語リスト</label>
              <textarea
                value={newItem.content?.words?.join('\n') || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, words: e.target.value.split('\n') }
                })}
                placeholder="各行に1つの単語を入力してください"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                rows={5}
              />
            </div>
          </div>
        );

      case 'grammar':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">文法項目タイトル</label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">説明</label>
              <textarea
                value={newItem.content?.explanation || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, explanation: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">例文</label>
              <textarea
                value={newItem.content?.examples?.join('\n') || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, examples: e.target.value.split('\n') }
                })}
                placeholder="各行に1つの例文を入力してください"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                rows={3}
              />
            </div>
          </div>
        );

      case 'comprehensive':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">総合問題タイトル</label>
              <input
                type="text"
                value={newItem.title || ''}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">問題文</label>
              <textarea
                value={newItem.content?.question || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, question: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">選択肢</label>
              <textarea
                value={newItem.content?.options?.join('\n') || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, options: e.target.value.split('\n') }
                })}
                placeholder="各行に1つの選択肢を入力してください"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">正解</label>
              <input
                type="number"
                min="0"
                value={newItem.content?.correct || ''}
                onChange={(e) => setNewItem({
                  ...newItem,
                  content: { ...newItem.content, correct: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>
        );
    }
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
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">新規作成</h3>
            {renderForm()}
            <div className="mt-4">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-4 w-4 mr-2" />
                保存
              </button>
            </div>
          </div>

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