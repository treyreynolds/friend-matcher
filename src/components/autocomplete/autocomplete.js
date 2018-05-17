// @flow
import * as React from 'react';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';

type AutocompleteProps = {
  value: string,
  placeholder?: string,
  minLength: number,
  onChange: (Object) => void,
  className?: string,
  onKeyPress?: (any) => mixed,
  setInputRef?: (any) => mixed,
  onFetchRequested: (searchText: string, cb: () => void) => Array<Object>,
  idKey: string,
  labelKey: string
}

type AutocompleteState = {
  suggestions: Array<?{id: string, label: string}>
}

export default class Autocomplete extends React.Component<AutocompleteProps, AutocompleteState> {

  state = {
    suggestions: []
  };

  handleChange({ newValue, method } : Object) {
    this.props.onChange({[this.props.idKey]: newValue, [this.props.labelKey]: newValue});
  };

  handleSuggestionsFetchRequested(fetch: any) {
    if (fetch.value.trim().length >= this.props.minLength) {
      this.props.onFetchRequested(fetch.value, (suggestions) =>
        this.setState({suggestions})
      );
    }
  };

  handleSuggestionSelected({suggestion} : Object) {
    this.props.onChange(suggestion);
  }

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  handleKeyPress(e: any) {
    if(this.props.onKeyPress){
      this.props.onKeyPress(e);
    }
  }

  render() {
    const { suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: this.props.placeholder || '',
      value: this.props.value || '',
      onChange: (e, val) => this.handleChange(val),
      onKeyPress: (e) => this.handleKeyPress(e)
    };

    return (
      <AutocompleteWrapper className={this.props.className} >
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(req) => this.handleSuggestionsFetchRequested(req)}
          onSuggestionsClearRequested={() => this.handleSuggestionsClearRequested()}
          onSuggestionSelected={(e, val) => this.handleSuggestionSelected(val)}
          getSuggestionValue={suggestion => suggestion[this.props.labelKey]}
          renderSuggestion={suggestion =>
            <div>
              {suggestion[this.props.labelKey]}
            </div>
          }
          inputProps={inputProps}
          focusInputOnSuggestionClick={false}
          renderInputComponent={(inputProps) => (
            <input {...inputProps} ref={this.props.setInputRef} />
          )}
        />
      </AutocompleteWrapper>
    );
  }
}

const AutocompleteWrapper = styled.div`
  width: 100%;
`;