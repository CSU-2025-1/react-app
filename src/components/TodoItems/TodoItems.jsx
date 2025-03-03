import React, {useState, useEffect} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';


export const TodoItems = () => {

  const [searchValue, setSearchValue] = useState('');
  const [sortedItems, setSortedItems] = useState([]);
  const [sortOrder, setSortOrder] = useState();


  const { data: todoItems, isLoading } = useData();

  useEffect(() => {
    if (todoItems) {
      setSortedItems([...todoItems]);
    }
  }, [todoItems]);

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  const filteredBySearchItems = sortedItems.filter((todoItem) => {
    if (!todoItem || !todoItem.title) {
      console.warn("title in todoItem:", todoItems);
    }

    const clearedItemTitle = todoItem.title.replace(/\s+/g, '').toLowerCase();
    const clearedSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
    return clearedItemTitle.includes(clearedSearchValue) || clearedSearchValue.length < 3;
  });

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sorted = [...sortedItems].sort((a, b) => {
      const priorityLevels = { low: 1, medium: 2, high: 3 };
      return newSortOrder === 'asc'
        ? priorityLevels[a.priority] - priorityLevels[b.priority]
        : priorityLevels[b.priority] - priorityLevels[a.priority];
    });

    setSortedItems(sorted);
  };

  
  const handleToggle = (id) => {
    setSortedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handlePriority = (id, priority) => {
    setSortedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, priority } : item
      )
    );
  };

  const todoItemsElements = filteredBySearchItems.map((item) => {
    return <TodoItem 
      key={ item.id } 
      id={ item.id }
      title={ item.title } 
      checked={ item.isDone } 
      priority={ item.priority }  
      onToggle={ () => handleToggle(item.id) }
      setPriority={ (priority) => handlePriority(item.id, priority)} />;
  });

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue= {setSearchValue} />
      <button onClick={handleSort}>
        Сортировать {sortOrder === 'asc' ? '↓' : '↑'}
      </button>
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}