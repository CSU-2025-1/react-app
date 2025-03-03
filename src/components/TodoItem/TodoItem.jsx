import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import { PriorityButton, PriorityContainer } from './PrioritySelector';
import { useDeleteTodoItem, useUpdateTodoItem } from '../../data/hooks/useData';
const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
    word-wrap: break-word;
    overflow-wrap: break-word;
  `;
})

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;



export const TodoItem = ({title, checked, onToggle, priority, id}) => {
  const { mutate } = useDeleteTodoItem();
  const { mutate: update} = useUpdateTodoItem();

  
  const deleteHandler = () => {
    console.log("deleteHandler clicked", id);
    if (window.confirm("Вы уверены, что хотите удалить этот элемент?")) {
      mutate({ id });
    }
  };

  const priorities = ["low", "medium", "high"];

  return (
    <TodoItemContainer>
      <TodoItemCheckbox checked={checked} onToggle={onToggle} />
      <Title checked={checked}>
        {title}
      </Title>
      <PriorityContainer>
        {priorities.map((p) => (
          <PriorityButton
            key={p}
            active={p === priority}
            onClick={() => update({ id, checked, priority: p })}
          >
            {p}
          </PriorityButton>
        ))}
      </PriorityContainer>
      <Delete onClick={deleteHandler} />
    </TodoItemContainer>
  )
}
