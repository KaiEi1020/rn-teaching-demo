import { router } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CourseCard } from '@/components/course-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { MOCK_COURSES } from '@/data/courses';

const STATS = [
  { label: '在学课程', value: '3' },
  { label: '已完成', value: '12' },
  { label: '累计时长', value: '48h' },
];

// 首页只展示前 3 门精选课程
const FEATURED = MOCK_COURSES.slice(0, 3);

export default function HomeScreen() {
  const handleCoursePress = useCallback((course: (typeof MOCK_COURSES)[number]) => {
    router.push(`/course/${course.id}`);
  }, []);

  const handleViewAll = useCallback(() => {
    router.push('/courses');
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* 顶部欢迎区 */}
          <ThemedView style={styles.hero}>
            <ThemedText type="title">你好，同学 👋</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              今天也要坚持学习，一起来看看精选课程吧。
            </ThemedText>
          </ThemedView>

          {/* 学习统计 */}
          <ThemedView style={styles.statsRow}>
            {STATS.map((item) => (
              <ThemedView key={item.label} type="backgroundElement" style={styles.statBox}>
                <ThemedText type="subtitle" style={styles.statValue}>
                  {item.value}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {item.label}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>

          {/* 精选课程标题 + 查看全部 */}
          <ThemedView style={styles.sectionHeader}>
            <ThemedText type="smallBold">精选课程</ThemedText>
            <Pressable onPress={handleViewAll} style={({ pressed }) => pressed && styles.pressed}>
              <ThemedText type="linkPrimary">查看全部 →</ThemedText>
            </Pressable>
          </ThemedView>

          {FEATURED.map((course) => (
            <ThemedView key={course.id} style={styles.itemWrap}>
              <CourseCard course={course} onPress={handleCoursePress} />
            </ThemedView>
          ))}

          <ThemedText type="small" themeColor="textSecondary" style={styles.footerTip}>
            共 {MOCK_COURSES.length} 门课程，点击「查看全部」浏览完整列表
          </ThemedText>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  hero: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
    gap: Spacing.one,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.half,
  },
  statValue: {
    fontSize: 26,
    lineHeight: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  itemWrap: {
    paddingVertical: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
  footerTip: {
    textAlign: 'center',
    paddingTop: Spacing.two,
  },
});
