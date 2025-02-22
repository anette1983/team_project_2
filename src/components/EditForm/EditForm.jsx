import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';

export const EditForm = ({ onUpdate, onCancel, onChange, currentTodo }) => {
  return (
    <SearchFormStyled onSubmit={onUpdate}>
      <BtnEdit type="button" onClick={onCancel}>
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>

      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>

      <InputSearch
        placeholder="EDIT TODO"
        name="edit"
        required
        defaultValue={currentTodo.text || ''}
        autoFocus
        onChange={event => onChange(event, currentTodo.id)}
        // value={currentTodo.text || ''}
      />
    </SearchFormStyled>
  );
};

// export const EditForm = ({onUpdate, onCancel, onChange, currentTodo}) => {
//   const [search, setSearch] = useState(currentTodo.text ||'');
//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     console.log('curTD :>> ', currentTodo.id);
//     onUpdate(search, currentTodo.id);

//   }
//   return (
//     <SearchFormStyled onSubmit={handleSubmit}>
//   <BtnEdit type="button">
//     <MdOutlineCancel size="16px" color="red" onClick={onCancel} />
//   </BtnEdit>

//   <FormBtn type="submit">
//     <RiSaveLine size="16px" color="green" />
//   </FormBtn>

//   <InputSearch
//     placeholder="EDIT TODO"
//     name="edit"
//     required
//     // defaultValue={currentTodo.text}
//     value={search}
//     onChange={(event)=> setSearch(event.target.value)}
//     autoFocus
//   />
// </SearchFormStyled>
//   )
// };
