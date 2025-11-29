import { HomeIcon, RulerDimensionLine, StoreIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Dock() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className='fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-default'>
      <div className='grid h-full max-w-lg grid-cols-3 mx-auto font-medium'>
        {linkItem.map(({ href, icon: Icon, name }) => (
          <Link
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 group',
              currentPath === href && 'bg-orange-50 text-orange-500',
            )}
            key={href}
            to={href}>
            <Icon className='w-6 h-6 mb-1 text-body group-hover:text-fg-brand' />
            <span className='text-sm text-body group-hover:text-fg-brand'>{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const linkItem = [
  { href: '/measurements', icon: RulerDimensionLine, name: '측정하기' },
  { href: '/', icon: HomeIcon, name: '홈' },
  { href: '/store', icon: StoreIcon, name: '스토어' },
];
