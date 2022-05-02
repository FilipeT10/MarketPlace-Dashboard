import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from '@material-ui/styles';
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";

import Edit from "@material-ui/icons/Edit";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5, 0.25)
  }
}));

export default function InputImages({ ...props }) {
  const classes = useStyles();
  const { selectedTags, placeholder, tags, ...other } = props;
  const [inputValue, setInputValue] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState([]);
  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);
  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  function handleInputChange(event) {

    console.log('entroy')
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      saveImage(e.target.result)
    }

  }
  function saveImage(image){

    let newSelectedItem = [...selectedItem, image];
    setSelectedItem(newSelectedItem);

    console.log(newSelectedItem)
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue("");
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder
          });
          
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: selectedItem.map(item => (
                    <div>
                      <IconButton
                        style={{ justifySelf: 'right', marginTop: 10, marginLeft: 100, backgroundColor: "#ffffff"}}
                        color="error"
                        onClick={handleDelete(item)}
                      >
                        <Delete/>
                      </IconButton>
                      <img style={{height: 150, width: 150, padding: 20, paddingTop: 0, marginTop: -20}} src={item} />
                  </div>
                  )),
                  endAdornment: ( 
                  <Button
                    variant="contained"
                    component="label"
                    style={{width: 120}}
                  >
                    Carregar
                    <input
                      type="file"
                      multiple accept="image/*" onChange={handleInputChange}
                      hidden
                    />
                  </Button>),
                  onBlur,
                  onChange,
                  onFocus
                }}
                {...other}
                {...inputProps}
              />
              
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}
InputImages.defaultProps = {
  tags: []
};
InputImages.propTypes = {
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};
