import AppTabs from '@/components/app-tabs';

/**
 * Tab 分组布局：/(tabs)/index → /，/(tabs)/explore → /explore
 * 分组目录名带括号，不会出现在 URL 中。
 */
export default function TabsLayout() {
  return <AppTabs />;
}
