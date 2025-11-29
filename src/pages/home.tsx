import { StoreIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WeeklyAttendance from '@/components/ui/weekly-attendace';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-6 p-4 mb-20'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>측정하기</CardTitle>
          <CardDescription>오늘도 새로운 측정을 시작해 보아요!</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyAttendance />
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button
            className='w-full bg-orange-400'
            onClick={() => {
              navigate('/measurements');
            }}>
            측정 시작하기
          </Button>
        </CardFooter>
      </Card>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>스토어</CardTitle>
          <CardDescription>나만의 굿즈를 만나보세요!</CardDescription>
        </CardHeader>
        <CardContent>
          <StoreIcon className='m-4 w-24 h-24 text-stone-200 mx-auto text-neutral-secondary-medium' />
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button
            className='w-full bg-orange-400'
            onClick={() => {
              navigate('/store');
            }}>
            스토어 가기
          </Button>
        </CardFooter>
      </Card>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>커뮤니티</CardTitle>
          <CardDescription>다른 사람들과 소통해 보세요!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-4 text-center text-sm text-neutral-secondary-medium flex gap-4 items-center justify-left'>
            <Avatars />
            <p className='text-gray-500'>함께하는 사람들이 늘어나고 있어요!</p>
          </div>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button
            className='w-full bg-orange-400'
            onClick={() => {
              window.open('https://cafe.naver.com/bluegrayplji5', '_blank');
            }}>
            커뮤니티 가기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}



export function Avatars() {
  return (
    <div className='flex flex-row flex-wrap items-center gap-12'>
      <div className='*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale'>
        <Avatar>
          <AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage alt='@maxleiter' src='https://github.com/maxleiter.png' />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage alt='@evilrabbit' src='https://github.com/evilrabbit.png' />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
