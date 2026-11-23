import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack>
        {/* Tab 分组本身不显示 Stack 头部，由各 Tab 页面自己控制内容 */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* 动态路由：/course/123，Stack 会提供返回按钮 */}
        <Stack.Screen name="course/[id]" options={{ title: '课程详情' }} />
      </Stack>
    </ThemeProvider>
  );
}
