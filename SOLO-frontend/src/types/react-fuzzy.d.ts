declare module 'react-fuzzy' {
    import * as React from 'react';
  
    interface FuzzySearchProps<T> {
      list: T[];
      keys: (keyof T)[];
      width?: number;
      onSelect: (selectedItem: T) => void;
      placeholder?: string;
      resultsTemplate?: (
        props: any,
        state: any,
        styles: any,
        clickHandler: (index: number) => void
      ) => React.ReactNode;
    }
  
    const FuzzySearch: <T>(props: FuzzySearchProps<T>) => JSX.Element;
  
    export default FuzzySearch;
  }
  