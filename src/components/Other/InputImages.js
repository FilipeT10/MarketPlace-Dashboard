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
  const [error, setError] = React.useState(props.error);
  const [maxLenght, setMaxLenght] = React.useState(props.maxLenght);
  
  useEffect(() => {
      setError(props.error);
    }, [props.error]);
  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);
  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  function handleInputChange(event) {
    
    let files = event.target.files;

    let filesSave = []

    var reader = new FileReader();  
    function readFile(index) {
      if( index >= files.length ) return;
      var file = files[index];
      reader.onload = function(e) {  
        // get file content  

        filesSave.push({"base": e.target.result})
        if(index+1 >= files.length){
          saveImage(filesSave)
        }
        
        // do sth with bin
        readFile(index+1)
      }
      reader.readAsDataURL(file);
    }
    readFile(0)
  }

  function saveImage(image){
    let newSelectedItem = [...selectedItem, ...image];
    setSelectedItem(newSelectedItem);
    if(maxLenght == undefined ||  maxLenght == newSelectedItem.length){
      setError(false)
    }else{
      setError(true)
    }
  }

  
  
  const handleDelete = item => () => {
    console.log(item)
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    if(newSelectedItem.length == 0){
      setError(true)
    }
    setSelectedItem(newSelectedItem);
    if(maxLenght == undefined ||  maxLenght == newSelectedItem.length){
      setError(false)
    }else{
      setError(true)
    }
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
            <div style={{width: '100%', border: error ? '2px solid rgba(255, 0, 0, 0.15)' : '2px solid rgba(0, 0, 0, 0.15)', borderRadius: 5}}>
            {error && <Typography
              style={{marginTop: 20, textAlign: 'center'}}
              color="red"
              variant="h6"
            >
              {maxLenght == 1 && selectedItem.length > 1 ? "Carregue somente uma imagem" : "Carregue uma imagem"}
            </Typography>}
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
  tags: [],
  error: false
};
InputImages.propTypes = {
  error: PropTypes.bool,
  selectedTags: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};
