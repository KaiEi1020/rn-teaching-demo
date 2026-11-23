import { router } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CourseCard } from '@/components/course-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { MOCK_COURSES, type Course } from '@/data/courses';

export default function CoursesScreen() {
  const handleCoursePress = useCallback((course: Course) => {
    router.push(`/course/${course.id}`);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Course }) => (
      <ThemedView style={styles.itemWrap}>
        <CourseCard course={item} onPress={handleCoursePress} />
      </ThemedView>
    ),
    [handleCoursePress],
  );

  const ListHeader = useCallback(
    () => (
      <ThemedView style={styles.header}>
        <ThemedText type="title">课程列表</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          共 {MOCK_COURSES.length} 门课程 · 基于 FlatList 虚拟化渲染
        </ThemedText>
      </ThemedView>
    ),
    [],
  );

  const ListFooter = useCallback(
    () => (
      <ThemedText type="small" themeColor="textSecondary" style={styles.footerTip}>
        — 已经到底啦 —
      </ThemedText>
    ),
    [],
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <FlatList
          data={MOCK_COURSES}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          contentContainerStyle={styles.content}
          // —— 虚拟化参数：教学场景下的合理默认 ——
          initialNumToRender={8}
          maxToRenderPerBatch={6}
          windowSize={5}
          removeClippedSubviews
        />
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
  },
  header: {
    paddingVertical: Spacing.four,
    gap: Spacing.one,
  },
  itemWrap: {
    paddingVertical: Spacing.two,
  },
  footerTip: {
    textAlign: 'center',
    paddingVertical: Spacing.four,
  },
});
