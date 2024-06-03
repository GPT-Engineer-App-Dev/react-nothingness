import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useContext, useState } from 'react';

const mockData = {
  dishes: [
    { id: 1, name: 'Pizza', country: 'Italy', size: 'Large', type: 'Veg', price: 12 },
    { id: 2, name: 'Sushi', country: 'Japan', size: 'Medium', type: 'Non-Veg', price: 20 },
  ],
  drinks: [
    { id: 1, name: 'Coca Cola', percentage: 0, country: 'USA' },
    { id: 2, name: 'Sake', percentage: 15, country: 'Japan' },
  ],
};

const MockContext = createContext();

export const MockProvider = ({ children }) => {
  const [data, setData] = useState(mockData);

  const addDish = (newDish) => {
    setData((prevData) => ({
      ...prevData,
      dishes: [...prevData.dishes, { id: Date.now(), ...newDish }],
    }));
  };

  const updateDish = (updatedDish) => {
    setData((prevData) => ({
      ...prevData,
      dishes: prevData.dishes.map((dish) =>
        dish.id === updatedDish.id ? updatedDish : dish
      ),
    }));
  };

  const deleteDish = (id) => {
    setData((prevData) => ({
      ...prevData,
      dishes: prevData.dishes.filter((dish) => dish.id !== id),
    }));
  };

  const addDrink = (newDrink) => {
    setData((prevData) => ({
      ...prevData,
      drinks: [...prevData.drinks, { id: Date.now(), ...newDrink }],
    }));
  };

  const updateDrink = (updatedDrink) => {
    setData((prevData) => ({
      ...prevData,
      drinks: prevData.drinks.map((drink) =>
        drink.id === updatedDrink.id ? updatedDrink : drink
      ),
    }));
  };

  const deleteDrink = (id) => {
    setData((prevData) => ({
      ...prevData,
      drinks: prevData.drinks.filter((drink) => drink.id !== id),
    }));
  };

  return (
    <MockContext.Provider
      value={{ data, addDish, updateDish, deleteDish, addDrink, updateDrink, deleteDrink }}
    >
      {children}
    </MockContext.Provider>
  );
};

export const useMock = () => {
  return useContext(MockContext);
};

const fromMock = async (queryFn) => {
  return queryFn();
};

export const useDishes = () => {
  const { data } = useMock();
  return useQuery({
    queryKey: ['dishes'],
    queryFn: () => fromMock(() => data.dishes),
  });
};

export const useAddDish = () => {
  const { addDish } = useMock();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newDish) => fromMock(() => addDish(newDish)),
    onSuccess: () => {
      queryClient.invalidateQueries('dishes');
    },
  });
};

export const useUpdateDish = () => {
  const { updateDish } = useMock();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedDish) => fromMock(() => updateDish(updatedDish)),
    onSuccess: () => {
      queryClient.invalidateQueries('dishes');
    },
  });
};

export const useDeleteDish = () => {
  const { deleteDish } = useMock();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromMock(() => deleteDish(id)),
    onSuccess: () => {
      queryClient.invalidateQueries('dishes');
    },
  });
};

export const useDrinks = () => {
  const { data } = useMock();
  return useQuery({
    queryKey: ['drinks'],
    queryFn: () => fromMock(() => data.drinks),
  });
};

export const useAddDrink = () => {
  const { addDrink } = useMock();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newDrink) => fromMock(() => addDrink(newDrink)),
    onSuccess: () => {
      queryClient.invalidateQueries('drinks');
    },
  });
};

export const useUpdateDrink = () => {
  const { updateDrink } = useMock();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedDrink) => fromMock(() => updateDrink(updatedDrink)),
    onSuccess: () => {
      queryClient.invalidateQueries('drinks');
    },
  });
};

export const useDeleteDrink = () => {
  const { deleteDrink } = useMock();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromMock(() => deleteDrink(id)),
    onSuccess: () => {
      queryClient.invalidateQueries('drinks');
    },
  });
};

const queryClient = new QueryClient();
export function MockQueryProvider({ children }) {
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
}