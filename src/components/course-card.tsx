import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Spacing } from '@/constants/theme';
import type { Course } from '@/data/courses';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type Props = {
  course: Course;
  onPress?: (course: Course) => void;
};

/**
 * 课程卡片。使用 React.memo 做浅比较缓存：
 * - course 对象来自父组件的 FlatList data 数组，引用稳定，不会因为父组件重渲而变；
 * - onPress 由父组件用 useCallback 缓存后传入，避免每次 render 都生成新函数引用；
 * - 因此只有当课程数据真正变化时才会重新渲染。
 */
export const CourseCard = React.memo(function CourseCard({ course, onPress }: Props) {
  const handlePress = React.useCallback(() => {
    onPress?.(course);
  }, [onPress, course]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <ThemedText type="subtitle" numberOfLines={2} style={styles.title}>
          {course.title}
        </ThemedText>

        <ThemedText type="small" themeColor="textSecondary" style={styles.meta}>
          {course.instructor} · {course.chapters} 讲 · {course.hours}h
        </ThemedText>

        <ThemedView style={styles.footer}>
          <ThemedView style={styles.levelTag}>
            <ThemedText type="small" style={styles.levelText}>
              {course.level}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.tagTag}>
            <ThemedText type="small" style={styles.levelText}>
              #{course.tag}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.spacer} />

          <ThemedText type="small">
            ⭐ {course.rating.toFixed(1)} · {course.students.toLocaleString()} 人学习
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
  },
  meta: {
    marginTop: -Spacing.half,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  levelTag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.one,
    backgroundColor: '#3c87f7',
  },
  tagTag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.one,
    backgroundColor: '#60646C',
  },
  levelText: {
    color: '#fff',
    fontWeight: '700',
  },
  spacer: {
    flex: 1,
  },
});
