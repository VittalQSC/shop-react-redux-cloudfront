import Typography from "@mui/material/Typography";
import CartItems from "~/components/CartItems/CartItems";
import { CartItem, ProductCartItem } from "~/models/CartItem";

type ReviewCartProps = {
  items: ProductCartItem[];
};

export default function ReviewCart({ items }: ReviewCartProps) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <CartItems items={items} isEditable />
    </>
  );
}
