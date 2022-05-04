import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";

import { makeStyles } from '@material-ui/styles';
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";

import Edit from "@material-ui/icons/Edit";
import { Button, IconButton, List, ListItem, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import PerfectScrollbar from 'react-perfect-scrollbar';

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

    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      saveImage(e.target.result)
    }

  }
  function saveImage(image){

    let newSelectedItem = [...selectedItem, {"base": image}];
    setSelectedItem(newSelectedItem);

    console.log(newSelectedItem)
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
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            placeholder
          });
          
          return (
            <div style={{width: '100%', border: '2px solid rgba(0, 0, 0, 0.15)', borderRadius: 5}}>
            {/*selectedItem.length == 0 && <Typography
              style={{marginTop: 20, textAlign: 'center'}}
              color="textSecondary"
              variant="h6"
            >
              Carregue as fotos do produto
            </Typography>*/}
            <PerfectScrollbar>
              <div style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
                {selectedItem.map(item => (
                      <div>
                        
                        <img style={{height: 150, width: 150, marginLeft: 10}} src={item.base} />
                        <IconButton
                          style={{ justifySelf: 'flex-end', marginLeft: -10, backgroundColor: "#ffffff"}}
                          color="error"
                          onClick={handleDelete(item)}
                        >
                          <Delete/>
                        </IconButton>
                    </div>
                    ))}
              </div>
              </PerfectScrollbar>
             
                  <Button
                    variant="outlined"
                    component="label"
                    style={{width: '100%'}}
                  >
                    Carregar Imagens
                    <input
                      type="file"
                      multiple accept="image/*" onChange={handleInputChange}
                      hidden
                    />
                  </Button>
              
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
