import { useEffect, useState } from "react";
import Money from "../..//components/helpper/Money";
import { getCartByDate } from "@functions/cart";
import { acumular } from "@functions/functios";
import Spinner from "@components/helpper/Spinner";


const getTotalCarts = async (date: Date) => {
    try {
        const carts = await getCartByDate(date);
        let total = 0;
        carts.forEach(cart => {
            total += acumular(cart.sales, cart.discountsApplied);
        });
        return total;
    } catch (error) {
        console.error("Error fetching cart by date:", error);
        return 0; // Manejar el error aquí según sea necesario
    }
}



const TotalCartsComponent: React.FC<{ date: Date }> = ({ date }) => {
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        const fetchTotalCarts = async () => {
            try {
                const total = await getTotalCarts(date);
                setTotal(total);
            } catch (error) {
                console.error("Error fetching total carts:", error);
            }
        };

        fetchTotalCarts();
    }, [date]);

    return (
        <>
            {total !== null ? <Money amount={total} /> : <Spinner/>}
        </>
    );
};

export default TotalCartsComponent;