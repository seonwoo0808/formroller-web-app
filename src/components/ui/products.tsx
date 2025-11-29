const products = [
  {
    color: 'Black',
    href: '#',
    id: 1,
    imageAlt: "Front of men's Basic Tee in black.",
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    name: 'Basic Tee',
    price: '$35',
  },
  {
    color: 'Aspen White',
    href: '#',
    id: 2,
    imageAlt: "Front of men's Basic Tee in white.",
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
    name: 'Basic Tee',
    price: '$35',
  },
  {
    color: 'Charcoal',
    href: '#',
    id: 3,
    imageAlt: "Front of men's Basic Tee in dark gray.",
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
    name: 'Basic Tee',
    price: '$35',
  },
  {
    color: 'Iso Dots',
    href: '#',
    id: 4,
    imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
    name: 'Artwork Tee',
    price: '$35',
  },
];

export default function Products() {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pt-4 pb-20'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>추천 상품</h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <div className='group relative' key={product.id}>
              <img
                alt={product.imageAlt}
                className='aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
                src={product.imageSrc}
              />
              <div className='mt-4 flex justify-between'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <a href={product.href}>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {product.name}
                    </a>
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
                </div>
                <p className='text-sm font-medium text-gray-900'>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
