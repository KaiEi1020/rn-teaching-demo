import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { MOCK_COURSES, type Course } from '@/data/courses';

const CHAPTER_TOPICS = ['环境搭建与项目结构', '核心概念讲解', '实战案例拆解', '性能优化技巧', '常见坑与调试', '综合项目演练'];

function CourseHeader({ course }: { course: Course }) {
  return (
    <ThemedView style={styles.header}>
      <ThemedText type="subtitle">{course.title}</ThemedText>

      <ThemedText type="small" themeColor="textSecondary">
        {course.instructor} · {course.level} · #{course.tag}
      </ThemedText>

      <ThemedView style={styles.statsRow}>
        <ThemedView type="backgroundElement" style={styles.statBox}>
          <ThemedText type="smallBold">⭐ {course.rating.toFixed(1)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            评分
          </ThemedText>
        </ThemedView>
        <ThemedView type="backgroundElement" style={styles.statBox}>
          <ThemedText type="smallBold">{course.students.toLocaleString()}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            学习人数
          </ThemedText>
        </ThemedView>
        <ThemedView type="backgroundElement" style={styles.statBox}>
          <ThemedText type="smallBold">{course.chapters}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            章节
          </ThemedText>
        </ThemedView>
        <ThemedView type="backgroundElement" style={styles.statBox}>
          <ThemedText type="smallBold">{course.hours}h</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            总时长
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView type="backgroundElement" style={styles.introBox}>
        <ThemedText type="smallBold">课程简介</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          本课程由 {course.instructor} 主讲，围绕「{course.tag}」方向展开，共 {course.chapters}{' '}
          个章节、约 {course.hours} 小时。从基础概念到项目实战逐步推进，适合{course.level}水平的学习者。
        </ThemedText>
      </ThemedView>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        课程目录
      </ThemedText>
    </ThemedView>
  );
}

export default function CourseDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const course = MOCK_COURSES.find((item) => item.id === id);

  if (!course) {
    return (
      <>
        <Stack.Screen options={{ title: '课程详情' }} />
        <ThemedView style={styles.empty}>
          <ThemedText type="subtitle">课程不存在</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            未找到 id 为「{id ?? '空'}」的课程
          </ThemedText>
        </ThemedView>
      </>
    );
  }

  const chapters = Array.from({ length: course.chapters }, (_, index) => ({
    key: `${course.id}-chapter-${index + 1}`,
    order: index + 1,
    title: `第 ${index + 1} 讲 · ${CHAPTER_TOPICS[index % CHAPTER_TOPICS.length]}`,
    duration: `${8 + ((index * 3) % 22)} 分钟`,
  }));

  return (
    <>
      <Stack.Screen options={{ title: course.title }} />
      <ThemedView style={styles.container}>
        <FlatList
          data={chapters}
          keyExtractor={(item) => item.key}
          ListHeaderComponent={<CourseHeader course={course} />}
          renderItem={({ item }) => (
            <ThemedView style={styles.chapterRow}>
              <ThemedText type="small" style={styles.chapterIndex}>
                {item.order}
              </ThemedText>
              <ThemedText type="small" style={styles.chapterTitle} numberOfLines={1}>
                {item.title}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {item.duration}
              </ThemedText>
            </ThemedView>
          )}
          contentContainerStyle={styles.content}
          initialNumToRender={12}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.five,
  },
  header: {
    gap: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    gap: Spacing.half,
  },
  introBox: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  sectionTitle: {
    marginTop: Spacing.two,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8884',
  },
  chapterIndex: {
    width: 24,
    color: '#3c87f7',
    fontWeight: '700',
  },
  chapterTitle: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
});
