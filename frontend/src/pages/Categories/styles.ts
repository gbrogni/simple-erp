import styled from "styled-components";

export const CategoriesContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
`;

export const CategoriesTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  th {
    background: ${props => props.theme["gray-700"]};
    padding: 1.25rem 2rem;
    text-align: left;
    color: ${(props) => props.theme['blue-500']};
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  
  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme["gray-700"]};
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;

      &:hover {
        color: ${(props) => props.theme['blue-500']};
      }
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;
