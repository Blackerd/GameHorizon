import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductById, getProductsByCategory, searchProductsByName } from '../api/productApi';

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await getProducts();
      return data.map(product => ({
        ...product,
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img || 'https://via.placeholder.com/150',
        categoryName: product.categoryName || 'Unknown'
      }));
    }
  });

export const useProduct = (id) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await getProductById(id);
      return {
        ...data,
        id: data.id,
        name: data.name,
        price: data.price,
        img: data.img || 'https://via.placeholder.com/150',
        categoryName: data.categoryName || 'Unknown'
      };
    },
    enabled: !!id
  });

export const useProductsByCategory = (categoryId) =>
  useQuery({
    queryKey: ['productsByCategory', categoryId],
    queryFn: async () => {
      const { data } = await getProductsByCategory(categoryId);
      return data.map(product => ({
        ...product,
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img || 'https://via.placeholder.com/150',
        categoryName: product.categoryName || 'Unknown'
      }));
    },
    enabled: !!categoryId
  });

export const useSearchProducts = (name) =>
  useQuery({
    queryKey: ['search', name],
    queryFn: async () => {
      const { data } = await searchProductsByName(name);
      return data.map(product => ({
        ...product,
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img || 'https://via.placeholder.com/150',
        categoryName: product.categoryName || 'Unknown'
      }));
    },
    enabled: !!name
  });