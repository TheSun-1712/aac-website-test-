// src/hooks/useDatabase.js - Database hook to replace localStorage
import { useState, useEffect } from 'react';

const API_BASE = '/api/data';

export const useDatabase = (tableName, initialData = []) => {
  const [data, setData] = useState(() => {
    if (initialData && initialData.length > 0) return initialData;
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem(`aac_cache_${tableName}`);
        if (cached) return JSON.parse(cached);
      } catch (e) {}
    }
    return [];
  });
  const [loading, setLoading] = useState(() => (initialData && initialData.length > 0 ? false : true));
  const [error, setError] = useState(null);

  // Fetch data from database
  const fetchData = async () => {
    try {
      if (data.length === 0) setLoading(true);
      const response = await fetch(`${API_BASE}/${tableName}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${tableName}: ${response.statusText}`);
      }
      
      const result = await response.json();
      const items = result.data || [];
      setData(items);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(`aac_cache_${tableName}`, JSON.stringify(items));
        } catch (e) {}
      }
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${tableName}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, [tableName]);

  // Add new item
  const addItem = async (item) => {
    try {
      const response = await fetch(`${API_BASE}/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`Failed to add ${tableName} item: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Update local state
      setData(prevData => [...prevData, result.data]);
      return result.data;
    } catch (err) {
      console.error(`Error adding ${tableName} item:`, err);
      throw err;
    }
  };

  // Update existing item
  const updateItem = async (id, updatedItem) => {
    try {
      const response = await fetch(`${API_BASE}/${tableName}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${tableName} item: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Update local state
      setData(prevData => 
        prevData.map(item => 
          (item.id === id || item._id === id) ? result.data : item
        )
      );
      return result.data;
    } catch (err) {
      console.error(`Error updating ${tableName} item:`, err);
      throw err;
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/${tableName}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${tableName} item: ${response.statusText}`);
      }

      // Update local state
      setData(prevData => 
        prevData.filter(item => item.id !== id && item._id !== id)
      );
      return true;
    } catch (err) {
      console.error(`Error deleting ${tableName} item:`, err);
      throw err;
    }
  };

  // Get item by ID
  const getItemById = (id) => {
    return data.find(item => item.id === id || item._id === id);
  };

  // Refresh data
  const refresh = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    refresh,
  };
};