import { DailyAchievementScore } from '@/config/constants';

export default function CircleProgressWithGrantButton(props: {
  score: number;
  granted: boolean;
  onGrantPermission: () => void;
}) {
  const filledPercentage = props.score / DailyAchievementScore >= 1 ? 100 : (props.score / DailyAchievementScore) * 100;
  return (
    <div className='relative'>
      <svg className='size-full -rotate-90' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
        <circle
          className='stroke-current text-gray-200 dark:text-neutral-700'
          cx='18'
          cy='18'
          fill='none'
          r='16'
          strokeWidth='2'></circle>
        <circle
          className='stroke-current text-orange-500 dark:text-blue-500'
          cx='18'
          cy='18'
          fill='none'
          r='16'
          strokeDasharray='100'
          strokeDashoffset={100 - filledPercentage}
          strokeLinecap='round'
          strokeWidth='2'></circle>
      </svg>

      <div className='absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2'>
        {!props.granted ? (
          <button
            className='rounded-md bg-orange-400 px-6 py-4 text-white font-semibold text-lg'
            onClick={props.onGrantPermission} type='button'>
            시작하기
          </button>
        ) : (
          <>
            <span className='text-center text-5xl font-bold text-orange-500'>
              {props.score}/{DailyAchievementScore}
            </span>
            <span className='text-center block mt-3 text-lg font-semibold text-orange-400'>
              오늘의 달성도
            </span>
          </>
        )}
      </div>
    </div>
  );
}
