import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (searchImg: string) => void}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) =>{

  const handleSubmit = (e:FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const searchImg = (form.elements.namedItem('searchImg') as HTMLInputElement).value.trim();

    if (searchImg.trim() === "") {
      toast("Please fill in search form", {
        icon: "✕",
        position: "top-right",
        style: {
          color: "red",
        },
      });
      return;
    }
    onSearch(searchImg);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="searchImg"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
        />
        <button className={css.btn} type="submit">
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
}

export default SearchBar