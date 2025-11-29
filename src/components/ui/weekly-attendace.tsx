import { DailyAchievementScore } from '@/config/constants';
import { getWeeklyCounts } from '@/lib/countStorage';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ButtonGroup } from './button-group';

export default function WeeklyAttendance() {
  const weeklyCounts = getWeeklyCounts();
  const achieved = weeklyCounts.map((count) => count > DailyAchievementScore);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <ButtonGroup className='w-full items-center justify-center'>
      {days.map((day, index) => (
        <Button
          className={cn(
            'flex-1 rounded-md text-lg font-semibold',
            achieved[index]
              ? 'bg-orange-400 text-white hover:bg-orange-500'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
          )}
          key={day}>
          {day}
        </Button>
      ))}
    </ButtonGroup>
  );
}
