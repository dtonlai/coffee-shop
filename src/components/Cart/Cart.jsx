import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart, handleUpdateCartQuantity, handleRemoveFromCart, handleEmptyCart }) => {
	const classes = useStyles();

	const EmptyCart = () => (
		<Typography variant="subtitle1">
			You have no items in your shopping cart, <Link to="/">click here</Link> to add some!
		</Typography>
	);

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem
							item={item}
							handleUpdateCartQuantity={handleUpdateCartQuantity}
							handleRemoveFromCart={handleRemoveFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size="large"
						type="button"
						variant="contained"
						color="secondary"
						onClick={handleEmptyCart}
					>
						Empty cart
					</Button>
					<Button
						component={Link}
						to="/checkout"
						className={classes.checkOutButton}
						size="large"
						type="button"
						variant="contained"
						color="primary"
					>
						Check out
					</Button>
				</div>
			</div>
		</>
	);

	if (!cart.line_items) return "Loading";

	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
};

export default Cart;
