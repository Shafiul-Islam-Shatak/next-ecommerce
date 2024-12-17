import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductStoreType } from 'types';

interface WishTypes {
    wishItems: ProductStoreType[]
}

const initialState = {
    wishItems: []
} as WishTypes;

const indexSameProduct = (state: WishTypes, action: ProductStoreType) => {
    const sameProduct = (product: ProductStoreType) => (
        product.id === action.id &&
        product.color === action.color &&
        product.size === action.size
    );

    return state.wishItems.findIndex(sameProduct)
};

type AddProductType = {
    product: ProductStoreType,
    count: number,
}

const wishSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        addWishProduct: (state, action: PayloadAction<AddProductType>) => {
            // const wishItems = state.wishItems;

            // find index of product
            const index = indexSameProduct(state, action.payload.product);

            if (index !== -1) {
                // wishItems[index].count += action.payload.count;
                return;
            }

            return {
                ...state,
                wishItems: [...state.wishItems, action.payload.product]
            };
        },
        removeWishProduct(state, action: PayloadAction<ProductStoreType>) {
            // find index of product
            state.wishItems.splice(indexSameProduct(state, action.payload), 1);
        },
        setWishCount(state, action: PayloadAction<AddProductType>) {
            // find index and add new count on product count
            const indexItem = indexSameProduct(state, action.payload.product);
            state.wishItems[indexItem].count = action.payload.count;
        },
    },
})

export const { addWishProduct, removeWishProduct, setWishCount } = wishSlice.actions
export default wishSlice.reducer