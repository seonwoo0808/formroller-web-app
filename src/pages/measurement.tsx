import { useRef, useState } from 'react';
import { Bar, BarChart, Legend, ReferenceLine, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import CircleProgressWithGrantButton from '@/components/ui/circle-progress';
import Header from '@/components/ui/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WeeklyAttendance from '@/components/ui/weekly-attendace';
import { DailyAchievementScore } from '@/config/constants';
import { getTodayCount, getWeeklyCounts, incrementTodayCount } from '@/lib/countStorage';

export default function MeasurementPage() {
  // use deviceorientation data to count rolling motions
  const [rollCount, setRollCount] = useState(getTodayCount());
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const lastGammaRef = useRef<number | null>(null);
  const accumulatedRef = useRef<number>(0);

  const addCount = () => {
    setRollCount((prev) => prev + 1);
    incrementTodayCount();
  };

  const weeklyCounts = getWeeklyCounts();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = weeklyCounts.map((count, index) => ({
    count,
    day: days[index],
  }));

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const gamma = event.gamma; // Left to right tilt in degrees, between -90 and 90

    if (gamma === null) return;

    if (lastGammaRef.current !== null) {
      const delta = gamma - lastGammaRef.current;

      // rolling motion detection logic
      if (Math.abs(delta) >= 45) {
        accumulatedRef.current += delta;

        // 한 바퀴(360도) 이상 누적되었는지 확인
        if (Math.abs(accumulatedRef.current) >= 360) {
          addCount();
          // 누적값 초기화
          accumulatedRef.current = 0;
        }
      }
    }

    lastGammaRef.current = gamma;
  };

  const requestSensorPermission = async () => {
    // 브라우저가 DeviceOrientationEvent 를 지원하는지 확인
    if (typeof DeviceOrientationEvent === 'undefined') {
      alert('이 디바이스는 device orientation을 지원하지 않습니다.');
      return;
    }

    // iOS 13+ 등 권한 요청이 필요한 경우
    if (
      typeof (DeviceOrientationEvent as { requestPermission?: () => Promise<string> })?.requestPermission === 'function'
    ) {
      try {
        const result = await (
          DeviceOrientationEvent as typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> }
        ).requestPermission?.();
        if (result === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          alert('권한이 거부되었습니다.');
        }
      } catch (err) {
        console.error('Permission request error:', err);
        alert('권한 요청 중 오류가 발생했습니다.');
      }
    } else {
      // 권한 요청이 필요 없는 브라우저 (Android, 일부 iOS 버전 이전 등)
      setPermissionGranted(true);
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };
  return (
    <>
      <Header currentPageName='측정하기' />
      <div className='items-center justify-center min-w-screen h-full gap-6 p-4 mb-20'>
        <CircleProgressWithGrantButton
          granted={permissionGranted}
          onGrantPermission={requestSensorPermission}
          score={rollCount}
        />
        <Card className='w-full max-w-sm mt-6'>
          <CardHeader>
            <CardTitle>주간 기록</CardTitle>
            <CardDescription>최근 측정한 기록을 확인해 보세요!</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='chart'>
              <TabsList>
                <TabsTrigger value='attendance'>출석</TabsTrigger>
                <TabsTrigger value='chart'>차트</TabsTrigger>
              </TabsList>
              <TabsContent className='mt-6' value='attendance'>
                <WeeklyAttendance />
                <p className='mt-6 text-center text-sm text-gray-500'>
                  이번 주에 {weeklyCounts.filter((count) => count > DailyAchievementScore).length}일 출석하셨네요!
                </p>
              </TabsContent>
              <TabsContent value='chart'>
                <ChartContainer className='h-26 w-full' config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <ReferenceLine
                      label={{ fill: 'black', position: 'left', value: '목표' }}
                      stroke='var(--color-count)'
                      strokeDasharray='3 3'
                      y={DailyAchievementScore}
                    />
                    <XAxis
                      axisLine={false}
                      dataKey='day'
                      tickFormatter={(value) => value.slice(0, 3)}
                      tickLine={false}
                      tickMargin={10}
                    />
                    <YAxis
                      domain={[
                        DailyAchievementScore, // 최소 Y값
                        (dataMax: number) => Math.max(dataMax, 20), // 최소 최대값을 20으로 고정
                      ]}
                      hide={true}
                    />
                    <Legend formatter={
                      (_: string) => {

                          return <span>목표치</span>;
                        }
                    } height={36} iconType='plainline' verticalAlign='top' />
                    <Bar dataKey='count' fill='var(--color-count)' radius={4} />
                  </BarChart>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

const chartConfig = {
  count: {
    color: '#eea333ff',
    label: '횟수',
  },
} satisfies ChartConfig;
