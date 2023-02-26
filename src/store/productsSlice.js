import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase-config";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  firstName: "John",
  lastName: "Hill",
  products: [],
  category: [],
  cart: [],
};

const productsCollectionRef = collection(database, "products");
const categoryCollectionRef = collection(database, "category");

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const data = await getDocs(productsCollectionRef);
      const category = await getDocs(categoryCollectionRef);

      dispatch(
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );

      dispatch(
        setCategory(category.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: {
    [getProducts.pending]: () => console.log("pending"),
  },
});

export const {
  setFirstName,
  setLastName,
  setProducts,
  setCategory,
  addToCart,
  updateCart,
} = productSlice.actions;

export default productSlice.reducer;
