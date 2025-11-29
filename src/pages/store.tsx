import { CoinsIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Header from '@/components/ui/header';
import Products from '@/components/ui/products';

export default function StorePage() {
  return (
    <>
      <Header currentPageName='스토어' />
      <Card className='mx-4 px-4 mb-4'>
        <div className='text-lg font-semibold'>
          <CoinsIcon className='inline mb-1 mr-2 h-6 w-6 text-yellow-500' />
          <span>보유 포인트: 1,500</span>
        </div>
      </Card>
      <Products />
    </>
  );
}
