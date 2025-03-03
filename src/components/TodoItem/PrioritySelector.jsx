import styled from "styled-components";

export const PriorityContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const PriorityButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? "#007bff" : "#ddd"};
  color: white;
  font-size: 12px;
  
  &:hover {
    background-color: ${({ active }) =>
      active ? "#0056b3" : "#bbb"};
  }
`;

export const PrioritySelector = ({ priority, setPriority }) => {
  return (
    <PriorityContainer>
      {["low", "medium", "high"].map(level => (
        <PriorityButton
          key={level}
          active={level === priority}
          onClick={() => setPriority(level)}
        >
          {level}
        </PriorityButton>
      ))}
    </PriorityContainer>
  );
};
