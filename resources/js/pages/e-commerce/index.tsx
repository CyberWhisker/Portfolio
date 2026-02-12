import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default function EcommercePage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <AppLayout>
            <div className='p-4'>
                <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <Card key={product.id} className="hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">{product.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <img src={product.image} alt={product.title} className="h-40 object-contain mb-4" />
                                <p className="text-sm text-gray-600 mb-2 line-clamp-3">{product.description}</p>
                                <Badge variant="outline" className="mb-2 capitalize">{product.category}</Badge>
                                <p className="font-bold text-lg">${product.price}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
