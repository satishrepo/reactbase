import React, { Fragment, useState, useEffect } from 'react'
import { post } from '../../utils/HttpRequest'
import MultiselectAutosuggest from '../MultiselectAutosuggest'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { Paper, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import { useSnackbar } from 'notistack'


const AddProduct = (props) => {

    const initProductModel = {
        title: '',
        description: '',
        price: {
            sellPrice: '',
            discount: ''
        },
        primary_category: null,
        other_category: [],
        stock: 100,
        tags: [],
        images: []
    }
    const [productModel, setProductModel] = useState({...initProductModel})
    const [categoryList, setCategoryList] = useState([])
    const [images, setImages] = useState([])

    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(2),
        },
        padding: {
            padding: theme.spacing(1)
        }
    }))

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    useEffect(() => {
        if (props.loadCategorySuccess && props.loadCategoryResponse.records) {
            setCategoryList(props.loadCategoryResponse.records)
        }
        if (!props.loadCategoryResponse.records) {
            props.loadCategory()
        }
    }, [props.loadCategorySuccess])

    const defaultProps = {
        options: categoryList,
        getOptionLabel: (option) => {
            return typeof option === 'string' ? option : option.title 
        }
    }

    const ValueLabelComponent = props => {
        const { children, open, value } = props
      
        return (
          <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
    }
    
    const classes = useStyles()

    const handleOnChange = (e, name) => {
        const { target } = e
        if (name === 'sellPrice' || name === 'discount') {
            let pm = {...productModel}
            pm['price'][name] = target.value
            setProductModel({...pm})
        } else {
            setProductModel({...productModel, [name]: target.value})
        }
    }

    const onSelectCategory = (e, value) => {
        if (value) {
            setProductModel({...productModel, 'primary_category': value._id})
        }
    }

    const onChangeStock = (e, value) => {
        console.log(e, value)
    }

    const onSelectImage = (e) => {
        // console.log(typeof e.target.files, Object.keys(e.target.files))
        const files = e.target.files
        let imgArray = []
        for(let i of files) {
            let reader = new FileReader()
            let img = reader.readAsDataURL(i)
            reader.onloadend = (e) => {
                let imageObj = {
                    name: i.name,
                    data: reader.result
                }
                // imgArray.push(reader.result)
                imgArray.push(imageObj)
                if (files.length === imgArray.length) {
                    const pModel = {...productModel}
                    pModel['images'] = imgArray
                    setProductModel(pModel)
                    setImages(imgArray)
                }
            }
        }
        
        console.log('imgArray', imgArray)
    }

    const addProduct = () => {
        const options = {
            url: 'products',
            data: productModel
        }
        post(options).then((response) => {
            // console.log(response)
            enqueueSnackbar('Product added successfully', { variant: 'success' });
            setProductModel({...initProductModel})
            props.productUpdate()
        })
        .catch((err) =>{
            console.log('Add product Error', err)
        })
    }

    /* 
    const addImages = () => {
        const options = {
            url: 'products/images',
            data: images
        }
        post(options).then((response) => {
            // console.log(response)
            // addProduct()
            enqueueSnackbar('Prdoct added successfully', { variant: 'success' });
            setProductModel({...initProductModel})
        })
        .catch((err) =>{
            console.log('Add product Error', err)
        })
    } 
    */

    return (
        <Fragment>
           <Container maxWidth="sm">
             <Paper className={classes.padding}>
              <div className={classes.margin}>
    
              <Grid container spacing={2} >
                  <Typography display="inline" align="center" variant="h6" className={classes.typography}>Add Product</Typography>
              </Grid>
    
                <Grid container spacing={2} alignItems="flex-end">
    
                  <Grid item sm={true} md={true} xs={true}>
                    <TextField 
                      label="Title" 
                      name="title" 
                      onChange={(e) => handleOnChange(e, 'title')}
                      value={productModel.title} 
                      helperText={productModel.titleError}
                      fullWidth autoFocus required
                    />
                  </Grid>
                  
                </Grid>
    
                <Grid container spacing={2} alignItems="flex-end">
    
                  <Grid item sm={true} md={true} xs={true}>
                    <TextField 
                        label="Description" 
                        name="description" 
                        onChange={(e) => handleOnChange(e, 'description')} 
                        value={productModel.description}
                        helperText={productModel.descriptionError}
                        fullWidth autoFocus required
                    />
                  </Grid>
                  
                </Grid>
    
                <Grid container spacing={2} alignItems="flex-end">
    
                    <Grid item sm={6} md={6} xs={12}>
                        <TextField 
                            label="Price" 
                            name="sellPrice" 
                            onChange={(e) => handleOnChange(e, 'sellPrice')}
                            value={productModel.price.sellPrice} 
                            helperText={productModel.priceError}
                            fullWidth autoFocus required
                        />
                    </Grid>
                    <Grid item sm={6} md={6} xs={12}>
                        <TextField 
                            label="Discount" 
                            name="discount" 
                            onChange={(e) => handleOnChange(e, 'discount')}
                            value={productModel.price.discount} 
                            helperText={productModel.discountError}
                            fullWidth autoFocus required
                        />
                    </Grid>
                  
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
    
                    <Grid item sm={6} md={6} xs={12}>
                        <Autocomplete
                            {...defaultProps}
                            id="category"
                            debug
                            renderInput={(params) => <TextField {...params} label="Category"/>}
                            onChange={(e, value) => onSelectCategory(e, value)}  
                            // value={productModel.primary_category}
                            getOptionSelected={option => option._id === productModel.primary_category}
                        />
                    </Grid>
                    <Grid item sm={6} md={6} xs={12}>
                        <MultiselectAutosuggest label="Other Categories" placeholder="Select Category" values={categoryList}/>
                    </Grid>
                  
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
    
                    <Grid item sm={true} md={true} xs={true}>
                        <Typography gutterBottom>Stock</Typography>
                        <Slider
                            ValueLabelComponent={ValueLabelComponent}
                            aria-label="custom thumb label"
                            defaultValue={productModel.stock}
                            onChange={(e, value) => onChangeStock(e, value)}
                        />
                        
                    </Grid>
                  
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
    
                    <Grid item sm={true} md={true} xs={true}>
                        <Button
                            variant="contained"
                            color="secondary"
                            component="label"
                            >
                            Upload Image
                            <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => onSelectImage(e)}
                                multiple={true}
                            />
                        </Button>
                        <Paper>
                            {images.map(item => (
                                <img src={item.data} height="50px" alt={item.name}/>
                            ))}
                        </Paper>
                        
                    </Grid>
                  
                </Grid>

                
    
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button 
                      color="primary"
                      variant="contained"
                      onClick={() => addProduct()}
                    >Save</Button>
                  
                </Grid>
              </div>
    
             </Paper>
              
           </Container>
        </Fragment>
      )

}

export default AddProduct