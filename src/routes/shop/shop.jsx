import { Fragment, useContext } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview';

import ProductCard from '../../components/product-card/product-card';

import './shop.styles.scss';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <div className='shop-container'>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} product={products} />
            })}
        </div>
    );
};

export default Shop;