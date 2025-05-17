import React, { useState, useEffect } from 'react';
import { AssetForm } from './components/AssetForm';
import { AssetList } from './components/AssetList';
import { Asset, CreateAssetDto } from './types/asset';
import { AssetService, WarrantyService } from './services/api';
import './App.css';

function App() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setIsLoading(true);
      const data = await AssetService.getAllAssets();
      setAssets(data);
      setError(null);
    } catch (err) {
      setError('Failed to load assets');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAsset = async (data: CreateAssetDto) => {
    try {
      await AssetService.createAsset(data);
      await loadAssets();
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create asset');
      console.error(err);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    
      try {
        await AssetService.deleteAsset(id);
        await loadAssets();
        setError(null);
      } catch (err) {
        setError('Failed to delete asset');
        console.error(err);
      }
    
  };

  const handleRequestQuote = async (id: string) => {
    try {
      await WarrantyService.generateQuote(id);
      await loadAssets();
      setError(null);
    } catch (err) {
      setError('Failed to generate warranty quote');
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {showForm ? 'Cancel' : 'Add New Asset'}
          </button>
        </div>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Asset</h2>
          <AssetForm onSubmit={handleCreateAsset} buttonText="Create Asset" />
        </div>
      )}

      {assets.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No assets found. Add your first asset using the button above.
        </div>
      ) : (
        <AssetList
          assets={assets}
          onDelete={handleDeleteAsset}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </div>
  );
}

export default App;
