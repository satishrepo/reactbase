import React, { Fragment, useEffect, useState } from 'react'
import { Container, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ProductList = props => {

    const [productsList, setProductList] = useState([])

    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
    });

    const classes = useStyles();

    useEffect(() =>{
        if (props.productListResponse.length) {
            setProductList(props.productListResponse)
        } else {
            loadProducts()
        }
    }, [props.productListResponse])

    const loadProducts = () => {
        props.productList()
    }

    const onProductDetail = (productObj) => {
        console.log('product ', productObj)
    }

    const addToCart = (item) => {
        item['quantity'] = 1
        item['totalPrice'] = Math.round(item.price.sellPrice -  (item.price.sellPrice * ((item.price.discount || 0)/100)))
        props.addToCart(item)
    }


    return (
        <Fragment>
           <Container maxWidth="md">
                <Grid container spacing={2}  alignItems="flex-end">
                    {productsList.map(item => (
                        
                    <Grid item sm={3} md={3} xs={1} key={item.sku}>
                        
                        <Card className={classes.root} >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={item.images.length ? item.images[0]['fileUrl'] : 'https://via.placeholder.com/300'}
                                    title={item.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.description.substring(0, 15)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="secondary" onClick={ () =>addToCart(item)}>Add to card</Button>
                                <Button size="small" color="primary" onClick={()=>onProductDetail(item)}>Details</Button>
                            </CardActions>
                        </Card>

                    </Grid>
                    
                    ))}

                </Grid>   
            </Container>
        </Fragment>

    )
}

export default ProductList